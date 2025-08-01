import { PrismaClient } from '@prisma/client';
import sampleData from './sample-data';

async function main() {
  const prisma = new PrismaClient();
  await prisma.property.deleteMany();

  await prisma.property.createMany({ data: sampleData });

  console.log('Database seeded successfully');
}

main();
