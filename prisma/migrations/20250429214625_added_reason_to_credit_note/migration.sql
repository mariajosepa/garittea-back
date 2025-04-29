/*
  Warnings:

  - Added the required column `reason` to the `creditNote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "creditNote" ADD COLUMN     "reason" TEXT NOT NULL;
