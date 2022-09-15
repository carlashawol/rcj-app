import { PrismaClient } from "@prisma/client";

export default async function (req, res) {
  const prisma = new PrismaClient();
  if (req.method === "GET") {
    const offerActivities = await prisma.offerActivity.findMany();
    prisma.$disconnect();
    return res.send(offerActivities);
  } else if (req.method === "POST") {
    const { body: data } = req;
    const newOfferActivity = await prisma.offerActivity.create({ data });
    prisma.$disconnect();
    return res.status(201).send(newOfferActivity);
  }
}
