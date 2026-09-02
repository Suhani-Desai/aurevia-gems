import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { ConfirmDialog } from '../components/ConfirmDialog';
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
import * as categoryService from '../services/categoryService';
import * as productService from '../services/productService';
import type { Category, Product } from '../types';
import {
  formatCurrency,
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

export function ProductsPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [search, setSearch] = useState(searchParams.get('search') ?? '');
  const [categoryId, setCategoryId] = useState(
    searchParams.get('categoryId') ?? '',
  );
  const [lowStock, setLowStock] = useState(
    searchParams.get('lowStock') === 'true',
  );
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [productRows, categoryRows] = await Promise.all([
        productService.listProducts({
          search: search || undefined,
          categoryId: categoryId || undefined,
          lowStock: lowStock || undefined,
        }),
        categoryService.listCategories(),
      ]);
      setProducts(productRows);
      setCategories(categoryRows);
    } catch (err) {
      setError(
        err instanceof ApiRequestError
          ? err.message
          : 'Unable to load products.',
      );
    } finally {
      setLoading(false);
    }
  }, [search, categoryId, lowStock]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    const next = new URLSearchParams();
    if (search) next.set('search', search);
    if (categoryId) next.set('categoryId', categoryId);
    if (lowStock) next.set('lowStock', 'true');
    setSearchParams(next, { replace: true });
  }, [search, categoryId, lowStock, setSearchParams]);

  const categoryOptions = useMemo(
    () =>
      categories.map((category) => ({
        value: category.id,
        label: category.name,
      })),
    [categories],
  );

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    setSuccess('');
    try {
      await productService.deleteProduct(deleteTarget.id);
      setSuccess(`Deleted ${deleteTarget.name}`);
      setDeleteTarget(null);
      await load();
    } catch (err) {
      setError(
        err instanceof ApiRequestError
          ? err.message
          : 'Unable to delete product.',
      );
      setDeleteTarget(null);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">Catalogue</p>
          <h1 className="font-display mt-2 text-3xl md:text-4xl">Products</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Manage SKUs, pricing, and stock thresholds.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => void load()}>
            Refresh
          </Button>
          <Button onClick={() => navigate('/products/new')}>Add product</Button>
        </div>
      </div>

      <div className="grid gap-3 rounded-[0.85rem] border border-[var(--border)] bg-[var(--white)] p-4 md:grid-cols-4">
        <Input
          label="Search"
          name="search"
          placeholder="Name or SKU"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          label="Category"
          name="categoryId"
          placeholder="All categories"
          options={categoryOptions}
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        />
        <label className="flex items-end gap-2 pb-2 text-sm text-[var(--charcoal)]">
          <input
            type="checkbox"
            checked={lowStock}
            onChange={(e) => setLowStock(e.target.checked)}
            className="size-4"
          />
          Low stock only
        </label>
        <div className="flex items-end">
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => {
              setSearch('');
              setCategoryId('');
              setLowStock(false);
            }}
          >
            Clear filters
          </Button>
        </div>
      </div>

      {success ? <Alert tone="success">{success}</Alert> : null}
      {error ? <Alert>{error}</Alert> : null}

      {loading ? (
        <LoadingState label="Loading products..." />
      ) : error && products.length === 0 ? (
        <ErrorState message={error} onRetry={() => void load()} />
      ) : products.length === 0 ? (
        <EmptyState title="No products found" />
      ) : (
        <div className="admin-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((row) => (
                <tr key={row.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <MediaImage
                        src={getProductImage(row)}
                        alt={row.name}
                        className="h-12 w-10 shrink-0"
                      />
                      <span className="font-medium">{row.name}</span>
                    </div>
                  </td>
                  <td>{row.sku}</td>
                  <td>{row.category.name}</td>
                  <td>{formatCurrency(row.sellingPrice)}</td>
                  <td>
                    {formatNumber(row.currentStock)}
                    <span className="text-[var(--muted)]">
                      {' '}
                      / {row.minimumStock}
                    </span>
                  </td>
                  <td>{statusBadge(row)}</td>
                  <td>
                    <div className="flex gap-3">
                      <Link
                        to={`/products/${row.id}/edit`}
                        className="text-[var(--forest)]"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        className="text-[var(--danger)]"
                        onClick={() => setDeleteTarget(row)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete product"
        message={`Delete "${deleteTarget?.name ?? ''}"? This cannot be undone.`}
        confirmLabel="Delete"
        loading={deleting}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => void handleDelete()}
      />
    </div>
  );
}
