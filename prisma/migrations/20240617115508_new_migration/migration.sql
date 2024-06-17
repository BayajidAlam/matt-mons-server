/*
  Warnings:

  - You are about to drop the column `email` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `sellers` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `sellsManagers` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `superAdmins` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "admins_email_key";

-- DropIndex
DROP INDEX "customers_email_key";

-- DropIndex
DROP INDEX "sellers_email_key";

-- DropIndex
DROP INDEX "sellsManagers_email_key";

-- DropIndex
DROP INDEX "superAdmins_email_key";

-- AlterTable
ALTER TABLE "admins" DROP COLUMN "email";

-- AlterTable
ALTER TABLE "customers" DROP COLUMN "email";

-- AlterTable
ALTER TABLE "sellers" DROP COLUMN "email";

-- AlterTable
ALTER TABLE "sellsManagers" DROP COLUMN "email";

-- AlterTable
ALTER TABLE "superAdmins" DROP COLUMN "email";
