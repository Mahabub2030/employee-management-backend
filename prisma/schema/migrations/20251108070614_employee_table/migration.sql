/*
  Warnings:

  - Added the required column `educationQualification` to the `Employees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobTitle` to the `Employees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employees" ADD COLUMN     "educationQualification" TEXT NOT NULL,
ADD COLUMN     "jobTitle" TEXT NOT NULL,
ADD COLUMN     "profilePhoto" TEXT;
