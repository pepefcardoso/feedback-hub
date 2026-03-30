import { Vote, VoteType } from '../../generated/prisma/client';

export interface SaveVoteTransactionParams {
  userId: string;
  feedbackId: string;
  voteId?: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE';
  type?: VoteType;
  countChange: number;
}

export interface IVoteRepository {
  findByUserAndFeedback(
    userId: string,
    feedbackId: string,
  ): Promise<Vote | null>;
  saveVoteTransaction(params: SaveVoteTransactionParams): Promise<void>;
}
