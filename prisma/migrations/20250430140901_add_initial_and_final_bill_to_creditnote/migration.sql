/*
  Warnings:

  - You are about to drop the column `idBill` on the `creditNote` table. All the data in the column will be lost.
  - Added the required column `finalBillId` to the `creditNote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `initialBillId` to the `creditNote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "creditNote" DROP CONSTRAINT "creditNote_idBill_fkey";

-- AlterTable
ALTER TABLE "creditNote" DROP COLUMN "idBill",
ADD COLUMN     "finalBillId" INTEGER NOT NULL,
ADD COLUMN     "initialBillId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "creditNote" ADD CONSTRAINT "creditNote_initialBillId_fkey" FOREIGN KEY ("initialBillId") REFERENCES "bill"("idbill") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creditNote" ADD CONSTRAINT "creditNote_finalBillId_fkey" FOREIGN KEY ("finalBillId") REFERENCES "bill"("idbill") ON DELETE RESTRICT ON UPDATE CASCADE;
