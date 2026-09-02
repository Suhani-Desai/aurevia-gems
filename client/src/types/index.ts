export type UserRole = 'ADMIN' | 'STAFF';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
};

export type AuthResponse = {
  user: User;
  token: string;
};

export type ApiSuccess<T> = {
  success: true;
  message?: string;
  data: T;
};

export type ApiError = {
  success: false;
  message: string;
  errors?: unknown;
};

export type Category = {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ProductCategory = {
  id: string;
  name: string;
  description: string | null;
};

export type Product = {
  id: string;
  sku: string;
  name: string;
  categoryId: string;
  purchasePrice: number;
  sellingPrice: number;
  currentStock: number;
  minimumStock: number;
  createdAt: string;
  updatedAt: string;
  category: ProductCategory;
};

export type InventoryTransactionType = 'STOCK_IN' | 'STOCK_OUT' | 'ADJUSTMENT';

export type InventoryTransaction = {
  id: string;
  productId: string;
  type: InventoryTransactionType;
  quantity: number;
  balance: number;
  unitPrice: number | null;
  createdAt: string;
  product: Product;
};

export type DashboardSummary = {
  totalProducts: number;
  totalCategories: number;
  totalStockUnits: number;
  lowStockCount: number;
  inventoryValue: number;
  totalSales: number;
  newEnquiryCount: number;
  recentTransactions: InventoryTransaction[];
};

export type EnquiryStatus = 'NEW' | 'REVIEWED' | 'CLOSED';

export type Enquiry = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  requirement: string;
  message: string;
  status: EnquiryStatus;
  createdAt: string;
  updatedAt: string;
};

export type CreateCategoryInput = {
  name: string;
  description?: string | null;
};

export type CreateProductInput = {
  sku: string;
  name: string;
  categoryId: string;
  purchasePrice: number;
  sellingPrice: number;
  currentStock: number;
  minimumStock: number;
};

export type UpdateProductInput = Partial<CreateProductInput>;

export type ProductListQuery = {
  search?: string;
  categoryId?: string;
  lowStock?: boolean;
};

export type StockMovementInput = {
  productId: string;
  quantity: number;
};

export type StockAdjustmentInput = {
  productId: string;
  adjustedStock: number;
};

export type TransactionListQuery = {
  productId?: string;
  type?: InventoryTransactionType;
  from?: string;
  to?: string;
};

export type ProductStockStatus = 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';
