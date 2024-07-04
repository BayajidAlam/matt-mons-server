-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_cartId_fkey";

-- AlterTable
ALTER TABLE "carts" ALTER COLUMN "productId" SET NOT NULL,
ALTER COLUMN "productId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
