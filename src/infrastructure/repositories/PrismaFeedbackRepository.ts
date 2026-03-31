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
    sortBy?: 'votes' | 'createdAt';
    order?: 'asc' | 'desc';
  }): Promise<any[]> {
    const where = params?.category ? { category: params.category } : {};

    const sortBy = params?.sortBy || 'createdAt';
    const order = params?.order || 'desc';

    const orderByColumn = sortBy === 'votes' ? 'voteCount' : sortBy;
    const orderBy = { [orderByColumn]: order };

    return this.prisma.feedback.findMany({
      where,
      skip: params?.skip,
      take: params?.take,
      include: {
        author: {
          select: { id: true, name: true },
        },
      },
      orderBy,
    });
  }

  async count(params?: { category?: string }): Promise<number> {
    const where = params?.category ? { category: params.category } : {};
    return this.prisma.feedback.count({ where });
  }

  async create(data: any): Promise<Feedback> {
    return this.prisma.feedback.create({ data });
  }

  async update(id: string, data: Partial<Feedback>): Promise<Feedback> {
    return this.prisma.feedback.update({
      where: { id },
      data,
    });
  }
}
