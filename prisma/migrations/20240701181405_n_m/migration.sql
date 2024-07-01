/*
  Warnings:

  - A unique constraint covering the columns `[couponName]` on the table `coupon` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `sku` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "coupon_couponName_key" ON "coupon"("couponName");

-- CreateIndex
CREATE UNIQUE INDEX "sku_title_key" ON "sku"("title");
