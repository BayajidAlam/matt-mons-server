/*
  Warnings:

  - You are about to drop the column `CouponName` on the `coupon` table. All the data in the column will be lost.
  - Added the required column `couponName` to the `coupon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingCharge` to the `coupon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "cartId" TEXT,
ADD COLUMN     "orderId" TEXT,
ADD COLUMN     "orderOrderId" TEXT;

-- AlterTable
ALTER TABLE "coupon" DROP COLUMN "CouponName",
ADD COLUMN     "couponName" TEXT NOT NULL,
ADD COLUMN     "shippingCharge" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "contactNumber" TEXT,
    "emergencyContactNumber" TEXT,
    "address" TEXT,
    "subTotal" TEXT NOT NULL,
    "shippingCharge" TEXT NOT NULL,
    "tax" TEXT NOT NULL,
    "total" TEXT NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "carts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wishlists" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wishlists_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
