import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { Button } from '../components/Button';
import { ConfirmDialog } from '../components/ConfirmDialog';
import {
  Alert,
  EmptyState,
  ErrorState,
  LoadingState,
} from '../components/Feedback';
import { Input } from '../components/Input';
import { Modal } from '../components/Modal';
import { ApiRequestError } from '../services/api';
import * as categoryService from '../services/categoryService';
import type { Category } from '../types';
import { formatDateTime } from '../utils/format';

type CategoryForm = {
  name: string;
  description: string;
};

const emptyForm: CategoryForm = {
  name: '',
  description: '',
};

export function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState<CategoryForm>(emptyForm);
  const [fieldErrors, setFieldErrors] = useState<Partial<CategoryForm>>({});
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setCategories(await categoryService.listCategories());
    } catch (err) {
      setError(
        err instanceof ApiRequestError
          ? err.message
          : 'Unable to load categories.',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setFieldErrors({});
    setError('');
    setModalOpen(true);
  }

  function openEdit(category: Category) {
    setEditing(category);
    setForm({
      name: category.name,
      description: category.description ?? '',
    });
    setFieldErrors({});
    setError('');
    setModalOpen(true);
  }

  function validate() {
    const next: Partial<CategoryForm> = {};
    if (!form.name.trim()) {
      next.name = 'Name is required';
    }
    setFieldErrors(next);
    return Object.keys(next).length === 0;
  }

  async function saveCategory() {
    setError('');
    setSuccess('');

    if (!validate()) {
      return;
    }

    const payload = {
      name: form.name.trim(),
      description: form.description.trim() || null,
    };

    setSaving(true);
    try {
      if (editing) {
        await categoryService.updateCategory(editing.id, payload);
        setSuccess('Category updated.');
      } else {
        await categoryService.createCategory(payload);
        setSuccess('Category created.');
      }
      setModalOpen(false);
      await load();
    } catch (err) {
      setError(
        err instanceof ApiRequestError
          ? err.message
          : 'Unable to save category.',
      );
    } finally {
      setSaving(false);
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    void saveCategory();
  }

  async function handleDelete() {
    if (!deleteTarget) {
      return;
    }

    setDeleting(true);
    setSuccess('');
    try {
      await categoryService.deleteCategory(deleteTarget.id);
      setDeleteTarget(null);
      setSuccess(`Deleted category "${deleteTarget.name}".`);
      await load();
    } catch (err) {
      setError(
        err instanceof ApiRequestError
          ? err.message
          : 'Unable to delete category.',
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
          <h1 className="font-display mt-2 text-3xl md:text-4xl">Categories</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Organize jewellery products into materials and ranges.
          </p>
        </div>
        <Button onClick={openCreate}>Add category</Button>
      </div>

      {success ? <Alert tone="success">{success}</Alert> : null}
      {error ? <Alert>{error}</Alert> : null}

      {loading ? (
        <LoadingState label="Loading categories..." />
      ) : error && categories.length === 0 ? (
        <ErrorState message={error} onRetry={() => void load()} />
      ) : categories.length === 0 ? (
        <EmptyState
          title="No categories yet"
          description="Create your first category to start adding products."
        />
      ) : (
        <div className="admin-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Description</th>
                <th>Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((row) => (
                <tr key={row.id}>
                  <td className="font-medium">{row.name}</td>
                  <td>{row.description || '—'}</td>
                  <td>{formatDateTime(row.updatedAt)}</td>
                  <td>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        className="text-[var(--forest)]"
                        onClick={() => openEdit(row)}
                      >
                        Edit
                      </button>
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

      <Modal
        open={modalOpen}
        title={editing ? 'Edit category' : 'Add category'}
        onClose={() => setModalOpen(false)}
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setModalOpen(false)}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button onClick={() => void saveCategory()} disabled={saving}>
              {saving ? 'Saving...' : editing ? 'Save changes' : 'Create'}
            </Button>
          </>
        }
      >
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <Input
            label="Name"
            name="name"
            value={form.name}
            onChange={(event) =>
              setForm((current) => ({ ...current, name: event.target.value }))
            }
            error={fieldErrors.name}
          />
          <Input
            label="Description"
            name="description"
            value={form.description}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                description: event.target.value,
              }))
            }
          />
        </form>
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete category"
        message={`Delete "${deleteTarget?.name ?? ''}"? Categories with assigned products cannot be deleted.`}
        confirmLabel="Delete"
        loading={deleting}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => void handleDelete()}
      />
    </div>
  );
}
