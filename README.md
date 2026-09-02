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

- Public B2B website (home, collections, product detail, enquiry)
- JWT authentication
- Category management
- Product management
- Inventory stock-in / stock-out with transaction history
- Low-stock tracking
- Inventory dashboard summary
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

3. **Run Prisma migration**

```bash
npx prisma migrate dev
```

4. **Seed admin user**

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

## Architecture

```text
React frontend  →  Express API  →  Prisma  →  PostgreSQL
```

- **Public website** (`/`, `/collections`, `/product/:id`, `/contact`) is unauthenticated and reads catalogue data from the API. Contact form submissions POST to `/api/enquiries`.
- **Admin application** (`/login`, `/dashboard`, `/enquiries`, `/products`, `/categories`, `/inventory`) is JWT-protected and manages inventory operations plus trade enquiries.
- Admin product routes (`/products`, `/products/new`, `/products/:id/edit`) are separate from the public product detail route (`/product/:id`).

## Project structure

- `client/` — React application
- `server/` — Express API
- `prisma/` — schema, migrations, and seed
