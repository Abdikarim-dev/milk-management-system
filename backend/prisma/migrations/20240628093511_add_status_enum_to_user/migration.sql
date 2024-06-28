-- AlterTable
ALTER TABLE `user` ADD COLUMN `status` ENUM('active', 'inActive') NOT NULL DEFAULT 'active';
