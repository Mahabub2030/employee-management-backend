/*
  Warnings:

  - The values [TERMINATED] on the enum `EmployeeStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [HR_ADMIN] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EmployeeStatus_new" AS ENUM ('ACTIVE', 'INACTIVE', 'ON_LEAVE', 'TRANSFER');
ALTER TABLE "public"."Employees" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."User" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Employees" ALTER COLUMN "status" TYPE "EmployeeStatus_new" USING ("status"::text::"EmployeeStatus_new");
ALTER TABLE "User" ALTER COLUMN "status" TYPE "EmployeeStatus_new" USING ("status"::text::"EmployeeStatus_new");
ALTER TYPE "EmployeeStatus" RENAME TO "EmployeeStatus_old";
ALTER TYPE "EmployeeStatus_new" RENAME TO "EmployeeStatus";
DROP TYPE "public"."EmployeeStatus_old";
ALTER TABLE "Employees" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
ALTER TABLE "User" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'HRADMIN', 'ENGINEER', 'SUPERVISOR', 'GUEST');
ALTER TABLE "public"."User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "public"."UserRole_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'GUEST';
COMMIT;

-- DropEnum
DROP TYPE "MaritalStatus";

-- CreateTable
CREATE TABLE "EmployeeIds" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "issuedDate" TIMESTAMP(3) NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "ReamingDate" INTEGER NOT NULL,
    "iqamaDate" TEXT NOT NULL,
    "iqamaExpiryDate" TEXT NOT NULL,
    "RemaingIqamaDate" INTEGER NOT NULL,
    "authority" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmployeeIds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeeFiles" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmployeeFiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeIds_employeeId_key" ON "EmployeeIds"("employeeId");

-- AddForeignKey
ALTER TABLE "EmployeeIds" ADD CONSTRAINT "EmployeeIds_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeFiles" ADD CONSTRAINT "EmployeeFiles_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
