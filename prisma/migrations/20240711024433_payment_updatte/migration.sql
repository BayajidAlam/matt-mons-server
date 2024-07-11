/*
  Warnings:

  - You are about to drop the column `paymentId` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_paymentId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_paymentId_fkey";

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "paymentId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "paymentId";

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
