import { useCallback, useEffect, useMemo, useState, type FormEvent } from 'react';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import {
  Alert,
  EmptyState,
  ErrorState,
  LoadingState,
} from '../components/Feedback';
import { Input } from '../components/Input';
import { MediaImage } from '../components/MediaImage';
import { Select } from '../components/Select';
import { ApiRequestError } from '../services/api';
import * as inventoryService from '../services/inventoryService';
import * as productService from '../services/productService';
import type {
  InventoryTransaction,
  InventoryTransactionType,
  Product,
} from '../types';
import { formatDateTime, formatNumber } from '../utils/format';
import { getProductImage } from '../utils/productVisual';

type MovementMode = 'STOCK_IN' | 'STOCK_OUT';

export function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [transactions, setTransactions] = useState<InventoryTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [mode, setMode] = useState<MovementMode>('STOCK_IN');
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [filterProductId, setFilterProductId] = useState('');
  const [filterType, setFilterType] = useState<'' | InventoryTransactionType>(
    '',
  );

  const selectedProduct = useMemo(
    () => products.find((p) => p.id === productId) ?? null,
    [products, productId],
  );

  const qty = Number(quantity);
  const previewStock =
    selectedProduct && Number.isInteger(qty) && qty > 0
      ? mode === 'STOCK_IN'
        ? selectedProduct.currentStock + qty
        : selectedProduct.currentStock - qty
      : null;

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [productRows, transactionRows] = await Promise.all([
        productService.listProducts(),
        inventoryService.listTransactions({
          productId: filterProductId || undefined,
          type: filterType || undefined,
        }),
      ]);
      setProducts(productRows);
      setTransactions(transactionRows);
    } catch (err) {
      setError(
        err instanceof ApiRequestError
          ? err.message
          : 'Unable to load inventory data.',
      );
    } finally {
      setLoading(false);
    }
  }, [filterProductId, filterType]);

  useEffect(() => {
    void load();
  }, [load]);

  const productOptions = useMemo(
    () =>
      products.map((product) => ({
        value: product.id,
        label: `${product.sku} — ${product.name}`,
      })),
    [products],
  );

  async function handleMovement(event: FormEvent) {
    event.preventDefault();
    setFormError('');
    setSuccess('');
    if (!productId) {
      setFormError('Select a product.');
      return;
    }
    if (!Number.isInteger(qty) || qty <= 0) {
      setFormError('Quantity must be a positive integer.');
      return;
    }
    setSubmitting(true);
    try {
      if (mode === 'STOCK_IN') {
        await inventoryService.stockIn({ productId, quantity: qty });
        setSuccess('Stock received successfully.');
      } else {
        await inventoryService.stockOut({ productId, quantity: qty });
        setSuccess('Stock issued successfully.');
      }
      setQuantity('1');
      await load();
    } catch (err) {
      setFormError(
        err instanceof ApiRequestError
          ? err.message
          : 'Unable to update stock.',
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (loading && products.length === 0) {
    return <LoadingState label="Loading inventory..." />;
  }
  if (error && products.length === 0) {
    return <ErrorState message={error} onRetry={() => void load()} />;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">Operations</p>
          <h1 className="font-display mt-2 text-3xl md:text-4xl">
            Inventory Control
          </h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Record stock movements and review transaction history.
          </p>
        </div>
        <Button variant="secondary" onClick={() => void load()}>
          Refresh
        </Button>
      </div>

      {success ? <Alert tone="success">{success}</Alert> : null}
      {error ? <Alert>{error}</Alert> : null}

      <section className="border border-[var(--border)] bg-[var(--white)] p-5 md:p-6">
        <div className="flex gap-2">
          {(['STOCK_IN', 'STOCK_OUT'] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setMode(item)}
              className={`px-4 py-2 text-[11px] uppercase tracking-[0.14em] ${
                mode === item
                  ? 'bg-[var(--forest)] text-[var(--ivory)]'
                  : 'border border-[var(--border)] text-[var(--charcoal)]'
              }`}
            >
              {item === 'STOCK_IN' ? 'Stock In' : 'Stock Out'}
            </button>
          ))}
        </div>

        <form
          className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr_0.8fr_auto]"
          onSubmit={handleMovement}
        >
          <Select
            label="Product"
            name="productId"
            placeholder="Select product"
            options={productOptions}
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
          <Input
            label="Quantity"
            name="quantity"
            type="number"
            min="1"
            step="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <div className="rounded-sm border border-[var(--border)] bg-[var(--surface)] px-3 py-2">
            <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">
              Resulting stock
            </p>
            <p className="mt-2 font-display text-2xl">
              {previewStock === null
                ? '—'
                : previewStock < 0
                  ? 'Insufficient'
                  : formatNumber(previewStock)}
            </p>
          </div>
          <div className="flex items-end">
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting
                ? 'Processing...'
                : mode === 'STOCK_IN'
                  ? 'Receive'
                  : 'Issue'}
            </Button>
          </div>
        </form>

        {selectedProduct ? (
          <div className="mt-5 flex items-center gap-4 border-t border-[var(--border)] pt-5">
            <MediaImage
              src={getProductImage(selectedProduct)}
              alt={selectedProduct.name}
              className="h-16 w-14"
            />
            <div>
              <p className="font-medium">{selectedProduct.name}</p>
              <p className="text-sm text-[var(--muted)]">
                Current stock: {formatNumber(selectedProduct.currentStock)}
              </p>
            </div>
          </div>
        ) : null}

        {formError ? (
          <div className="mt-4">
            <Alert>{formError}</Alert>
          </div>
        ) : null}
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-[0.14em]">
          Transaction History
        </h2>
        <div className="grid gap-3 border border-[var(--border)] bg-[var(--white)] p-4 md:grid-cols-2">
          <Select
            label="Product"
            name="filterProductId"
            placeholder="All products"
            options={productOptions}
            value={filterProductId}
            onChange={(e) => setFilterProductId(e.target.value)}
          />
          <Select
            label="Type"
            name="filterType"
            placeholder="All types"
            options={[
              { value: 'STOCK_IN', label: 'Stock In' },
              { value: 'STOCK_OUT', label: 'Stock Out' },
              { value: 'ADJUSTMENT', label: 'Adjustment' },
            ]}
            value={filterType}
            onChange={(e) =>
              setFilterType(e.target.value as '' | InventoryTransactionType)
            }
          />
        </div>

        {transactions.length === 0 ? (
          <EmptyState title="No transactions found" />
        ) : (
          <div className="admin-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Product</th>
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
                      <p className="font-medium">{row.product.name}</p>
                      <p className="text-xs text-[var(--muted)]">
                        {row.product.sku}
                      </p>
                    </td>
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
                        {row.type.replace('_', ' ')}
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
