'use server';

import { PrismaClient } from '@prisma/client';
import { convertToPlainObject, formatError } from '../helpers';
import { revalidatePath } from "next/cache";

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

    revalidatePath("/admin/dashboard");

    return {
      success: true,
      message: "Order deleted successfully",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}