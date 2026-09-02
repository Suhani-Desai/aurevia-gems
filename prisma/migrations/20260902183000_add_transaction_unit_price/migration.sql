-- Align DB with schema: enquiries may already exist from earlier db push.
-- Use IF NOT EXISTS / exception handlers so this forward migration is safe.

DO $$ BEGIN
    CREATE TYPE "EnquiryStatus" AS ENUM ('NEW', 'REVIEWED', 'CLOSED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "enquiries" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "requirement" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" "EnquiryStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "enquiries_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "enquiries_status_idx" ON "enquiries"("status");
CREATE INDEX IF NOT EXISTS "enquiries_createdAt_idx" ON "enquiries"("createdAt");

-- Preserve selling price on stock-out for Total Sales
ALTER TABLE "inventory_transactions" ADD COLUMN IF NOT EXISTS "unitPrice" DECIMAL(12,2);
