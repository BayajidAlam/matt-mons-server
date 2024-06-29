/*
  Warnings:

  - You are about to drop the column `productId` on the `sku` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "sku" DROP CONSTRAINT "sku_productId_fkey";

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "productSkuId" TEXT,
ADD COLUMN     "skuId" TEXT;

-- AlterTable
ALTER TABLE "sku" DROP COLUMN "productId";

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_productSkuId_fkey" FOREIGN KEY ("productSkuId") REFERENCES "sku"("id") ON DELETE SET NULL ON UPDATE CASCADE;
