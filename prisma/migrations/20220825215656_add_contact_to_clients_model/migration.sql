/*
  Warnings:

  - Added the required column `contact` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Client` ADD COLUMN `contact` VARCHAR(255) NOT NULL;
