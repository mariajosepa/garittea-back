/*
  Warnings:

  - A unique constraint covering the columns `[orderId]` on the table `bill` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "order" ADD COLUMN     "observaciones" VARCHAR(800);

-- CreateIndex
CREATE UNIQUE INDEX "bill_orderId_key" ON "bill"("orderId");
