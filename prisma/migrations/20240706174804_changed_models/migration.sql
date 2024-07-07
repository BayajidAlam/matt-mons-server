/*
  Warnings:

  - You are about to drop the column `paymentModeId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `paymentModeId` on the `product` table. All the data in the column will be lost.
  - You are about to drop the `paymentMode` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `couponId` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_paymentModeId_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_paymentModeId_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "paymentModeId",
ADD COLUMN     "couponId" TEXT NOT NULL,
ADD COLUMN     "cuponId" TEXT;

-- AlterTable
ALTER TABLE "product" DROP COLUMN "paymentModeId";

-- DropTable
DROP TABLE "paymentMode";

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "coupon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
