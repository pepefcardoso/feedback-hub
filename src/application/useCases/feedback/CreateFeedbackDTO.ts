import { FeedbackStatus } from '../../../generated/prisma/client';

export interface CreateFeedbackDTO {
  title: string;
  description: string;
  category: string;
  authorId: string;
}

export interface CreateFeedbackResponseDTO {
  id: string;
  title: string;
  description: string;
  category: string;
  status: FeedbackStatus;
  authorId: string;
  createdAt: Date;
}
