/*
  Warnings:

  - Made the column `shopId` on table `sellsManagers` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `shopId` to the `sku` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "sellsManagers" DROP CONSTRAINT "sellsManagers_shopId_fkey";

-- AlterTable
ALTER TABLE "sellsManagers" ALTER COLUMN "shopId" SET NOT NULL;

-- AlterTable
ALTER TABLE "sku" ADD COLUMN     "shopId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "sellsManagers" ADD CONSTRAINT "sellsManagers_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sku" ADD CONSTRAINT "sku_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
