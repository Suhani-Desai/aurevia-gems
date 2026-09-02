import { Prisma } from '@prisma/client';
import { prisma } from '../utils/prisma.js';
import { AppError } from '../utils/AppError.js';
import { serializeProduct } from '../utils/serialize.js';
import type {
  CreateProductInput,
  ProductQueryInput,
  UpdateProductInput,
} from '../validators/productValidators.js';

const productInclude = {
  category: {
    select: {
      id: true,
      name: true,
      description: true,
    },
  },
} satisfies Prisma.ProductInclude;

async function ensureCategoryExists(categoryId: string) {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!category) {
    throw new AppError('Category not found', 404);
  }

  return category;
}

export async function listProducts(query: ProductQueryInput) {
  const where: Prisma.ProductWhereInput = {};

  if (query.search) {
    where.OR = [
      { name: { contains: query.search, mode: 'insensitive' } },
      { sku: { contains: query.search, mode: 'insensitive' } },
    ];
  }

  if (query.categoryId) {
    where.categoryId = query.categoryId;
  }

  if (query.lowStock) {
    const lowStockRows = await prisma.$queryRaw<Array<{ id: string }>>`
      SELECT id FROM products WHERE "currentStock" <= "minimumStock"
    `;

    if (lowStockRows.length === 0) {
      return [];
    }

    where.id = { in: lowStockRows.map((row) => row.id) };
  }

  const products = await prisma.product.findMany({
    where,
    include: productInclude,
    orderBy: [{ name: 'asc' }],
  });

  return products.map(serializeProduct);
}

export async function getProductById(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: productInclude,
  });

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  return serializeProduct(product);
}

export async function createProduct(input: CreateProductInput) {
  await ensureCategoryExists(input.categoryId);

  const existingSku = await prisma.product.findUnique({
    where: { sku: input.sku },
  });

  if (existingSku) {
    throw new AppError('A product with this SKU already exists', 409);
  }

  const product = await prisma.product.create({
    data: {
      sku: input.sku,
      name: input.name,
      categoryId: input.categoryId,
      purchasePrice: input.purchasePrice,
      sellingPrice: input.sellingPrice,
      currentStock: input.currentStock,
      minimumStock: input.minimumStock,
    },
    include: productInclude,
  });

  return serializeProduct(product);
}

export async function updateProduct(id: string, input: UpdateProductInput) {
  const existing = await prisma.product.findUnique({ where: { id } });

  if (!existing) {
    throw new AppError('Product not found', 404);
  }

  if (input.categoryId) {
    await ensureCategoryExists(input.categoryId);
  }

  if (input.sku && input.sku !== existing.sku) {
    const duplicateSku = await prisma.product.findUnique({
      where: { sku: input.sku },
    });

    if (duplicateSku) {
      throw new AppError('A product with this SKU already exists', 409);
    }
  }

  const product = await prisma.product.update({
    where: { id },
    data: {
      ...(input.sku !== undefined ? { sku: input.sku } : {}),
      ...(input.name !== undefined ? { name: input.name } : {}),
      ...(input.categoryId !== undefined ? { categoryId: input.categoryId } : {}),
      ...(input.purchasePrice !== undefined
        ? { purchasePrice: input.purchasePrice }
        : {}),
      ...(input.sellingPrice !== undefined
        ? { sellingPrice: input.sellingPrice }
        : {}),
      ...(input.currentStock !== undefined
        ? { currentStock: input.currentStock }
        : {}),
      ...(input.minimumStock !== undefined
        ? { minimumStock: input.minimumStock }
        : {}),
    },
    include: productInclude,
  });

  return serializeProduct(product);
}

export async function deleteProduct(id: string) {
  const existing = await prisma.product.findUnique({ where: { id } });

  if (!existing) {
    throw new AppError('Product not found', 404);
  }

  await prisma.product.delete({ where: { id } });
  return { id };
}
