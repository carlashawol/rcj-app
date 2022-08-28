-- CreateTable
CREATE TABLE `Client` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `nit` VARCHAR(255) NOT NULL,
    `rif` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `department` VARCHAR(255) NOT NULL,
    `country` VARCHAR(255) NOT NULL,
    `telephone` VARCHAR(255) NOT NULL,
    `cellphone` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `payment_method` VARCHAR(255) NOT NULL,
    `price_adjustment` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Specification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `brand` VARCHAR(255) NOT NULL,
    `model` VARCHAR(255) NOT NULL,
    `instrument_type` VARCHAR(255) NOT NULL,
    `accuracy_class` VARCHAR(255) NOT NULL,
    `start_range` VARCHAR(255) NOT NULL,
    `end_range` VARCHAR(255) NOT NULL,
    `unity_1` VARCHAR(255) NOT NULL,
    `resolution` VARCHAR(255) NOT NULL,
    `division_value` VARCHAR(255) NOT NULL,
    `emp` VARCHAR(255) NOT NULL,
    `unity` VARCHAR(255) NOT NULL,
    `temperature_coefficient` VARCHAR(255) NOT NULL,
    `rentability` VARCHAR(255) NOT NULL,
    `linearity` VARCHAR(255) NOT NULL,
    `hysteresis` VARCHAR(255) NOT NULL,
    `sensitivity` VARCHAR(255) NOT NULL,
    `calibration_method` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
