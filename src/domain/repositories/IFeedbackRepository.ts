import { Feedback } from '../../generated/prisma/client';

export interface IFeedbackRepository {
  findById(id: string): Promise<Feedback | null>;
  findAll(params?: { skip?: number; take?: number }): Promise<Feedback[]>;
  create(
    data: Omit<Feedback, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Feedback>;
  count(): Promise<number>;
}
