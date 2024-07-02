/*
  Warnings:

  - Added the required column `shopId` to the `colors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shopId` to the `sizes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "colors" ADD COLUMN     "shopId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "sizes" ADD COLUMN     "shopId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "colors" ADD CONSTRAINT "colors_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sizes" ADD CONSTRAINT "sizes_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
