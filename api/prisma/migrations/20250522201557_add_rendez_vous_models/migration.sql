-- AlterTable
ALTER TABLE `user` ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'client';

-- CreateTable
CREATE TABLE `Service` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `duree` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RendezVous` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `heure` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'en_attente',
    `notes` TEXT NULL,
    `userId` INTEGER NOT NULL,
    `serviceId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlageHoraire` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `jour` VARCHAR(191) NOT NULL,
    `heureDebut` VARCHAR(191) NOT NULL,
    `heureFin` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RendezVous` ADD CONSTRAINT `RendezVous_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RendezVous` ADD CONSTRAINT `RendezVous_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
