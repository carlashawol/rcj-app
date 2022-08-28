import { PrismaClient } from "@prisma/client";

export default async function (req, res) {
  const prisma = new PrismaClient();
  if (req.method === "GET") {
    const clients = await prisma.client.findMany();
    prisma.$disconnect();
    return res.send(clients);
  } else if (req.method === "POST") {
    const { body: data } = req;
    const newClient = await prisma.client.create({ data });
    prisma.$disconnect();
    return res.status(201).send(newClient);
  }
}
