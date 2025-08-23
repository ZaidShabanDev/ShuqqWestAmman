'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import z from 'zod';
import { convertToPlainObject, formatError } from '../helpers';
import { PropertyFormSchema } from '../validators';

// Get the latest properties
export async function getRealEstateListings() {
  const prisma = new PrismaClient();

  const data = await prisma.property.findMany({
    take: 4,
    orderBy: { createdAt: 'desc' },
  });

  return convertToPlainObject(data);
}

// Delete properties
export async function deleteProperty(id: string) {
  try {
    const prisma = new PrismaClient();

    await prisma.property.delete({ where: { id } });

    revalidatePath('/admin/dashboard');

    return {
      success: true,
      message: 'property deleted successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Create properties
export async function createProduct(data: z.infer<typeof PropertyFormSchema>) {
  try {
    const prisma = new PrismaClient();

    // Validate and create product
    const product = PropertyFormSchema.parse(data);
    await prisma.property.create({ data: product });

    revalidatePath('/admin/dashboard');

    return {
      success: true,
      message: 'property created successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
