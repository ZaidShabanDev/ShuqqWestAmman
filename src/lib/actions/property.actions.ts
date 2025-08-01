'use server';

import { PrismaClient } from '@prisma/client';
import { convertToPlainObject } from '../helpers';

// Get the latest properties
export async function getRealEstateListings() {
  const prisma = new PrismaClient();

  const data = await prisma.property.findMany({
    take: 4,
    orderBy: { createdAt: 'desc' },
  });

  return convertToPlainObject(data);
}
