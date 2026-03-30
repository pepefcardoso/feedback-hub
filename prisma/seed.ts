/// <reference types="node" />
import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import {
  PrismaClient,
  Role,
  FeedbackStatus,
} from '../src/generated/prisma/client';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Starting seeding...');

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@feedbackhub.com' },
    update: {},
    create: {
      email: 'admin@feedbackhub.com',
      name: 'Admin User',
      passwordHash: '$2b$10$dummyhash...',
      role: Role.ADMIN,
    },
  });

  const sampleFeedback = await prisma.feedback.create({
    data: {
      title: 'Add Dark Mode',
      description:
        'It would be great to have a dark mode option for night time viewing.',
      category: 'UI/UX',
      status: FeedbackStatus.IDEA,
      authorId: adminUser.id,
    },
  });

  console.log('Seeding finished.');
  console.log(`Admin User ID: ${adminUser.id}`);
  console.log(`Sample Feedback ID: ${sampleFeedback.id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
