import { IFeedbackRepository } from '@domain/repositories/IFeedbackRepository';
import { IVoteRepository } from '@domain/repositories/IVoteRepository';
import { AppError } from '@shared/errors/AppError';
import {
  GetFeedbackByIdRequestDTO,
  GetFeedbackByIdResponseDTO,
} from './GetFeedbackByIdDTO';

export class GetFeedbackByIdUseCase {
  constructor(
    private feedbackRepository: IFeedbackRepository,
    private voteRepository: IVoteRepository,
  ) {}

  async execute(
    data: GetFeedbackByIdRequestDTO,
  ): Promise<GetFeedbackByIdResponseDTO> {
    const feedback = await this.feedbackRepository.findById(data.id);

    if (!feedback) {
      throw new AppError('Feedback not found', 404);
    }

    let hasVoted = false;
    if (data.userId) {
      const vote = await this.voteRepository.findByUserAndFeedback(
        data.userId,
        data.id,
      );
      hasVoted = !!vote;
    }

    return {
      id: feedback.id,
      title: feedback.title,
      description: feedback.description,
      category: feedback.category,
      status: feedback.status,
      voteCount: feedback.voteCount,
      createdAt: feedback.createdAt,
      author: {
        id: feedback.author.id,
        name: feedback.author.name,
      },
      hasVoted,
    };
  }
}
