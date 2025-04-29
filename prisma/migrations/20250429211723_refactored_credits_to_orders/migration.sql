/*
  Warnings:

  - You are about to drop the column `creditId` on the `bill` table. All the data in the column will be lost.
  - You are about to drop the `credit` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[orderId]` on the table `bill` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderId` to the `bill` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "bill" DROP CONSTRAINT "bill_creditId_fkey";

-- DropForeignKey
ALTER TABLE "credit" DROP CONSTRAINT "applicantperson";

-- DropForeignKey
ALTER TABLE "credit" DROP CONSTRAINT "faculty";

-- DropForeignKey
ALTER TABLE "credit" DROP CONSTRAINT "managingperson";

-- DropForeignKey
ALTER TABLE "credit" DROP CONSTRAINT "user";

-- DropForeignKey
ALTER TABLE "email" DROP CONSTRAINT "person";

-- DropForeignKey
ALTER TABLE "faculty" DROP CONSTRAINT "inchargeperson";

-- DropForeignKey
ALTER TABLE "facultyEmail" DROP CONSTRAINT "faculty";

-- DropIndex
DROP INDEX "bill_creditId_key";

-- AlterTable
ALTER TABLE "bill" DROP COLUMN "creditId",
ADD COLUMN     "orderId" INTEGER NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL DEFAULT 'activo';

-- DropTable
DROP TABLE "credit";

-- CreateTable
CREATE TABLE "order" (
    "idOrder" SERIAL NOT NULL,
    "creationdate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user" INTEGER NOT NULL,
    "applicantperson" INTEGER NOT NULL,
    "managingperson" INTEGER NOT NULL,
    "debtamount" INTEGER NOT NULL,
    "state" INTEGER NOT NULL DEFAULT 1,
    "faculty" INTEGER NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("idOrder")
);

-- CreateIndex
CREATE INDEX "order_applicantperson_idx" ON "order"("applicantperson");

-- CreateIndex
CREATE INDEX "order_faculty_idx" ON "order"("faculty");

-- CreateIndex
CREATE INDEX "order_managingperson_idx" ON "order"("managingperson");

-- CreateIndex
CREATE INDEX "order_user_idx" ON "order"("user");

-- CreateIndex
CREATE UNIQUE INDEX "bill_orderId_key" ON "bill"("orderId");

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_applicantperson_fkey" FOREIGN KEY ("applicantperson") REFERENCES "person"("idperson") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_managingperson_fkey" FOREIGN KEY ("managingperson") REFERENCES "person"("idperson") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_faculty_fkey" FOREIGN KEY ("faculty") REFERENCES "faculty"("idfaculty") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_user_fkey" FOREIGN KEY ("user") REFERENCES "users"("idusers") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bill" ADD CONSTRAINT "bill_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("idOrder") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faculty" ADD CONSTRAINT "faculty_inchargeperson_fkey" FOREIGN KEY ("inchargeperson") REFERENCES "person"("idperson") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "email" ADD CONSTRAINT "email_personId_fkey" FOREIGN KEY ("personId") REFERENCES "person"("idperson") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "facultyEmail" ADD CONSTRAINT "facultyEmail_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "faculty"("idfaculty") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "inchargeperson_idx" RENAME TO "faculty_inchargeperson_idx";
