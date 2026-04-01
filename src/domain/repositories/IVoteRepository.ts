import { Vote, VoteType } from '../../generated/prisma/client';

interface BaseVoteTransactionParams {
  userId: string;
  feedbackId: string;
  countChange: number;
}

export type SaveVoteTransactionParams = BaseVoteTransactionParams &
  (
    | { action: 'CREATE'; type: VoteType }
    | { action: 'UPDATE'; voteId: string; type: VoteType }
    | { action: 'DELETE'; voteId: string }
  );

export interface IVoteRepository {
  findByUserAndFeedback(
    userId: string,
    feedbackId: string,
  ): Promise<Vote | null>;

  findManyByUserAndFeedbacks(
    userId: string,
    feedbackIds: string[],
  ): Promise<Vote[]>;

  saveVoteTransaction(params: SaveVoteTransactionParams): Promise<void>;
}
