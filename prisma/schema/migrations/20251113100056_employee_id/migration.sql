/*
  Warnings:

  - The primary key for the `Employees` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Employees" DROP CONSTRAINT "Employees_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Employees_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Employees_id_seq";
