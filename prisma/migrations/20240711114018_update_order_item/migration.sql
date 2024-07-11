/*
  Warnings:

  - You are about to drop the column `discountPercentage` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `discountPrice` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `minPrice` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `moneySaved` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `productMainImage` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `productName` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `shopName` on the `order_items` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "order_items" DROP COLUMN "discountPercentage",
DROP COLUMN "discountPrice",
DROP COLUMN "minPrice",
DROP COLUMN "moneySaved",
DROP COLUMN "productMainImage",
DROP COLUMN "productName",
DROP COLUMN "shopName";

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "orderId" TEXT,
ADD COLUMN     "orderOrderId" TEXT;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
