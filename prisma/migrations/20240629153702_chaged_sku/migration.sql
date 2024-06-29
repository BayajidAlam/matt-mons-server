/*
  Warnings:

  - You are about to drop the column `skuId` on the `product` table. All the data in the column will be lost.
  - You are about to drop the `productSkuColors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `productSkuSizes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_skuId_fkey";

-- DropForeignKey
ALTER TABLE "productSkuColors" DROP CONSTRAINT "productSkuColors_colorId_fkey";

-- DropForeignKey
ALTER TABLE "productSkuColors" DROP CONSTRAINT "productSkuColors_skuId_fkey";

-- DropForeignKey
ALTER TABLE "productSkuSizes" DROP CONSTRAINT "productSkuSizes_sizeId_fkey";

-- DropForeignKey
ALTER TABLE "productSkuSizes" DROP CONSTRAINT "productSkuSizes_skuId_fkey";

-- DropIndex
DROP INDEX "product_skuId_key";

-- AlterTable
ALTER TABLE "colors" ADD COLUMN     "productSkuId" TEXT;

-- AlterTable
ALTER TABLE "product" DROP COLUMN "skuId";

-- AlterTable
ALTER TABLE "sizes" ADD COLUMN     "productSkuId" TEXT;

-- DropTable
DROP TABLE "productSkuColors";

-- DropTable
DROP TABLE "productSkuSizes";

-- AddForeignKey
ALTER TABLE "colors" ADD CONSTRAINT "colors_productSkuId_fkey" FOREIGN KEY ("productSkuId") REFERENCES "sku"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sizes" ADD CONSTRAINT "sizes_productSkuId_fkey" FOREIGN KEY ("productSkuId") REFERENCES "sku"("id") ON DELETE SET NULL ON UPDATE CASCADE;
