/*
  Warnings:

  - You are about to drop the column `age` on the `pets` table. All the data in the column will be lost.
  - Added the required column `age_in_months` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "age",
ADD COLUMN     "age_in_months" DOUBLE PRECISION NOT NULL;
