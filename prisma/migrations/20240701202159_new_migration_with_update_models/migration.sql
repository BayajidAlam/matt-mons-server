/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `colors` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shopName]` on the table `shop` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productSkuId` to the `product` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `productAdditionalInfo` on the `product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "product" ADD COLUMN     "productSkuId" TEXT NOT NULL,
DROP COLUMN "productAdditionalInfo",
ADD COLUMN     "productAdditionalInfo" JSONB NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "category_title_key" ON "category"("title");

-- CreateIndex
CREATE UNIQUE INDEX "colors_title_key" ON "colors"("title");

-- CreateIndex
CREATE UNIQUE INDEX "shop_shopName_key" ON "shop"("shopName");

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_productSkuId_fkey" FOREIGN KEY ("productSkuId") REFERENCES "sku"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
