/*
  Warnings:

  - Added the required column `Warning` to the `level` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `activeuser` MODIFY `id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `level` ADD COLUMN `Warning` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
