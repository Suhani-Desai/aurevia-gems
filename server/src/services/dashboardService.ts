import { Prisma } from '@prisma/client';
import { prisma } from '../utils/prisma.js';
import { decimalToNumber, serializeProduct } from '../utils/serialize.js';

export async function getDashboardSummary() {
  const [
    totalProducts,
    totalCategories,
    stockAggregate,
    lowStockRows,
    valueRows,
    salesRows,
    recentTransactions,
    newEnquiryCount,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.product.aggregate({
      _sum: { currentStock: true },
    }),
    prisma.$queryRaw<Array<{ count: bigint }>>`
      SELECT COUNT(*)::bigint AS count
      FROM products
      WHERE "currentStock" <= "minimumStock"
    `,
    prisma.$queryRaw<Array<{ inventoryValue: Prisma.Decimal | null }>>`
      SELECT COALESCE(SUM("currentStock" * "purchasePrice"), 0) AS "inventoryValue"
      FROM products
    `,
    // Total Sales = SUM(STOCK_OUT quantity × unitPrice).
    // Legacy STOCK_OUT rows without unitPrice are excluded (no invented prices).
    prisma.$queryRaw<Array<{ totalSales: Prisma.Decimal | null }>>`
      SELECT COALESCE(SUM(quantity * "unitPrice"), 0) AS "totalSales"
      FROM inventory_transactions
      WHERE type = 'STOCK_OUT' AND "unitPrice" IS NOT NULL
    `,
    prisma.inventoryTransaction.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
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
      },
    }),
    prisma.enquiry.count({ where: { status: 'NEW' } }),
  ]);

  return {
    totalProducts,
    totalCategories,
    totalStockUnits: stockAggregate._sum.currentStock ?? 0,
    lowStockCount: Number(lowStockRows[0]?.count ?? 0),
    inventoryValue: decimalToNumber(valueRows[0]?.inventoryValue ?? 0),
    totalSales: decimalToNumber(salesRows[0]?.totalSales ?? 0),
    newEnquiryCount,
    recentTransactions: recentTransactions.map((transaction) => ({
      ...transaction,
      unitPrice:
        transaction.unitPrice === null || transaction.unitPrice === undefined
          ? null
          : decimalToNumber(transaction.unitPrice),
      product: serializeProduct(transaction.product),
    })),
  };
}
