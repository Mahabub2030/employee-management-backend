/*
  Warnings:

  - The primary key for the `Admin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `HrAdmin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SuperAdmin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[idNumber]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idNumber]` on the table `HrAdmin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idNumber]` on the table `SuperAdmin` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idNumber` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idNumber` to the `HrAdmin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idNumber` to the `SuperAdmin` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_userId_fkey";

-- DropForeignKey
ALTER TABLE "AuthProvider" DROP CONSTRAINT "AuthProvider_userId_fkey";

-- DropForeignKey
ALTER TABLE "HrAdmin" DROP CONSTRAINT "HrAdmin_userId_fkey";

-- DropForeignKey
ALTER TABLE "SuperAdmin" DROP CONSTRAINT "SuperAdmin_userId_fkey";

-- AlterTable
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_pkey",
ADD COLUMN     "idNumber" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Admin_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Admin_id_seq";

-- AlterTable
ALTER TABLE "AuthProvider" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "HrAdmin" DROP CONSTRAINT "HrAdmin_pkey",
ADD COLUMN     "idNumber" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "HrAdmin_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "HrAdmin_id_seq";

-- AlterTable
ALTER TABLE "SuperAdmin" DROP CONSTRAINT "SuperAdmin_pkey",
ADD COLUMN     "idNumber" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "SuperAdmin_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SuperAdmin_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Admin_idNumber_key" ON "Admin"("idNumber");

-- CreateIndex
CREATE UNIQUE INDEX "HrAdmin_idNumber_key" ON "HrAdmin"("idNumber");

-- CreateIndex
CREATE UNIQUE INDEX "SuperAdmin_idNumber_key" ON "SuperAdmin"("idNumber");

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuperAdmin" ADD CONSTRAINT "SuperAdmin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HrAdmin" ADD CONSTRAINT "HrAdmin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthProvider" ADD CONSTRAINT "AuthProvider_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
