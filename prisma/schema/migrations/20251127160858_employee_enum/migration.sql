/*
  Warnings:

  - The `status` column on the `Employees` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Nationality" AS ENUM ('SAUDI', 'NON_SAUDI');

-- AlterTable
ALTER TABLE "Employees" DROP COLUMN "status",
ADD COLUMN     "status" "EmployeeStatus" NOT NULL DEFAULT 'ACTIVE';
