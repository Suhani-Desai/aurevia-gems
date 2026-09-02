import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';
import type { Server } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import { createApp } from '../src/app.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const prisma = new PrismaClient();
const app = createApp();

const RUN_ID = `t${Date.now()}`;
const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL ?? 'admin@nextera.com';
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD ?? 'Admin@123';

let server: Server;
let baseUrl = '';
let token = '';
let categoryId = '';
const createdProductIds: string[] = [];

async function api() {
  return request(baseUrl);
}

async function authHeaders() {
  return { Authorization: `Bearer ${token}` };
}

describe('Aurevia assessment backend', () => {
  before(async () => {
    if (!process.env.DATABASE_URL || !process.env.JWT_SECRET) {
      throw new Error('DATABASE_URL and JWT_SECRET are required for tests');
    }

    server = app.listen(0);
    await new Promise<void>((resolve) => server.once('listening', resolve));
    const address = server.address();
    if (!address || typeof address === 'string') {
      throw new Error('Unable to bind test server');
    }
    baseUrl = `http://127.0.0.1:${address.port}`;

    const category = await prisma.category.upsert({
      where: { name: `Test Cat ${RUN_ID}` },
      update: {},
      create: {
        name: `Test Cat ${RUN_ID}`,
        description: 'Isolated test category',
      },
    });
    categoryId = category.id;
  });

  after(async () => {
    if (createdProductIds.length > 0) {
      await prisma.inventoryTransaction.deleteMany({
        where: { productId: { in: createdProductIds } },
      });
      await prisma.product.deleteMany({
        where: { id: { in: createdProductIds } },
      });
    }
    await prisma.category.deleteMany({
      where: { name: `Test Cat ${RUN_ID}` },
    });
    await prisma.$disconnect();
    await new Promise<void>((resolve, reject) => {
      server.close((err) => (err ? reject(err) : resolve()));
    });
  });

  it('1. valid admin login succeeds', async () => {
    const res = await (await api())
      .post('/api/auth/login')
      .send({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD });

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(res.body.data.token);
    assert.equal(res.body.data.user.email, ADMIN_EMAIL);
    token = res.body.data.token;
  });

  it('2. invalid login is rejected', async () => {
    const res = await (await api())
      .post('/api/auth/login')
      .send({ email: ADMIN_EMAIL, password: 'wrong-password' });

    assert.equal(res.status, 401);
    assert.equal(res.body.success, false);
  });

  it('3. product creation works', async () => {
    const res = await (await api())
      .post('/api/products')
      .set(await authHeaders())
      .send({
        sku: `${RUN_ID}-SKU-1`,
        name: `Test Product ${RUN_ID}`,
        categoryId,
        purchasePrice: 1000,
        sellingPrice: 2500,
        currentStock: 10,
        minimumStock: 4,
      });

    assert.equal(res.status, 201);
    assert.equal(res.body.data.product.sku, `${RUN_ID}-SKU-1`);
    assert.equal(res.body.data.product.currentStock, 10);
    createdProductIds.push(res.body.data.product.id);
  });

  it('4. duplicate SKU is rejected', async () => {
    const res = await (await api())
      .post('/api/products')
      .set(await authHeaders())
      .send({
        sku: `${RUN_ID}-SKU-1`,
        name: 'Duplicate SKU product',
        categoryId,
        purchasePrice: 100,
        sellingPrice: 200,
        currentStock: 1,
        minimumStock: 1,
      });

    assert.equal(res.status, 409);
    assert.equal(res.body.success, false);
  });

  it('5. invalid product input is rejected', async () => {
    const res = await (await api())
      .post('/api/products')
      .set(await authHeaders())
      .send({
        sku: '',
        name: '',
        categoryId: '',
        purchasePrice: -5,
        sellingPrice: -1,
        currentStock: -2,
        minimumStock: -1,
      });

    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
  });

  it('6. stock in increases currentStock', async () => {
    const productId = createdProductIds[0];
    const res = await (await api())
      .post('/api/inventory/stock-in')
      .set(await authHeaders())
      .send({ productId, quantity: 5 });

    assert.equal(res.status, 200);
    assert.equal(res.body.data.product.currentStock, 15);
    assert.equal(res.body.data.transaction.type, 'STOCK_IN');
    assert.equal(res.body.data.transaction.unitPrice, null);
  });

  it('7. stock out decreases currentStock', async () => {
    const productId = createdProductIds[0];
    const res = await (await api())
      .post('/api/inventory/stock-out')
      .set(await authHeaders())
      .send({ productId, quantity: 3 });

    assert.equal(res.status, 200);
    assert.equal(res.body.data.product.currentStock, 12);
    assert.equal(res.body.data.transaction.type, 'STOCK_OUT');
    assert.equal(res.body.data.transaction.unitPrice, 2500);
  });

  it('8. stock out cannot make stock negative', async () => {
    const productId = createdProductIds[0];
    const res = await (await api())
      .post('/api/inventory/stock-out')
      .set(await authHeaders())
      .send({ productId, quantity: 999 });

    assert.equal(res.status, 400);
    assert.match(res.body.message, /Insufficient stock/i);
  });

  it('9. adjustment correctly changes stock', async () => {
    const productId = createdProductIds[0];
    const res = await (await api())
      .post('/api/inventory/adjust')
      .set(await authHeaders())
      .send({ productId, adjustedStock: 8 });

    assert.equal(res.status, 200);
    assert.equal(res.body.data.product.currentStock, 8);
    assert.equal(res.body.data.transaction.type, 'ADJUSTMENT');
    assert.equal(res.body.data.transaction.quantity, 4);
    assert.equal(res.body.data.transaction.balance, 8);
    assert.equal(res.body.data.transaction.unitPrice, null);
  });

  it('10. adjustment cannot produce negative stock', async () => {
    const productId = createdProductIds[0];
    const res = await (await api())
      .post('/api/inventory/adjust')
      .set(await authHeaders())
      .send({ productId, adjustedStock: -1 });

    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
  });

  it('11. product is low stock when currentStock <= minimumStock', async () => {
    const productId = createdProductIds[0];
    // current 8, min 4 -> not low yet; adjust to 4
    await (await api())
      .post('/api/inventory/adjust')
      .set(await authHeaders())
      .send({ productId, adjustedStock: 4 });

    const res = await (await api())
      .get('/api/inventory/low-stock')
      .set(await authHeaders());

    assert.equal(res.status, 200);
    const ids = res.body.data.products.map((p: { id: string }) => p.id);
    assert.ok(ids.includes(productId));
  });

  it('12-15. dashboard totals and total sales from priced stock-outs', async () => {
    const createRes = await (await api())
      .post('/api/products')
      .set(await authHeaders())
      .send({
        sku: `${RUN_ID}-SKU-SALES`,
        name: `Sales Probe ${RUN_ID}`,
        categoryId,
        purchasePrice: 100,
        sellingPrice: 400,
        currentStock: 20,
        minimumStock: 2,
      });
    assert.equal(createRes.status, 201);
    const salesProductId = createRes.body.data.product.id;
    createdProductIds.push(salesProductId);

    await (await api())
      .post('/api/inventory/stock-out')
      .set(await authHeaders())
      .send({ productId: salesProductId, quantity: 2 });

    await (await api())
      .post('/api/inventory/stock-in')
      .set(await authHeaders())
      .send({ productId: salesProductId, quantity: 1 });

    const before = await (await api())
      .get('/api/dashboard/summary')
      .set(await authHeaders());
    assert.equal(before.status, 200);

    const summary = before.body.data.summary;
    assert.ok(typeof summary.totalProducts === 'number');
    assert.ok(summary.totalProducts >= 2);
    assert.ok(typeof summary.totalStockUnits === 'number');
    assert.ok(typeof summary.lowStockCount === 'number');
    assert.ok(typeof summary.totalSales === 'number');

    // Stock-out of 2 × 400 = 800 must be included; stock-in must not add sales.
    assert.ok(summary.totalSales >= 800);

    const txRows = await prisma.inventoryTransaction.findMany({
      where: {
        productId: salesProductId,
        type: 'STOCK_OUT',
        unitPrice: { not: null },
      },
    });
    const expectedFromProbe = txRows.reduce(
      (sum, row) => sum + row.quantity * Number(row.unitPrice),
      0,
    );
    assert.equal(expectedFromProbe, 800);
  });
});
