import { Prisma } from '@prisma/client';
import { prisma } from '../utils/prisma.js';
import { AppError } from '../utils/AppError.js';
import type {
  CreateCategoryInput,
  UpdateCategoryInput,
} from '../validators/categoryValidators.js';

export async function listCategories() {
  return prisma.category.findMany({
    orderBy: { name: 'asc' },
  });
}

export async function createCategory(input: CreateCategoryInput) {
  const existing = await prisma.category.findUnique({
    where: { name: input.name },
  });

  if (existing) {
    throw new AppError('A category with this name already exists', 409);
  }

  return prisma.category.create({
    data: {
      name: input.name,
      description: input.description,
    },
  });
}

export async function updateCategory(id: string, input: UpdateCategoryInput) {
  const category = await prisma.category.findUnique({ where: { id } });

  if (!category) {
    throw new AppError('Category not found', 404);
  }

  if (input.name !== category.name) {
    const duplicate = await prisma.category.findUnique({
      where: { name: input.name },
    });

    if (duplicate) {
      throw new AppError('A category with this name already exists', 409);
    }
  }

  return prisma.category.update({
    where: { id },
    data: {
      name: input.name,
      description: input.description,
    },
  });
}

export async function deleteCategory(id: string) {
  const category = await prisma.category.findUnique({
    where: { id },
    include: { _count: { select: { products: true } } },
  });

  if (!category) {
    throw new AppError('Category not found', 404);
  }

  if (category._count.products > 0) {
    throw new AppError(
      'Cannot delete category while products are assigned to it',
      409,
    );
  }

  try {
    await prisma.category.delete({ where: { id } });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      (error.code === 'P2003' || error.code === 'P2014')
    ) {
      throw new AppError(
        'Cannot delete category while products are assigned to it',
        409,
      );
    }
    throw error;
  }

  return { id };
}
