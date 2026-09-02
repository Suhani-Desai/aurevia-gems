import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, LoadingState } from '../components/Feedback';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { ApiRequestError } from '../services/api';
import * as categoryService from '../services/categoryService';
import * as productService from '../services/productService';
import type { Category } from '../types';

type FormState = {
  sku: string;
  name: string;
  categoryId: string;
  purchasePrice: string;
  sellingPrice: string;
  currentStock: string;
  minimumStock: string;
};

const emptyForm: FormState = {
  sku: '',
  name: '',
  categoryId: '',
  purchasePrice: '',
  sellingPrice: '',
  currentStock: '0',
  minimumStock: '0',
};

export function ProductFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError('');
      try {
        const categoryRows = await categoryService.listCategories();
        setCategories(categoryRows);

        if (id) {
          const product = await productService.getProduct(id);
          setForm({
            sku: product.sku,
            name: product.name,
            categoryId: product.categoryId,
            purchasePrice: String(product.purchasePrice),
            sellingPrice: String(product.sellingPrice),
            currentStock: String(product.currentStock),
            minimumStock: String(product.minimumStock),
          });
        }
      } catch (err) {
        setError(
          err instanceof ApiRequestError
            ? err.message
            : 'Unable to load product form.',
        );
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, [id]);

  const categoryOptions = useMemo(
    () =>
      categories.map((category) => ({
        value: category.id,
        label: category.name,
      })),
    [categories],
  );

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function validate() {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.sku.trim()) nextErrors.sku = 'SKU is required';
    if (!form.name.trim()) nextErrors.name = 'Product name is required';
    if (!form.categoryId) nextErrors.categoryId = 'Category is required';

    const purchasePrice = Number(form.purchasePrice);
    const sellingPrice = Number(form.sellingPrice);
    const currentStock = Number(form.currentStock);
    const minimumStock = Number(form.minimumStock);

    if (form.purchasePrice === '' || Number.isNaN(purchasePrice)) {
      nextErrors.purchasePrice = 'Purchase price is required';
    } else if (purchasePrice < 0) {
      nextErrors.purchasePrice = 'Purchase price cannot be negative';
    }

    if (form.sellingPrice === '' || Number.isNaN(sellingPrice)) {
      nextErrors.sellingPrice = 'Selling price is required';
    } else if (sellingPrice < 0) {
      nextErrors.sellingPrice = 'Selling price cannot be negative';
    }

    if (form.currentStock === '' || Number.isNaN(currentStock)) {
      nextErrors.currentStock = 'Current stock is required';
    } else if (!Number.isInteger(currentStock) || currentStock < 0) {
      nextErrors.currentStock = 'Current stock must be a non-negative integer';
    }

    if (form.minimumStock === '' || Number.isNaN(minimumStock)) {
      nextErrors.minimumStock = 'Minimum stock is required';
    } else if (!Number.isInteger(minimumStock) || minimumStock < 0) {
      nextErrors.minimumStock = 'Minimum stock must be a non-negative integer';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!validate()) {
      return;
    }

    const payload = {
      sku: form.sku.trim(),
      name: form.name.trim(),
      categoryId: form.categoryId,
      purchasePrice: Number(form.purchasePrice),
      sellingPrice: Number(form.sellingPrice),
      currentStock: Number(form.currentStock),
      minimumStock: Number(form.minimumStock),
    };

    setSaving(true);
    try {
      if (isEdit && id) {
        await productService.updateProduct(id, payload);
        setSuccess('Product updated successfully.');
      } else {
        await productService.createProduct(payload);
        setSuccess('Product created successfully.');
      }
      setTimeout(() => navigate('/products'), 500);
    } catch (err) {
      setError(
        err instanceof ApiRequestError
          ? err.message
          : 'Unable to save product.',
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <LoadingState label="Loading form..." />;
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">{isEdit ? 'Edit' : 'Create'}</p>
          <h1 className="font-display mt-2 text-3xl md:text-4xl">
            {isEdit ? 'Edit Product' : 'Add Product'}
          </h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            {isEdit
              ? 'Update product details. Use Inventory for stock movements.'
              : 'Create a catalogue item. Initial stock does not create inventory transactions.'}
          </p>
        </div>
        <Button variant="secondary" onClick={() => navigate('/products')}>
          Back to products
        </Button>
      </div>

      {error ? <Alert>{error}</Alert> : null}
      {success ? <Alert tone="success">{success}</Alert> : null}

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border border-[var(--border)] bg-white p-5 shadow-[var(--shadow)]"
        noValidate
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="SKU"
            name="sku"
            value={form.sku}
            onChange={(event) => updateField('sku', event.target.value)}
            error={errors.sku}
          />
          <Input
            label="Product Name"
            name="name"
            value={form.name}
            onChange={(event) => updateField('name', event.target.value)}
            error={errors.name}
          />
        </div>

        <Select
          label="Category"
          name="categoryId"
          placeholder="Select category"
          options={categoryOptions}
          value={form.categoryId}
          onChange={(event) => updateField('categoryId', event.target.value)}
          error={errors.categoryId}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Purchase Price"
            name="purchasePrice"
            type="number"
            min="0"
            step="0.01"
            value={form.purchasePrice}
            onChange={(event) =>
              updateField('purchasePrice', event.target.value)
            }
            error={errors.purchasePrice}
          />
          <Input
            label="Selling Price"
            name="sellingPrice"
            type="number"
            min="0"
            step="0.01"
            value={form.sellingPrice}
            onChange={(event) => updateField('sellingPrice', event.target.value)}
            error={errors.sellingPrice}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Current Stock"
            name="currentStock"
            type="number"
            min="0"
            step="1"
            value={form.currentStock}
            onChange={(event) => updateField('currentStock', event.target.value)}
            error={errors.currentStock}
            hint={
              isEdit
                ? 'Prefer Inventory stock-in/out for operational stock changes.'
                : undefined
            }
          />
          <Input
            label="Minimum Stock"
            name="minimumStock"
            type="number"
            min="0"
            step="1"
            value={form.minimumStock}
            onChange={(event) =>
              updateField('minimumStock', event.target.value)
            }
            error={errors.minimumStock}
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate('/products')}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? 'Saving...' : isEdit ? 'Save changes' : 'Create product'}
          </Button>
        </div>
      </form>
    </div>
  );
}
