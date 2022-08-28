/*
  Warnings:

  - You are about to drop the column `unity_1` on the `Specification` table. All the data in the column will be lost.
  - Added the required column `emp_unity` to the `Specification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Specification` DROP COLUMN `unity_1`,
    ADD COLUMN `emp_unity` VARCHAR(255) NOT NULL;
