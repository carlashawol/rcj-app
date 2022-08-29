import { PrismaClient } from "@prisma/client";

export default async function (req, res) {
  const prisma = new PrismaClient();
  if (req.method === "GET") {
    const instruments = await prisma.instrument.findMany();
    console.log(instruments)
    prisma.$disconnect();
    return res.send(instruments);
  } else if (req.method === "POST") {
    const { body: data } = req;
    const newInstrument = await prisma.instrument.create({ data });
    console.log(newInstrument)
    prisma.$disconnect();
    return res.status(201).send(newInstrument);
  }
}
