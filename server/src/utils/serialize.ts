import { Prisma } from '@prisma/client';

export function decimalToNumber(value: Prisma.Decimal | number): number {
  return typeof value === 'number' ? value : Number(value);
}

export function serializeProduct<T extends {
  purchasePrice: Prisma.Decimal | number;
  sellingPrice: Prisma.Decimal | number;
}>(product: T) {
  return {
    ...product,
    purchasePrice: decimalToNumber(product.purchasePrice),
    sellingPrice: decimalToNumber(product.sellingPrice),
  };
}
