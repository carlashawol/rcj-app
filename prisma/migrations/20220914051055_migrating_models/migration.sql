-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "email" VARCHAR(80) NOT NULL,
    "password" VARCHAR(50) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "job" VARCHAR(50) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "nit" VARCHAR(255) NOT NULL,
    "rif" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "city" VARCHAR(50) NOT NULL,
    "department" VARCHAR(50) NOT NULL,
    "country" VARCHAR(50) NOT NULL,
    "contact" VARCHAR(50) NOT NULL,
    "telephone" VARCHAR(20) NOT NULL,
    "cellphone" VARCHAR(20) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "payment_method" VARCHAR(255) NOT NULL,

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
    "start_range" INTEGER NOT NULL,
    "end_range" INTEGER NOT NULL,
    "unity" VARCHAR(255) NOT NULL,
    "resolution" INTEGER NOT NULL,
    "division_value" INTEGER NOT NULL,
    "emp" INTEGER NOT NULL,
    "emp_unity" VARCHAR(255) NOT NULL,
    "calibration_method" VARCHAR(255) NOT NULL,

    CONSTRAINT "Specification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Instrument" (
    "id" SERIAL NOT NULL,
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

-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "service_type" VARCHAR(255) NOT NULL,
    "item" VARCHAR(255) NOT NULL,
    "method" VARCHAR(255) NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfferActivity" (
    "id" SERIAL NOT NULL,
    "service_type" VARCHAR(255) NOT NULL,
    "brand" VARCHAR(255) NOT NULL,
    "model" VARCHAR(255) NOT NULL,
    "serial" VARCHAR(255) NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "place" VARCHAR(255) NOT NULL,
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "start_range" INTEGER NOT NULL,
    "end_range" INTEGER NOT NULL,
    "unity" VARCHAR(255) NOT NULL,
    "conformity" VARCHAR(255) NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "client_requirements" VARCHAR(255) NOT NULL,
    "offer_id" INTEGER NOT NULL,

    CONSTRAINT "OfferActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Offer" (
    "id" SERIAL NOT NULL,
    "client_name" VARCHAR(255) NOT NULL,
    "coin" VARCHAR(255) NOT NULL,
    "offer_created_by" VARCHAR(255) NOT NULL,
    "reception_date" VARCHAR(255) NOT NULL,
    "offer_date" VARCHAR(255) NOT NULL,
    "warranty" VARCHAR(255) NOT NULL,
    "offer_validity" INTEGER NOT NULL,
    "availability" VARCHAR(255) NOT NULL,
    "time_certificate" INTEGER NOT NULL,
    "viatics" INTEGER NOT NULL,
    "offer_reception_date" VARCHAR(255) NOT NULL,
    "planned_reception_date" VARCHAR(255) NOT NULL,

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemReception" (
    "id" SERIAL NOT NULL,
    "instrument_id" INTEGER NOT NULL,
    "order_number" VARCHAR(255) NOT NULL,
    "item_reception_date" VARCHAR(255) NOT NULL,
    "secure_image_url" VARCHAR(255),
    "responsible_entering_item" VARCHAR(255) NOT NULL,
    "responsible_receiving_item" VARCHAR(255) NOT NULL,
    "request_created_by" VARCHAR(255) NOT NULL,
    "unique_id" VARCHAR(255) NOT NULL,
    "good_physical_state" VARCHAR(255) NOT NULL,
    "good_operative_state" VARCHAR(255) NOT NULL,
    "operation_manual" VARCHAR(255) NOT NULL,
    "observations" VARCHAR(255),
    "specification_name" VARCHAR(255) NOT NULL,
    "client_name" TEXT NOT NULL,
    "offer_id" INTEGER NOT NULL,

    CONSTRAINT "ItemReception_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CalibrationCertificate" (
    "id" SERIAL NOT NULL,
    "reception_date" TEXT NOT NULL,
    "calibration_date" TEXT NOT NULL,
    "generation_date" TEXT NOT NULL,
    "lec_inst1" DOUBLE PRECISION NOT NULL,
    "lec_inst2" DOUBLE PRECISION NOT NULL,
    "lec_inst3" DOUBLE PRECISION NOT NULL,
    "val_pattern1" DOUBLE PRECISION NOT NULL,
    "val_pattern2" DOUBLE PRECISION NOT NULL,
    "val_pattern3" DOUBLE PRECISION NOT NULL,
    "error1" DOUBLE PRECISION NOT NULL,
    "error2" DOUBLE PRECISION NOT NULL,
    "error3" DOUBLE PRECISION NOT NULL,
    "uexp1" DOUBLE PRECISION NOT NULL,
    "uexp2" DOUBLE PRECISION NOT NULL,
    "uexp3" DOUBLE PRECISION NOT NULL,
    "ierri_uexp1" DOUBLE PRECISION NOT NULL,
    "ierri_uexp2" DOUBLE PRECISION NOT NULL,
    "ierri_uexp3" DOUBLE PRECISION NOT NULL,
    "emp1" DOUBLE PRECISION NOT NULL,
    "emp2" DOUBLE PRECISION NOT NULL,
    "emp3" DOUBLE PRECISION NOT NULL,
    "conformity1" VARCHAR(255) NOT NULL,
    "conformity2" VARCHAR(255) NOT NULL,
    "conformity3" VARCHAR(255) NOT NULL,
    "environmental_temperature" DOUBLE PRECISION NOT NULL,
    "temperature_uncertainty" DOUBLE PRECISION NOT NULL,
    "humidity" DOUBLE PRECISION NOT NULL,
    "humidity_uncertainty" DOUBLE PRECISION NOT NULL,
    "calibration_pattern_code" VARCHAR(255) NOT NULL,
    "number_certificate_pattern" INTEGER NOT NULL,
    "pattern_traceability" VARCHAR(255) NOT NULL,
    "comments" VARCHAR(255),
    "calibration_place" VARCHAR(255) NOT NULL,
    "calibration_created_by" VARCHAR(255) NOT NULL,
    "calibration_approved_by" VARCHAR(255) NOT NULL,
    "item_id" INTEGER NOT NULL,
    "client_name" VARCHAR(255) NOT NULL,
    "specification_name" VARCHAR(255) NOT NULL,

    CONSTRAINT "CalibrationCertificate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Client_name_key" ON "Client"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Specification_name_key" ON "Specification"("name");

-- AddForeignKey
ALTER TABLE "Instrument" ADD CONSTRAINT "Instrument_client_name_fkey" FOREIGN KEY ("client_name") REFERENCES "Client"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instrument" ADD CONSTRAINT "Instrument_specification_name_fkey" FOREIGN KEY ("specification_name") REFERENCES "Specification"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferActivity" ADD CONSTRAINT "OfferActivity_offer_id_fkey" FOREIGN KEY ("offer_id") REFERENCES "Offer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_client_name_fkey" FOREIGN KEY ("client_name") REFERENCES "Client"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemReception" ADD CONSTRAINT "ItemReception_client_name_fkey" FOREIGN KEY ("client_name") REFERENCES "Client"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemReception" ADD CONSTRAINT "ItemReception_specification_name_fkey" FOREIGN KEY ("specification_name") REFERENCES "Specification"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemReception" ADD CONSTRAINT "ItemReception_instrument_id_fkey" FOREIGN KEY ("instrument_id") REFERENCES "Instrument"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemReception" ADD CONSTRAINT "ItemReception_offer_id_fkey" FOREIGN KEY ("offer_id") REFERENCES "Offer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalibrationCertificate" ADD CONSTRAINT "CalibrationCertificate_client_name_fkey" FOREIGN KEY ("client_name") REFERENCES "Client"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalibrationCertificate" ADD CONSTRAINT "CalibrationCertificate_specification_name_fkey" FOREIGN KEY ("specification_name") REFERENCES "Specification"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalibrationCertificate" ADD CONSTRAINT "CalibrationCertificate_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "ItemReception"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
