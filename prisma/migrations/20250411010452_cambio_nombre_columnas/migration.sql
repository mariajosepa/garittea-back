/*
  Warnings:

  - You are about to drop the column `fechaFactura` on the `bill` table. All the data in the column will be lost.
  - You are about to drop the column `fechaCreacion` on the `credit` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "bill" DROP COLUMN "fechaFactura",
ADD COLUMN     "billdate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "credit" DROP COLUMN "fechaCreacion",
ADD COLUMN     "creationdate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
