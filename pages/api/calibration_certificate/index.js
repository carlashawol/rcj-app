import { PrismaClient } from "@prisma/client";

export default async function (req, res) {
  const prisma = new PrismaClient();
  if (req.method === "GET") {
    const calibrationCertificates = await prisma.calibrationCertificate.findMany();
    prisma.$disconnect();
    return res.send(calibrationCertificates);
  } else if (req.method === "POST") {
    const { body: data } = req;
    const newCalibrationCertificate = await prisma.calibrationCertificate.create({ data });
    prisma.$disconnect();
    return res.status(201).send(newCalibrationCertificate);
  }
}
