import { PrismaClient } from "@prisma/client";

export default async function (req, res) {
  const prisma = new PrismaClient();
  if (req.method === "GET") {
    const itemReceptions  = await prisma.itemReception.findMany();
    console.log(itemReceptions)
    prisma.$disconnect();
    return res.send(itemReceptions);
  } else if (req.method === "POST") {
    const { body: data } = req;
    console.log("this is the", data)
    const newItemReception = await prisma.itemReception.create({ data });
    console.log(newItemReception)
    prisma.$disconnect();
    return res.status(201).send(newItemReception);
  }
}
