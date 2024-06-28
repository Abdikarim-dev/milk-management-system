-- AlterTable
ALTER TABLE `user` MODIFY `status` ENUM('active', 'inActive', 'suspended') NOT NULL DEFAULT 'active';
