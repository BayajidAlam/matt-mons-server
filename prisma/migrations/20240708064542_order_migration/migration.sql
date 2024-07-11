/*
  Warnings:

  - A unique constraint covering the columns `[trnsId]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `being_delivered` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `curier_wareshouse` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `delivered` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `delivered_to_curier` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isPaid` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_acceptedAt` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trnsId` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_couponId_fkey";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "being_delivered" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "curier_wareshouse" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "delivered" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "delivered_to_curier" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "isPaid" BOOLEAN NOT NULL,
ADD COLUMN     "payment_acceptedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "trnsId" TEXT NOT NULL,
ALTER COLUMN "couponId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "orders_trnsId_key" ON "orders"("trnsId");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "coupon"("id") ON DELETE SET NULL ON UPDATE CASCADE;
