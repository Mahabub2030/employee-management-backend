-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "HrAdmin" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "SuperAdmin" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;
