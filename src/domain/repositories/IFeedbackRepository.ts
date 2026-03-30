import { Feedback } from '../../generated/prisma/client';

export interface IFeedbackRepository {
  findById(id: string): Promise<Feedback | null>;
  findAll(params?: {
    skip?: number;
    take?: number;
    category?: string;
  }): Promise<any[]>;
  count(params?: { category?: string }): Promise<number>;
  create(
    data: Omit<Feedback, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Feedback>;
}
