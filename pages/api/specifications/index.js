import { PrismaClient } from "@prisma/client";

export default async function (req, res) {
  const prisma = new PrismaClient();
  if (req.method === "GET") {
    const specificatios = await prisma.specification.findMany();
    prisma.$disconnect();
    return res.send(specificatios);
  } else if (req.method === "POST") {
    const { body: data } = req;
    const newSpecification = await prisma.specification.create({ data });
    prisma.$disconnect();
    return res.status(201).send(newSpecification);
  }
}