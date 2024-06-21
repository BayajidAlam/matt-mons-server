-- CreateTable
CREATE TABLE "coupon" (
    "id" TEXT NOT NULL,
    "shopId" TEXT NOT NULL,
    "CouponName" TEXT NOT NULL,
    "discount" TEXT NOT NULL,
    "validTill" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coupon_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "coupon" ADD CONSTRAINT "coupon_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
