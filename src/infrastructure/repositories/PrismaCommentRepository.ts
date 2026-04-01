import { PrismaClient, Comment } from '../../generated/prisma/client';
import { ICommentRepository } from '@domain/repositories/ICommentRepository';

export class PrismaCommentRepository implements ICommentRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: {
    content: string;
    authorId: string;
    feedbackId: string;
  }): Promise<Comment> {
    return this.prisma.comment.create({ data });
  }

  async findByFeedbackId(feedbackId: string): Promise<Comment[]> {
    return this.prisma.comment.findMany({
      where: { feedbackId },
      include: {
        author: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.comment.delete({ where: { id } });
  }
}
