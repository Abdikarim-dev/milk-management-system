/*
  Warnings:

  - Added the required column `milkTankId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `milkTankId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `MilkTank` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `desc` VARCHAR(191) NOT NULL,
    `quantity` DECIMAL(65, 30) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_milkTankId_fkey` FOREIGN KEY (`milkTankId`) REFERENCES `MilkTank`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
