/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Client` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Client_name_key" ON "Client"("name");

-- AddForeignKey
ALTER TABLE "Instrument" ADD CONSTRAINT "Instrument_client_name_fkey" FOREIGN KEY ("client_name") REFERENCES "Client"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
