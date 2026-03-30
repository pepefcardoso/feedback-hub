import { FeedbackStatus } from '../../../generated/prisma/client';

export interface ListFeedbacksDTO {
  page?: number;
  limit?: number;
  category?: string;
}

export interface FeedbackItemDTO {
  id: string;
  title: string;
  description: string;
  category: string;
  status: FeedbackStatus;
  author: {
    id: string;
    name: string;
  };
  voteCount: number;
  createdAt: Date;
}

export interface ListFeedbacksResponseDTO {
  data: FeedbackItemDTO[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}
