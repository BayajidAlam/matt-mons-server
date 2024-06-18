-- AlterTable
ALTER TABLE "customers" ALTER COLUMN "fullName" DROP NOT NULL,
ALTER COLUMN "contactNumber" DROP NOT NULL,
ALTER COLUMN "emergencyContactNumber" DROP NOT NULL,
ALTER COLUMN "dob" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "sku" ADD COLUMN     "quantity" TEXT NOT NULL DEFAULT '0';
