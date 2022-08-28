/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Specification` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Instrument" (
    "id" SERIAL NOT NULL,
    "image" BYTEA,
    "client_name" VARCHAR(255) NOT NULL,
    "operative_status" VARCHAR(255) NOT NULL,
    "metrologic_status" VARCHAR(255) NOT NULL,
    "specification_name" VARCHAR(255) NOT NULL,
    "serial" VARCHAR(255) NOT NULL,
    "inventary" VARCHAR(255) NOT NULL,
    "calibration_frecuency" INTEGER NOT NULL,
    "internal_code" VARCHAR(255) NOT NULL,
    "sensor_type" VARCHAR(255) NOT NULL,
    "maintenance_frecuency" INTEGER NOT NULL,
    "sensor_serial" VARCHAR(255) NOT NULL,
    "sensor_ubication" VARCHAR(255) NOT NULL,

    CONSTRAINT "Instrument_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Specification_name_key" ON "Specification"("name");

-- AddForeignKey
ALTER TABLE "Instrument" ADD CONSTRAINT "Instrument_specification_name_fkey" FOREIGN KEY ("specification_name") REFERENCES "Specification"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
