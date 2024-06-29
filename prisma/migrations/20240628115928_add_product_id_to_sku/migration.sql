/*
  Warnings:

  - You are about to drop the column `productSkuId` on the `product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_productSkuId_fkey";

-- AlterTable
ALTER TABLE "product" DROP COLUMN "productSkuId";

-- AlterTable
ALTER TABLE "sku" ADD COLUMN     "productId" TEXT;

-- AddForeignKey
ALTER TABLE "sku" ADD CONSTRAINT "sku_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
