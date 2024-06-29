/*
  Warnings:

  - You are about to drop the column `productSkuId` on the `product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[skuId]` on the table `product` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_productSkuId_fkey";

-- AlterTable
ALTER TABLE "product" DROP COLUMN "productSkuId";

-- CreateIndex
CREATE UNIQUE INDEX "product_skuId_key" ON "product"("skuId");

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_skuId_fkey" FOREIGN KEY ("skuId") REFERENCES "sku"("id") ON DELETE SET NULL ON UPDATE CASCADE;
