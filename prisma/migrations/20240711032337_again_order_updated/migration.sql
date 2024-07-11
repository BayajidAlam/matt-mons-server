/*
  Warnings:

  - Added the required column `uId` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_userId_fkey";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "uId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_uId_fkey" FOREIGN KEY ("uId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
