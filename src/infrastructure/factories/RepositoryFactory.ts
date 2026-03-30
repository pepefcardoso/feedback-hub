import prisma from '@infrastructure/database/prisma';
import { PrismaUserRepository } from '@infrastructure/repositories/PrismaUserRepository';
import { PrismaFeedbackRepository } from '@infrastructure/repositories/PrismaFeedbackRepository';

export class RepositoryFactory {
  static getUserRepository() {
    return new PrismaUserRepository(prisma);
  }

  static getFeedbackRepository() {
    return new PrismaFeedbackRepository(prisma);
  }
}
