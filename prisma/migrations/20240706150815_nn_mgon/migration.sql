/*
  Warnings:

  - The values [received,on_warhouse,on_curier,shipped,handovered,canceled] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `quantity` to the `carts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('placed', 'payment_accepted', 'delivered_to_curier', 'curier_wareshouse', 'being_delivered', 'delivered');
ALTER TABLE "orders" ALTER COLUMN "orderStatus" DROP DEFAULT;
ALTER TABLE "orders" ALTER COLUMN "orderStatus" TYPE "OrderStatus_new" USING ("orderStatus"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "OrderStatus_old";
ALTER TABLE "orders" ALTER COLUMN "orderStatus" SET DEFAULT 'placed';
COMMIT;

-- AlterTable
ALTER TABLE "carts" ADD COLUMN     "quantity" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "orderStatus" SET DEFAULT 'placed';
