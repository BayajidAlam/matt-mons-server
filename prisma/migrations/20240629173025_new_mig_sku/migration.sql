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

-- AlterTable
ALTER TABLE "sku" ADD COLUMN     "availableColor" TEXT[],
ADD COLUMN     "availableSize" TEXT[];
