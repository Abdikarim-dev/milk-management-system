/*
  Warnings:

  - You are about to drop the column `tankLimit` on the `milktank` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `milktank` DROP COLUMN `tankLimit`,
    ADD COLUMN `limit` DECIMAL(65, 30) NULL;
