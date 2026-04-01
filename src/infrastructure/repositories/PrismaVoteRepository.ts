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
    await this.prisma.$transaction(async (tx) => {
      if (params.action === 'CREATE') {
        await tx.vote.create({
          data: {
            userId: params.userId,
            feedbackId: params.feedbackId,
            type: params.type!,
          },
        });
      } else if (params.action === 'UPDATE') {
        await tx.vote.update({
          where: { id: params.voteId! },
          data: { type: params.type! },
        });
      } else if (params.action === 'DELETE') {
        await tx.vote.delete({
          where: { id: params.voteId! },
        });
      }

      await tx.feedback.update({
        where: { id: params.feedbackId },
        data: { voteCount: { increment: params.countChange } },
      });
    });
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
