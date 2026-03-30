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
    category?: string;
  }): Promise<any[]> {
    const where = params?.category ? { category: params.category } : {};

    return this.prisma.feedback.findMany({
      where,
      skip: params?.skip,
      take: params?.take,
      include: {
        _count: {
          select: { votes: true },
        },
        author: {
          select: { id: true, name: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async count(params?: { category?: string }): Promise<number> {
    const where = params?.category ? { category: params.category } : {};
    return this.prisma.feedback.count({ where });
  }

  async create(data: any): Promise<Feedback> {
    return this.prisma.feedback.create({ data });
  }
}
