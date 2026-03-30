import { IVoteRepository } from '@domain/repositories/IVoteRepository';
import { IFeedbackRepository } from '@domain/repositories/IFeedbackRepository';
import { AppError } from '@shared/errors/AppError';
import { VoteType } from '../../../generated/prisma/client';

export interface ToggleVoteDTO {
  userId: string;
  feedbackId: string;
  type: VoteType;
}

export class ToggleVoteUseCase {
  constructor(
    private voteRepository: IVoteRepository,
    private feedbackRepository: IFeedbackRepository,
  ) {}

  async execute(data: ToggleVoteDTO): Promise<void> {
    const feedback = await this.feedbackRepository.findById(data.feedbackId);
    if (!feedback) {
      throw new AppError('Feedback not found', 404);
    }

    const existingVote = await this.voteRepository.findByUserAndFeedback(
      data.userId,
      data.feedbackId,
    );

    let action: 'CREATE' | 'UPDATE' | 'DELETE';
    let countChange = 0;

    if (existingVote) {
      if (existingVote.type === data.type) {
        action = 'DELETE';
        countChange = data.type === 'UPVOTE' ? -1 : 1;
      } else {
        action = 'UPDATE';
        countChange = data.type === 'UPVOTE' ? 2 : -2;
      }
    } else {
      action = 'CREATE';
      countChange = data.type === 'UPVOTE' ? 1 : -1;
    }

    await this.voteRepository.saveVoteTransaction({
      userId: data.userId,
      feedbackId: data.feedbackId,
      voteId: existingVote?.id,
      action,
      type: data.type,
      countChange,
    });

    console.log(
      `[Vote] User ${data.userId} -> ${action} ${data.type} on Feedback ${data.feedbackId}`,
    );
  }
}
