/*
  Warnings:

  - You are about to drop the column `idFinishBill` on the `creditNote` table. All the data in the column will be lost.
  - You are about to drop the column `idInicialBill` on the `creditNote` table. All the data in the column will be lost.
  - Added the required column `amount` to the `creditNote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idBill` to the `creditNote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "creditNote" DROP CONSTRAINT "creditNote_idFinishBill_fkey";

-- DropForeignKey
ALTER TABLE "creditNote" DROP CONSTRAINT "creditNote_idInicialBill_fkey";

-- AlterTable
CREATE SEQUENCE creditnote_idcreditnote_seq;
ALTER TABLE "creditNote" DROP COLUMN "idFinishBill",
DROP COLUMN "idInicialBill",
ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "idBill" INTEGER NOT NULL,
ALTER COLUMN "idcreditNote" SET DEFAULT nextval('creditnote_idcreditnote_seq');
ALTER SEQUENCE creditnote_idcreditnote_seq OWNED BY "creditNote"."idcreditNote";

-- AddForeignKey
ALTER TABLE "creditNote" ADD CONSTRAINT "creditNote_idBill_fkey" FOREIGN KEY ("idBill") REFERENCES "bill"("idbill") ON DELETE RESTRICT ON UPDATE CASCADE;
