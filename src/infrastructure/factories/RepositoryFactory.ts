import prisma from '@infrastructure/database/prisma';
import { PrismaUserRepository } from '@infrastructure/repositories/PrismaUserRepository';
import { PrismaFeedbackRepository } from '@infrastructure/repositories/PrismaFeedbackRepository';
import { PrismaVoteRepository } from '@infrastructure/repositories/PrismaVoteRepository';

export class RepositoryFactory {
  static getUserRepository() {
    return new PrismaUserRepository(prisma);
  }

  static getFeedbackRepository() {
    return new PrismaFeedbackRepository(prisma);
  }

  static getVoteRepository() {
    return new PrismaVoteRepository(prisma);
  }
}
