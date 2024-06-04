/*
  Warnings:

  - The values [driver,helper] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `accidentHistories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `accountHeads` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `accountTypes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `brands` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `drivers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `equipmentIns` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `equipmentUses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `equipments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `expenseHeads` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `expenses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `fuelStations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `fuelTypes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `fuels` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `helpers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `maintenanceHeads` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `maintenances` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `models` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `paperWorks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `parties` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `trips` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `uoms` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vehicles` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `sellsManagerId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('super_admin', 'admin', 'seller', 'sells_manager');
ALTER TABLE "users" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "UserRole_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "accidentHistories" DROP CONSTRAINT "accidentHistories_accountHeadId_fkey";

-- DropForeignKey
ALTER TABLE "accidentHistories" DROP CONSTRAINT "accidentHistories_driverId_fkey";

-- DropForeignKey
ALTER TABLE "accidentHistories" DROP CONSTRAINT "accidentHistories_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "accountHeads" DROP CONSTRAINT "accountHeads_accountTypeId_fkey";

-- DropForeignKey
ALTER TABLE "drivers" DROP CONSTRAINT "drivers_userId_fkey";

-- DropForeignKey
ALTER TABLE "equipmentIns" DROP CONSTRAINT "equipmentIns_equipmentId_fkey";

-- DropForeignKey
ALTER TABLE "equipmentUses" DROP CONSTRAINT "equipmentUses_accountHeadId_fkey";

-- DropForeignKey
ALTER TABLE "equipmentUses" DROP CONSTRAINT "equipmentUses_equipmentId_fkey";

-- DropForeignKey
ALTER TABLE "equipmentUses" DROP CONSTRAINT "equipmentUses_maintenanceId_fkey";

-- DropForeignKey
ALTER TABLE "equipmentUses" DROP CONSTRAINT "equipmentUses_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "equipments" DROP CONSTRAINT "equipments_uomId_fkey";

-- DropForeignKey
ALTER TABLE "expenses" DROP CONSTRAINT "expenses_accountHeadId_fkey";

-- DropForeignKey
ALTER TABLE "expenses" DROP CONSTRAINT "expenses_expenseHeadId_fkey";

-- DropForeignKey
ALTER TABLE "expenses" DROP CONSTRAINT "expenses_tripId_fkey";

-- DropForeignKey
ALTER TABLE "expenses" DROP CONSTRAINT "expenses_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "fuels" DROP CONSTRAINT "fuels_driverId_fkey";

-- DropForeignKey
ALTER TABLE "fuels" DROP CONSTRAINT "fuels_fuelStationId_fkey";

-- DropForeignKey
ALTER TABLE "fuels" DROP CONSTRAINT "fuels_fuelTypeId_fkey";

-- DropForeignKey
ALTER TABLE "fuels" DROP CONSTRAINT "fuels_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "helpers" DROP CONSTRAINT "helpers_userId_fkey";

-- DropForeignKey
ALTER TABLE "maintenances" DROP CONSTRAINT "maintenances_accountHeadId_fkey";

-- DropForeignKey
ALTER TABLE "maintenances" DROP CONSTRAINT "maintenances_driverId_fkey";

-- DropForeignKey
ALTER TABLE "maintenances" DROP CONSTRAINT "maintenances_maintenanceHeadId_fkey";

-- DropForeignKey
ALTER TABLE "maintenances" DROP CONSTRAINT "maintenances_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "models" DROP CONSTRAINT "models_brandId_fkey";

-- DropForeignKey
ALTER TABLE "paperWorks" DROP CONSTRAINT "paperWorks_accountHeadId_fkey";

-- DropForeignKey
ALTER TABLE "paperWorks" DROP CONSTRAINT "paperWorks_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "trips" DROP CONSTRAINT "trips_accountHeadId_fkey";

-- DropForeignKey
ALTER TABLE "trips" DROP CONSTRAINT "trips_driverId_fkey";

-- DropForeignKey
ALTER TABLE "trips" DROP CONSTRAINT "trips_helperId_fkey";

-- DropForeignKey
ALTER TABLE "trips" DROP CONSTRAINT "trips_partyId_fkey";

-- DropForeignKey
ALTER TABLE "trips" DROP CONSTRAINT "trips_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "vehicles" DROP CONSTRAINT "vehicles_accountHeadId_fkey";

-- DropForeignKey
ALTER TABLE "vehicles" DROP CONSTRAINT "vehicles_brandId_fkey";

-- DropForeignKey
ALTER TABLE "vehicles" DROP CONSTRAINT "vehicles_driverId_fkey";

-- DropForeignKey
ALTER TABLE "vehicles" DROP CONSTRAINT "vehicles_helperId_fkey";

-- DropForeignKey
ALTER TABLE "vehicles" DROP CONSTRAINT "vehicles_modelId_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "sellerId" TEXT,
ADD COLUMN     "sellsManagerId" TEXT NOT NULL;

-- DropTable
DROP TABLE "accidentHistories";

-- DropTable
DROP TABLE "accountHeads";

-- DropTable
DROP TABLE "accountTypes";

-- DropTable
DROP TABLE "brands";

-- DropTable
DROP TABLE "drivers";

-- DropTable
DROP TABLE "equipmentIns";

-- DropTable
DROP TABLE "equipmentUses";

-- DropTable
DROP TABLE "equipments";

-- DropTable
DROP TABLE "expenseHeads";

-- DropTable
DROP TABLE "expenses";

-- DropTable
DROP TABLE "fuelStations";

-- DropTable
DROP TABLE "fuelTypes";

-- DropTable
DROP TABLE "fuels";

-- DropTable
DROP TABLE "helpers";

-- DropTable
DROP TABLE "maintenanceHeads";

-- DropTable
DROP TABLE "maintenances";

-- DropTable
DROP TABLE "models";

-- DropTable
DROP TABLE "paperWorks";

-- DropTable
DROP TABLE "parties";

-- DropTable
DROP TABLE "trips";

-- DropTable
DROP TABLE "uoms";

-- DropTable
DROP TABLE "vehicles";

-- CreateTable
CREATE TABLE "Seller" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Seller_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SellsManager" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SellsManager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Seller_userId_key" ON "Seller"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SellsManager_userId_key" ON "SellsManager"("userId");

-- AddForeignKey
ALTER TABLE "Seller" ADD CONSTRAINT "Seller_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SellsManager" ADD CONSTRAINT "SellsManager_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
