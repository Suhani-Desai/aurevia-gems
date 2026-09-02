import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../components/Badge';
import {
  EmptyState,
  ErrorState,
  LoadingState,
} from '../components/Feedback';
import { MediaImage } from '../components/MediaImage';
import { useAuth } from '../hooks/useAuth';
import { ApiRequestError } from '../services/api';
import * as dashboardService from '../services/dashboardService';
import * as inventoryService from '../services/inventoryService';
import * as productService from '../services/productService';
import type { DashboardSummary, Product } from '../types';
import {
  formatCurrency,
  formatDateTime,
  formatNumber,
} from '../utils/format';
import { getProductImage } from '../utils/productVisual';

export function DashboardPage() {
  const { user } = useAuth();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [lowStock, setLowStock] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [summaryData, lowStockData, productRows] = await Promise.all([
        dashboardService.getDashboardSummary(),
        inventoryService.listLowStockProducts(),
        productService.listProducts(),
      ]);
      setSummary(summaryData);
      setLowStock(lowStockData);
      setProducts(productRows);
    } catch (err) {
      setError(
        err instanceof ApiRequestError
          ? err.message
          : 'Unable to load dashboard data.',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const distribution = useMemo(() => {
    const counts = new Map<string, number>();
    products.forEach((product) => {
      const name = product.category.name;
      counts.set(name, (counts.get(name) ?? 0) + 1);
    });
    const total = Math.max(products.length, 1);
    return [...counts.entries()]
      .map(([name, value]) => ({
        name,
        value,
        pct: Math.round((value / total) * 100),
      }))
      .sort((a, b) => b.value - a.value);
  }, [products]);

  if (loading) return <LoadingState label="Loading overview..." />;
  if (error) return <ErrorState message={error} onRetry={() => void load()} />;
  if (!summary) return <EmptyState title="No dashboard data available" />;

  const metrics = [
    { label: 'Total Products', value: formatNumber(summary.totalProducts) },
    { label: 'Total Categories', value: formatNumber(summary.totalCategories) },
    { label: 'Total Stock', value: formatNumber(summary.totalStockUnits) },
    { label: 'Low Stock', value: formatNumber(summary.lowStockCount) },
    {
      label: 'New Enquiries',
      value: formatNumber(summary.newEnquiryCount),
    },
    {
      label: 'Inventory Value',
      value: formatCurrency(summary.inventoryValue),
    },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">Overview</p>
          <h1 className="font-display mt-2 text-3xl md:text-4xl">
            Good day, {user?.name ?? 'Admin'}
          </h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Inventory overview across Aurevia Gems.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/enquiries" className="btn-ghost">
            View enquiries
          </Link>
          <Link to="/inventory" className="btn-primary">
            Manage inventory
          </Link>
        </div>
      </div>

      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {metrics.map((metric) => (
          <div key={metric.label} className="admin-metric">
            <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">
              {metric.label}
            </p>
            <p className="mt-3 font-display text-3xl text-[var(--charcoal)]">
              {metric.value}
            </p>
          </div>
        ))}
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[0.85rem] border border-[var(--border)] bg-[var(--white)] p-5 md:p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em]">
            Inventory by category
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Product distribution across materials.
          </p>
          <div className="mt-6 space-y-4">
            {distribution.length === 0 ? (
              <p className="text-sm text-[var(--muted)]">No products yet.</p>
            ) : (
              distribution.map((item) => (
                <div key={item.name}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>{item.name}</span>
                    <span className="text-[var(--muted)]">
                      {item.value} · {item.pct}%
                    </span>
                  </div>
                  <div className="chart-bar">
                    <span style={{ width: `${Math.max(item.pct, 8)}%` }} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em]">
              Low Stock
            </h2>
            <Link
              to="/products?lowStock=true"
              className="text-[11px] uppercase tracking-[0.14em] text-[var(--forest)]"
            >
              View products
            </Link>
          </div>
          {lowStock.length === 0 ? (
            <EmptyState
              title="No low-stock items"
              description="All products are above minimum thresholds."
            />
          ) : (
            <div className="space-y-3">
              {lowStock.slice(0, 5).map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 rounded-[0.85rem] border border-[var(--border)] bg-[var(--white)] p-3"
                >
                  <MediaImage
                    src={getProductImage(product)}
                    alt={product.name}
                    className="h-16 w-14 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{product.name}</p>
                    <p className="text-xs text-[var(--muted)]">{product.sku}</p>
                    <p className="mt-1 text-xs text-[var(--warning)]">
                      Stock {product.currentStock} / min {product.minimumStock}
                    </p>
                  </div>
                  <Badge variant="warning">
                    {product.currentStock <= 0 ? 'Out of Stock' : 'Low Stock'}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em]">
          Recent Transactions
        </h2>
        {summary.recentTransactions.length === 0 ? (
          <EmptyState title="No recent transactions" />
        ) : (
          <div className="admin-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>Balance</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {summary.recentTransactions.map((row) => (
                  <tr key={row.id}>
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
                    <td>{formatDateTime(row.createdAt)}</td>
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
