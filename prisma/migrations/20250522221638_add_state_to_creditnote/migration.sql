/*
  Warnings:

  - The primary key for the `creditNote` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[idcreditNote]` on the table `creditNote` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "creditNote" DROP CONSTRAINT "creditNote_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL DEFAULT 'activa',
ALTER COLUMN "idcreditNote" DROP DEFAULT,
ADD CONSTRAINT "creditNote_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "creditNote_idcreditNote_seq";

-- CreateIndex
CREATE UNIQUE INDEX "creditNote_idcreditNote_key" ON "creditNote"("idcreditNote");
