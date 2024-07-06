/*
  Warnings:

  - Added the required column `dueAmount` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paidAmount` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentModeId` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentModeId` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "dueAmount" INTEGER NOT NULL,
ADD COLUMN     "paidAmount" INTEGER NOT NULL,
ADD COLUMN     "paymentModeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "paymentModeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "wishlists" ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "paymentMode" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "paymentMode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "paymentMode_title_key" ON "paymentMode"("title");

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_paymentModeId_fkey" FOREIGN KEY ("paymentModeId") REFERENCES "paymentMode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_paymentModeId_fkey" FOREIGN KEY ("paymentModeId") REFERENCES "paymentMode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
