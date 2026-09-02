import {
  InventoryTransactionType,
  Prisma,
} from '@prisma/client';
import { prisma } from '../utils/prisma.js';
import { AppError } from '../utils/AppError.js';
import { decimalToNumber, serializeProduct } from '../utils/serialize.js';
import type {
  StockAdjustmentInput,
  StockMovementInput,
  TransactionQueryInput,
} from '../validators/inventoryValidators.js';

const transactionInclude = {
  product: {
    include: {
      category: {
        select: {
          id: true,
          name: true,
          description: true,
        },
      },
    },
  },
} satisfies Prisma.InventoryTransactionInclude;

function serializeTransaction<
  T extends {
    unitPrice?: Prisma.Decimal | number | null;
    product: {
      purchasePrice: Prisma.Decimal | number;
      sellingPrice: Prisma.Decimal | number;
    };
  },
>(transaction: T) {
  return {
    ...transaction,
    unitPrice:
      transaction.unitPrice === null || transaction.unitPrice === undefined
        ? null
        : decimalToNumber(transaction.unitPrice),
    product: serializeProduct(transaction.product),
  };
}

async function applyStockChange(
  input: StockMovementInput,
  type: typeof InventoryTransactionType.STOCK_IN | typeof InventoryTransactionType.STOCK_OUT,
) {
  return prisma.$transaction(async (tx) => {
    const product = await tx.product.findUnique({
      where: { id: input.productId },
    });

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    const nextStock =
      type === InventoryTransactionType.STOCK_IN
        ? product.currentStock + input.quantity
        : product.currentStock - input.quantity;

    if (type === InventoryTransactionType.STOCK_OUT && nextStock < 0) {
      throw new AppError(
        `Insufficient stock. Available: ${product.currentStock}, requested: ${input.quantity}`,
        400,
      );
    }

    const updatedProduct = await tx.product.update({
      where: { id: product.id },
      data: { currentStock: nextStock },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
    });

    const transaction = await tx.inventoryTransaction.create({
      data: {
        productId: product.id,
        type,
        quantity: input.quantity,
        balance: nextStock,
        unitPrice:
          type === InventoryTransactionType.STOCK_OUT
            ? product.sellingPrice
            : null,
      },
      include: transactionInclude,
    });

    return {
      product: serializeProduct(updatedProduct),
      transaction: serializeTransaction(transaction),
    };
  });
}

export async function stockIn(input: StockMovementInput) {
  return applyStockChange(input, InventoryTransactionType.STOCK_IN);
}

export async function stockOut(input: StockMovementInput) {
  return applyStockChange(input, InventoryTransactionType.STOCK_OUT);
}

export async function adjustStock(input: StockAdjustmentInput) {
  return prisma.$transaction(async (tx) => {
    const product = await tx.product.findUnique({
      where: { id: input.productId },
    });

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    if (input.adjustedStock < 0) {
      throw new AppError('Adjusted stock cannot be negative', 400);
    }

    const difference = input.adjustedStock - product.currentStock;

    if (difference === 0) {
      throw new AppError('Adjusted stock must differ from current stock', 400);
    }

    const updatedProduct = await tx.product.update({
      where: { id: product.id },
      data: { currentStock: input.adjustedStock },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
    });

    const transaction = await tx.inventoryTransaction.create({
      data: {
        productId: product.id,
        type: InventoryTransactionType.ADJUSTMENT,
        quantity: Math.abs(difference),
        balance: input.adjustedStock,
        unitPrice: null,
      },
      include: transactionInclude,
    });

    return {
      product: serializeProduct(updatedProduct),
      transaction: serializeTransaction(transaction),
    };
  });
}

export async function listTransactions(query: TransactionQueryInput) {
  const where: Prisma.InventoryTransactionWhereInput = {};

  if (query.productId) {
    where.productId = query.productId;
  }

  if (query.type) {
    where.type = query.type;
  }

  if (query.from || query.to) {
    where.createdAt = {};
    if (query.from) {
      where.createdAt.gte = query.from;
    }
    if (query.to) {
      where.createdAt.lte = query.to;
    }
  }

  const transactions = await prisma.inventoryTransaction.findMany({
    where,
    include: transactionInclude,
    orderBy: { createdAt: 'desc' },
  });

  return transactions.map(serializeTransaction);
}

export async function listTransactionsByProduct(productId: string) {
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  const transactions = await prisma.inventoryTransaction.findMany({
    where: { productId },
    include: transactionInclude,
    orderBy: { createdAt: 'desc' },
  });

  return transactions.map(serializeTransaction);
}

export async function listLowStockProducts() {
  const lowStockRows = await prisma.$queryRaw<Array<{ id: string }>>`
    SELECT id FROM products WHERE "currentStock" <= "minimumStock"
  `;

  if (lowStockRows.length === 0) {
    return [];
  }

  const products = await prisma.product.findMany({
    where: { id: { in: lowStockRows.map((row) => row.id) } },
    include: {
      category: {
        select: {
          id: true,
          name: true,
          description: true,
        },
      },
    },
    orderBy: [{ currentStock: 'asc' }, { name: 'asc' }],
  });

  return products.map(serializeProduct);
}
