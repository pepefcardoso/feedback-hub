import { ICommentRepository } from '@domain/repositories/ICommentRepository';
import { IFeedbackRepository } from '@domain/repositories/IFeedbackRepository';
import { AppError } from '@shared/errors/AppError';
import { CreateCommentDTO } from './CreateCommentDTO';

export class CreateCommentUseCase {
  constructor(
    private commentRepository: ICommentRepository,
    private feedbackRepository: IFeedbackRepository,
  ) {}

  async execute(data: CreateCommentDTO) {
    const feedback = await this.feedbackRepository.findById(data.feedbackId);

    if (!feedback) {
      throw new AppError('Feedback not found', 404);
    }

    const comment = await this.commentRepository.create({
      content: data.content,
      authorId: data.authorId,
      feedbackId: data.feedbackId,
    });

    return comment;
  }
}
