-- DropForeignKey
ALTER TABLE `activeuser` DROP FOREIGN KEY `activeUser_userId_fkey`;

-- AddForeignKey
ALTER TABLE `ActiveUser` ADD CONSTRAINT `ActiveUser_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
