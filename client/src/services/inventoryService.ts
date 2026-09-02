import { apiRequest, buildQuery } from './api';
import type {
  InventoryTransaction,
  Product,
  StockMovementInput,
  TransactionListQuery,
} from '../types';

export async function stockIn(input: StockMovementInput) {
  return apiRequest<{
    product: Product;
    transaction: InventoryTransaction;
  }>('/inventory/stock-in', {
    method: 'POST',
    body: input,
  });
}

export async function stockOut(input: StockMovementInput) {
  return apiRequest<{
    product: Product;
    transaction: InventoryTransaction;
  }>('/inventory/stock-out', {
    method: 'POST',
    body: input,
  });
}

export async function listTransactions(query: TransactionListQuery = {}) {
  const data = await apiRequest<{ transactions: InventoryTransaction[] }>(
    `/inventory/transactions${buildQuery({
      productId: query.productId,
      type: query.type,
      from: query.from,
      to: query.to,
    })}`,
  );
  return data.transactions;
}

export async function listTransactionsByProduct(productId: string) {
  const data = await apiRequest<{ transactions: InventoryTransaction[] }>(
    `/inventory/transactions/${productId}`,
  );
  return data.transactions;
}

export async function listLowStockProducts() {
  const data = await apiRequest<{ products: Product[] }>(
    '/inventory/low-stock',
  );
  return data.products;
}
