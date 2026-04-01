import { Feedback, FeedbackStatus } from '../../generated/prisma/client';

export type FeedbackWithAuthor = Feedback & {
  author: {
    id: string;
    name: string;
  };
};

export interface IFeedbackRepository {
  findById(id: string): Promise<FeedbackWithAuthor | null>;
  findAll(params?: {
    skip?: number;
    take?: number;
    category?: string;
    sortBy?: 'votes' | 'createdAt';
    order?: 'asc' | 'desc';
  }): Promise<any[]>;
  count(params?: { category?: string }): Promise<number>;
  create(
    data: Omit<
      Feedback,
      'id' | 'createdAt' | 'updatedAt' | 'status' | 'voteCount'
    > & {
      status?: FeedbackStatus;
      voteCount?: number;
    },
  ): Promise<Feedback>;
  update(id: string, data: Partial<Feedback>): Promise<Feedback>;
}
