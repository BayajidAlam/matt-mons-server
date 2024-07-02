/*
  Warnings:

  - You are about to drop the column `isAvailable` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "product" DROP COLUMN "isAvailable",
ALTER COLUMN "discountPercentage" DROP NOT NULL,
ALTER COLUMN "moneySaved" DROP NOT NULL;
