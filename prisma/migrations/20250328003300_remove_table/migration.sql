/*
  Warnings:

  - You are about to drop the column `bill` on the `credit` table. All the data in the column will be lost.
  - You are about to drop the `bills` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "credit" DROP CONSTRAINT "bill";

-- DropIndex
DROP INDEX "bill_idx";

-- AlterTable
ALTER TABLE "credit" DROP COLUMN "bill";

-- DropTable
DROP TABLE "bills";
