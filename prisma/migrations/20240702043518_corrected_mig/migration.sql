/*
  Warnings:

  - Made the column `discountPercentage` on table `product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `moneySaved` on table `product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "product" ALTER COLUMN "discountPercentage" SET NOT NULL,
ALTER COLUMN "moneySaved" SET NOT NULL;
