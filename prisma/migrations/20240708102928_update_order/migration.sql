-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "being_delivered" DROP NOT NULL,
ALTER COLUMN "curier_wareshouse" DROP NOT NULL,
ALTER COLUMN "delivered" DROP NOT NULL,
ALTER COLUMN "delivered_to_curier" DROP NOT NULL,
ALTER COLUMN "isPaid" SET DEFAULT false,
ALTER COLUMN "payment_acceptedAt" DROP NOT NULL;
