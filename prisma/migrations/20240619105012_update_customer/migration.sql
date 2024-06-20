/*
  Warnings:

  - Made the column `fullName` on table `customers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "customers" ALTER COLUMN "fullName" SET NOT NULL,
ALTER COLUMN "dob" DROP NOT NULL;
