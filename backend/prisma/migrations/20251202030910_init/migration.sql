-- CreateTable
CREATE TABLE `Usuario` (
    `idUsuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `correo` VARCHAR(191) NOT NULL,
    `contrasena` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Usuario_username_key`(`username`),
    UNIQUE INDEX `Usuario_correo_key`(`correo`),
    PRIMARY KEY (`idUsuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Meme` (
    `idMeme` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(191) NULL,
    `superior` VARCHAR(191) NULL,
    `inferior` VARCHAR(191) NULL,
    `estado` VARCHAR(191) NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `imagen` VARCHAR(191) NULL,
    `idUsuario` INTEGER NOT NULL,
    `idPlantilla` INTEGER NULL,

    PRIMARY KEY (`idMeme`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Plantilla_meme` (
    `idPlantilla` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `imagen` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idPlantilla`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reaccion` (
    `idReaccion` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(191) NOT NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `idUsuario` INTEGER NOT NULL,
    `idMeme` INTEGER NOT NULL,

    PRIMARY KEY (`idReaccion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Meme` ADD CONSTRAINT `Meme_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`idUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Meme` ADD CONSTRAINT `Meme_idPlantilla_fkey` FOREIGN KEY (`idPlantilla`) REFERENCES `Plantilla_meme`(`idPlantilla`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reaccion` ADD CONSTRAINT `Reaccion_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`idUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reaccion` ADD CONSTRAINT `Reaccion_idMeme_fkey` FOREIGN KEY (`idMeme`) REFERENCES `Meme`(`idMeme`) ON DELETE RESTRICT ON UPDATE CASCADE;
