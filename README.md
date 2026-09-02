# Aurevia Gems

Premium B2B Diamonds & Jewellery website with a protected Inventory Management Application for the Nextera Technologies full-stack assessment.

## Tech Stack

**Frontend**
- React, TypeScript, Vite, Tailwind CSS, React Router

**Backend**
- Node.js, Express, TypeScript

**Database**
- PostgreSQL with Prisma ORM

## Features

- Public B2B website (home, collections, materials, about, product detail, enquiry)
- JWT authentication
- Category management
- Product management (add / view / edit / delete / search)
- Inventory stock-in, stock-out, and adjustment with transaction history
- Low-stock tracking
- Inventory dashboard summary including Total Sales
- Trade enquiry inbox
- Protected admin workspace

## Setup

1. **Install dependencies** (from the repository root):

```bash
npm install
```

2. **Configure environment**

Copy `.env.example` to `.env` and set:

- `DATABASE_URL` — PostgreSQL connection string
- `JWT_SECRET` — strong secret for signing tokens
- `PORT` — API port (default `3000`)

3. **Run Prisma migrations**

```bash
npx prisma migrate deploy
```

(For local development you may also use `npx prisma migrate dev`.)

4. **Seed admin user and catalogue**

```bash
npm run prisma:seed
```

5. **Start development servers**

```bash
npm run dev
```

- Public site & admin UI: `http://localhost:5173`
- API: `http://localhost:3000`

### Production builds

```bash
npm run build
```

### Admin credentials

- Email: `admin@nextera.com`
- Password: `Admin@123`

## Total Sales

This assessment does **not** include a separate sales/order module.

**Total Sales** on the dashboard is therefore derived from inventory activity:

```text
TOTAL SALES = SUM(STOCK_OUT quantity × unitPrice)
```

- Only `STOCK_OUT` transactions contribute.
- `unitPrice` is the product’s **sellingPrice captured at the moment of stock-out**.
- `STOCK_IN` and `ADJUSTMENT` do not contribute.
- Legacy `STOCK_OUT` rows created before `unitPrice` existed (where `unitPrice` is null) are **excluded**. Historical prices are not invented.

## Inventory Adjustment

**Adjustment** sets a product to a new absolute stock level.

Example:

- Current stock: `25`
- Adjusted stock: `20`
- Difference: `5`
- Creates an `ADJUSTMENT` transaction with `quantity = 5` and `balance = 20`
- Updates `Product.currentStock` to `20`

Rules:

- Adjusted stock cannot be negative.
- Stock in / stock out behaviour is unchanged.
- Adjustments are written atomically with Prisma transactions.

## Testing

Run the focused backend suite from the repository root (requires a configured `.env` and migrated database, plus the seeded admin user):

```bash
npm test
```

Covered business rules:

1. Valid admin login succeeds
2. Invalid login is rejected
3. Product creation works
4. Duplicate SKU is rejected
5. Invalid product input is rejected
6. Stock In increases `currentStock`
7. Stock Out decreases `currentStock`
8. Stock Out cannot make stock negative
9. Adjustment correctly changes stock
10. Adjustment cannot produce negative stock
11. Low stock when `currentStock <= minimumStock`
12–15. Dashboard totals including Total Sales from priced `STOCK_OUT` rows only

Tests create isolated temporary products/categories and clean them up afterward.

## Known limitations

- This is an **assessment-level** inventory application, not a full ERP.
- There is **no** separate order/sales domain, invoicing, payments, or customer accounts.
- Product images are mapped statically by SKU (not uploaded files).
- Enquiries are stored for admin review; email notifications are not sent.
- Role-based UI beyond the seeded admin account, CSV export, pagination, and audit logs are out of scope.

## Architecture

```text
React frontend  →  Express API  →  Prisma  →  PostgreSQL
```

- **Public website** (`/`, `/collections`, `/product/:id`, `/contact`, …) is unauthenticated and reads catalogue data from the API. Contact form submissions POST to `/api/enquiries`.
- **Admin application** (`/login`, `/dashboard`, `/enquiries`, `/products`, `/products/:id`, `/categories`, `/inventory`) is JWT-protected.
- Admin product routes (`/products`, `/products/new`, `/products/:id`, `/products/:id/edit`) are separate from the public product detail route (`/product/:id`).

## Project structure

- `client/` — React application
- `server/` — Express API
- `prisma/` — schema, migrations, and seed
- `server/tests/` — automated backend tests
