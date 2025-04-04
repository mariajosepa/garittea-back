/*
  Warnings:

  - Made the column `managingperson` on table `credit` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "credit" ALTER COLUMN "managingperson" SET NOT NULL;
