/*
  Warnings:

  - Added the required column `name` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `HrAdmin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `SuperAdmin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "HrAdmin" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SuperAdmin" ADD COLUMN     "name" TEXT NOT NULL;
