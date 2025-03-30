/*
  Warnings:

  - Added the required column `lastname` to the `person` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "person" ADD COLUMN     "lastname" VARCHAR(45) NOT NULL;
