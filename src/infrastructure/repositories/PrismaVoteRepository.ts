import { PrismaClient, Vote } from '../../generated/prisma/client';
import {
  IVoteRepository,
  SaveVoteTransactionParams,
} from '@domain/repositories/IVoteRepository';

export class PrismaVoteRepository implements IVoteRepository {
  constructor(private prisma: PrismaClient) {}

  async findByUserAndFeedback(
    userId: string,
    feedbackId: string,
  ): Promise<Vote | null> {
    return this.prisma.vote.findUnique({
      where: {
        userId_feedbackId: { userId, feedbackId },
      },
    });
  }

  async saveVoteTransaction(params: SaveVoteTransactionParams): Promise<void> {
    const operations: any[] = [];

    switch (params.action) {
      case 'CREATE':
        operations.push(
          this.prisma.vote.create({
            data: {
              userId: params.userId,
              feedbackId: params.feedbackId,
              type: params.type,
            },
          }),
        );
        break;
      case 'UPDATE':
        operations.push(
          this.prisma.vote.update({
            where: { id: params.voteId },
            data: { type: params.type },
          }),
        );
        break;
      case 'DELETE':
        operations.push(
          this.prisma.vote.delete({
            where: { id: params.voteId },
          }),
        );
        break;
    }

    operations.push(
      this.prisma.feedback.update({
        where: { id: params.feedbackId },
        data: { voteCount: { increment: params.countChange } },
      }),
    );

    await this.prisma.$transaction(operations);
  }

  async findManyByUserAndFeedbacks(
    userId: string,
    feedbackIds: string[],
  ): Promise<Vote[]> {
    return this.prisma.vote.findMany({
      where: {
        userId,
        feedbackId: { in: feedbackIds },
      },
    });
  }
}
