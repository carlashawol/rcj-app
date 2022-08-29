-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "nit" VARCHAR(255) NOT NULL,
    "rif" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "department" VARCHAR(255) NOT NULL,
    "country" VARCHAR(255) NOT NULL,
    "contact" VARCHAR(255) NOT NULL,
    "telephone" VARCHAR(255) NOT NULL,
    "cellphone" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "payment_method" VARCHAR(255) NOT NULL,
    "price_adjustment" INTEGER NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Specification" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "brand" VARCHAR(255) NOT NULL,
    "model" VARCHAR(255) NOT NULL,
    "instrument_type" VARCHAR(255) NOT NULL,
    "accuracy_class" VARCHAR(255) NOT NULL,
    "start_range" VARCHAR(255) NOT NULL,
    "end_range" VARCHAR(255) NOT NULL,
    "unity" VARCHAR(255) NOT NULL,
    "resolution" VARCHAR(255) NOT NULL,
    "division_value" VARCHAR(255) NOT NULL,
    "emp" VARCHAR(255) NOT NULL,
    "emp_unity" VARCHAR(255) NOT NULL,
    "temperature_coefficient" VARCHAR(255) NOT NULL,
    "rentability" VARCHAR(255) NOT NULL,
    "linearity" VARCHAR(255) NOT NULL,
    "hysteresis" VARCHAR(255) NOT NULL,
    "sensitivity" VARCHAR(255) NOT NULL,
    "calibration_method" VARCHAR(255) NOT NULL,

    CONSTRAINT "Specification_pkey" PRIMARY KEY ("id")
);

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
CREATE UNIQUE INDEX "Client_name_key" ON "Client"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Specification_name_key" ON "Specification"("name");

-- AddForeignKey
ALTER TABLE "Instrument" ADD CONSTRAINT "Instrument_client_name_fkey" FOREIGN KEY ("client_name") REFERENCES "Client"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instrument" ADD CONSTRAINT "Instrument_specification_name_fkey" FOREIGN KEY ("specification_name") REFERENCES "Specification"("name") ON DELETE RESTRICT ON UPDATE CASCADE;