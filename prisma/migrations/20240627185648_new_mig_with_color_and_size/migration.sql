/*
  Warnings:

  - You are about to drop the column `productSkuId` on the `colors` table. All the data in the column will be lost.
  - You are about to drop the column `productSkuId` on the `sizes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "colors" DROP CONSTRAINT "colors_productSkuId_fkey";

-- DropForeignKey
ALTER TABLE "sizes" DROP CONSTRAINT "sizes_productSkuId_fkey";

-- AlterTable
ALTER TABLE "colors" DROP COLUMN "productSkuId";

-- AlterTable
ALTER TABLE "sizes" DROP COLUMN "productSkuId";

-- CreateTable
CREATE TABLE "productSkuColors" (
    "skuId" TEXT NOT NULL,
    "colorId" TEXT NOT NULL,

    CONSTRAINT "productSkuColors_pkey" PRIMARY KEY ("skuId","colorId")
);

-- CreateTable
CREATE TABLE "productSkuSizes" (
    "skuId" TEXT NOT NULL,
    "sizeId" TEXT NOT NULL,

    CONSTRAINT "productSkuSizes_pkey" PRIMARY KEY ("skuId","sizeId")
);

-- AddForeignKey
ALTER TABLE "productSkuColors" ADD CONSTRAINT "productSkuColors_skuId_fkey" FOREIGN KEY ("skuId") REFERENCES "sku"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productSkuColors" ADD CONSTRAINT "productSkuColors_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "colors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productSkuSizes" ADD CONSTRAINT "productSkuSizes_skuId_fkey" FOREIGN KEY ("skuId") REFERENCES "sku"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productSkuSizes" ADD CONSTRAINT "productSkuSizes_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "sizes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
