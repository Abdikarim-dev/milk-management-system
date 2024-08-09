/*
  Warnings:

  - Added the required column `role` to the `ActiveUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `activeuser` ADD COLUMN `role` ENUM('admin', 'User') NOT NULL;
