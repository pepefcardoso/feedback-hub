import prisma from '@infrastructure/database/prisma';
import { IUserRepository } from '@domain/repositories/IUserRepository';
import { IFeedbackRepository } from '@domain/repositories/IFeedbackRepository';
import { IVoteRepository } from '@domain/repositories/IVoteRepository';
import { ICommentRepository } from '@domain/repositories/ICommentRepository';

import { PrismaUserRepository } from '@infrastructure/repositories/PrismaUserRepository';
import { PrismaFeedbackRepository } from '@infrastructure/repositories/PrismaFeedbackRepository';
import { PrismaVoteRepository } from '@infrastructure/repositories/PrismaVoteRepository';
import { PrismaCommentRepository } from '@infrastructure/repositories/PrismaCommentRepository';

export class RepositoryFactory {
  static getUserRepository(): IUserRepository {
    return new PrismaUserRepository(prisma);
  }

  static getFeedbackRepository(): IFeedbackRepository {
    return new PrismaFeedbackRepository(prisma);
  }

  static getVoteRepository(): IVoteRepository {
    return new PrismaVoteRepository(prisma);
  }

  static getCommentRepository(): ICommentRepository {
    return new PrismaCommentRepository(prisma);
  }
}
