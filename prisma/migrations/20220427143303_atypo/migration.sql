/*
  Warnings:

  - You are about to drop the column `iddress` on the `Inbox` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[address]` on the table `Inbox` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `Inbox` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Inbox_iddress_key` ON `Inbox`;

-- DropIndex
DROP INDEX `Inbox_user_id_fkey` ON `Inbox`;

-- AlterTable
ALTER TABLE `Inbox` DROP COLUMN `iddress`,
    ADD COLUMN `address` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Inbox_address_key` ON `Inbox`(`address`);

-- AddForeignKey
ALTER TABLE `Inbox` ADD CONSTRAINT `Inbox_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
