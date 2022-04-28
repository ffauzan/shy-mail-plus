-- DropIndex
DROP INDEX `Inbox_user_id_fkey` ON `Inbox`;

-- AddForeignKey
ALTER TABLE `Inbox` ADD CONSTRAINT `Inbox_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
