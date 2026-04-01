import { Comment } from '../../generated/prisma/client';

export interface ICommentRepository {
  create(data: {
    content: string;
    authorId: string;
    feedbackId: string;
  }): Promise<Comment>;
  findByFeedbackId(feedbackId: string): Promise<Comment[]>;
  delete(id: string): Promise<void>;
}
