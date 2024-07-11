/*
  Warnings:

  - Added the required column `fullName` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "fullName" TEXT NOT NULL;
