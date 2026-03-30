import { PrismaClient, Feedback } from '../../generated/prisma/client';
import { IFeedbackRepository } from '@domain/repositories/IFeedbackRepository';

export class PrismaFeedbackRepository implements IFeedbackRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<Feedback | null> {
    return this.prisma.feedback.findUnique({ where: { id } });
  }

  async findAll(params?: {
    skip?: number;
    take?: number;
  }): Promise<Feedback[]> {
    return this.prisma.feedback.findMany({
      skip: params?.skip,
      take: params?.take,
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: any): Promise<Feedback> {
    return this.prisma.feedback.create({ data });
  }

  async count(): Promise<number> {
    return this.prisma.feedback.count();
  }
}
