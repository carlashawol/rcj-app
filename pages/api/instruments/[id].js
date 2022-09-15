import { PrismaClient } from "@prisma/client";

export default async function (req, res) {
  const prisma = new PrismaClient();
  const { id } = req.query;
  if (req.method === "GET") {
    const instrument = await prisma.instrument.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    prisma.$disconnect();
    return res.send(instrument);
  }
}