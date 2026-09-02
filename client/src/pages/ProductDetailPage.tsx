import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Badge } from '../components/Badge';
import {
  EmptyState,
  ErrorState,
  LoadingState,
} from '../components/Feedback';
import { MediaImage } from '../components/MediaImage';
import { ApiRequestError } from '../services/api';
import * as inventoryService from '../services/inventoryService';
import * as productService from '../services/productService';
import type { InventoryTransaction, Product } from '../types';
import {
  formatCurrency,
  formatDateTime,
  formatNumber,
  getProductStockStatus,
} from '../utils/format';
import { getProductImage } from '../utils/productVisual';

function statusBadge(product: Product) {
  const status = getProductStockStatus(product);
  if (status === 'OUT_OF_STOCK') {
    return <Badge variant="danger">Out of Stock</Badge>;
  }
  if (status === 'LOW_STOCK') {
    return <Badge variant="warning">Low Stock</Badge>;
  }
  return <Badge variant="success">In Stock</Badge>;
}

function transactionTypeLabel(type: InventoryTransaction['type']) {
  if (type === 'STOCK_IN') return 'Stock In';
  if (type === 'STOCK_OUT') return 'Stock Out';
  return 'Adjustment';
}

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [transactions, setTransactions] = useState<InventoryTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    if (!id) {
      setError('Product id is required.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');
    try {
      const [productRow, transactionRows] = await Promise.all([
        productService.getProduct(id),
        inventoryService.listTransactionsByProduct(id),
      ]);
      setProduct(productRow);
      setTransactions(transactionRows.slice(0, 10));
    } catch (err) {
      setError(
        err instanceof ApiRequestError
          ? err.message
          : 'Unable to load product.',
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void load();
  }, [load]);

  if (loading) return <LoadingState label="Loading product..." />;
  if (error) return <ErrorState message={error} onRetry={() => void load()} />;
  if (!product) return <EmptyState title="Product not found" />;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">Catalogue</p>
          <h1 className="font-display mt-2 text-3xl md:text-4xl">
            {product.name}
          </h1>
          <p className="mt-2 text-sm text-[var(--muted)]">{product.sku}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/products" className="btn-ghost">
            Back to Products
          </Link>
          <Link to={`/products/${product.id}/edit`} className="btn-primary">
            Edit Product
          </Link>
        </div>
      </div>

      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <MediaImage
          src={getProductImage(product)}
          alt={product.name}
          className="aspect-[4/5] w-full max-h-[420px]"
        />
        <div className="rounded-[0.85rem] border border-[var(--border)] bg-[var(--white)] p-5 md:p-6">
          <div className="mb-5 flex items-center gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em]">
              Product details
            </h2>
            {statusBadge(product)}
          </div>
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">
                Category
              </dt>
              <dd className="mt-1 text-sm">{product.category.name}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">
                SKU
              </dt>
              <dd className="mt-1 text-sm">{product.sku}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">
                Purchase Price
              </dt>
              <dd className="mt-1 text-sm">
                {formatCurrency(product.purchasePrice)}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">
                Selling Price
              </dt>
              <dd className="mt-1 text-sm">
                {formatCurrency(product.sellingPrice)}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">
                Current Stock
              </dt>
              <dd className="mt-1 text-sm">
                {formatNumber(product.currentStock)}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">
                Minimum Stock
              </dt>
              <dd className="mt-1 text-sm">
                {formatNumber(product.minimumStock)}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em]">
          Recent inventory transactions
        </h2>
        {transactions.length === 0 ? (
          <EmptyState title="No transactions for this product" />
        ) : (
          <div className="admin-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((row) => (
                  <tr key={row.id}>
                    <td>{formatDateTime(row.createdAt)}</td>
                    <td>
                      <Badge
                        variant={
                          row.type === 'STOCK_IN'
                            ? 'success'
                            : row.type === 'STOCK_OUT'
                              ? 'warning'
                              : 'neutral'
                        }
                      >
                        {transactionTypeLabel(row.type)}
                      </Badge>
                    </td>
                    <td>{formatNumber(row.quantity)}</td>
                    <td>{formatNumber(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
