import {
  IVoteRepository,
  SaveVoteTransactionParams,
} from '@domain/repositories/IVoteRepository';
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

    const baseParams = {
      userId: data.userId,
      feedbackId: data.feedbackId,
    };

    let transactionParams: SaveVoteTransactionParams;

    if (existingVote) {
      if (existingVote.type === data.type) {
        transactionParams = {
          ...baseParams,
          action: 'DELETE',
          voteId: existingVote.id,
          countChange: data.type === 'UPVOTE' ? -1 : 1,
        };
      } else {
        transactionParams = {
          ...baseParams,
          action: 'UPDATE',
          voteId: existingVote.id,
          type: data.type,
          countChange: data.type === 'UPVOTE' ? 2 : -2,
        };
      }
    } else {
      transactionParams = {
        ...baseParams,
        action: 'CREATE',
        type: data.type,
        countChange: data.type === 'UPVOTE' ? 1 : -1,
      };
    }

    await this.voteRepository.saveVoteTransaction(transactionParams);

    console.log(
      `[Vote] User ${data.userId} -> ${transactionParams.action} ${
        'type' in transactionParams ? transactionParams.type : 'REMOVED'
      } on Feedback ${data.feedbackId}`,
    );
  }
}
