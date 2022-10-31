import { PrismaClient } from "@prisma/client";

export default async function (req, res) {
  const prisma = new PrismaClient();
  if (req.method === "GET") {
    const offers = await prisma.offer.findMany();
    prisma.$disconnect();
    return res.send(offers);
  } else if (req.method === "POST") {
    const { body: data } = req;
    console.log("this is the", data)
    const newOffer = await prisma.offer.create({ data });
    prisma.$disconnect();
    return res.status(201).send(newOffer);
  }
}