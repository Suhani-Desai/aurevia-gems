import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const prisma = new PrismaClient();

const categories = [
  {
    name: 'Diamonds',
    description: 'Cut with precision. Selected for brilliance.',
  },
  {
    name: 'Gold',
    description: 'Timeless material for enduring collections.',
  },
  {
    name: 'Silver',
    description: 'Refined versatility for modern jewellery.',
  },
  {
    name: 'Platinum',
    description: 'Rare, enduring and quietly distinctive.',
  },
];

const products = [
  {
    sku: 'AG-DM-AURELIA',
    name: 'Aurelia Round Brilliant',
    categoryName: 'Diamonds',
    purchasePrice: 42000,
    sellingPrice: 58500,
    currentStock: 18,
    minimumStock: 6,
  },
  {
    sku: 'AG-DM-CELESTE',
    name: 'Celeste Diamond Tennis Bracelet',
    categoryName: 'Diamonds',
    purchasePrice: 98000,
    sellingPrice: 132000,
    currentStock: 5,
    minimumStock: 4,
  },
  {
    sku: 'AG-GD-VERONA',
    name: 'Verona Gold Solitaire',
    categoryName: 'Gold',
    purchasePrice: 26500,
    sellingPrice: 34800,
    currentStock: 22,
    minimumStock: 8,
  },
  {
    sku: 'AG-SV-NOIR',
    name: 'Noir Silver Halo Pendant',
    categoryName: 'Silver',
    purchasePrice: 4200,
    sellingPrice: 6900,
    currentStock: 40,
    minimumStock: 12,
  },
  {
    sku: 'AG-PT-ELAN',
    name: 'Élan Platinum Band',
    categoryName: 'Platinum',
    purchasePrice: 31000,
    sellingPrice: 41500,
    currentStock: 9,
    minimumStock: 5,
  },
  {
    sku: 'AG-DM-LUMIERE',
    name: 'Lumière Diamond Studs',
    categoryName: 'Diamonds',
    purchasePrice: 18500,
    sellingPrice: 24900,
    currentStock: 14,
    minimumStock: 6,
  },
  {
    sku: 'AG-GD-SOLENNE',
    name: 'Solenne Gold Rope Bracelet',
    categoryName: 'Gold',
    purchasePrice: 15200,
    sellingPrice: 21400,
    currentStock: 16,
    minimumStock: 7,
  },
  {
    sku: 'AG-SV-ARGENT',
    name: 'Argent Silver Signet',
    categoryName: 'Silver',
    purchasePrice: 2800,
    sellingPrice: 4600,
    currentStock: 3,
    minimumStock: 8,
  },
];

async function main() {
  const email = 'admin@nextera.com';
  const passwordHash = await bcrypt.hash('Admin@123', 12);

  await prisma.user.upsert({
    where: { email },
    update: {
      name: 'Nextera Admin',
      passwordHash,
      role: Role.ADMIN,
    },
    create: {
      name: 'Nextera Admin',
      email,
      passwordHash,
      role: Role.ADMIN,
    },
  });

  const categoryIds: Record<string, string> = {};

  for (const category of categories) {
    const saved = await prisma.category.upsert({
      where: { name: category.name },
      update: { description: category.description },
      create: category,
    });
    categoryIds[category.name] = saved.id;
  }

  for (const product of products) {
    await prisma.product.upsert({
      where: { sku: product.sku },
      update: {
        name: product.name,
        categoryId: categoryIds[product.categoryName],
        purchasePrice: product.purchasePrice,
        sellingPrice: product.sellingPrice,
        currentStock: product.currentStock,
        minimumStock: product.minimumStock,
      },
      create: {
        sku: product.sku,
        name: product.name,
        categoryId: categoryIds[product.categoryName],
        purchasePrice: product.purchasePrice,
        sellingPrice: product.sellingPrice,
        currentStock: product.currentStock,
        minimumStock: product.minimumStock,
      },
    });
  }

  console.log(
    `Seed completed: admin + ${categories.length} categories + ${products.length} products`,
  );
}

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
