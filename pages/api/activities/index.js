import { PrismaClient } from "@prisma/client";

export default async function (req, res) {
  const prisma = new PrismaClient();
  if (req.method === "GET") {
    const activities = await prisma.activity.findMany();
    prisma.$disconnect();
    return res.send(activities);
  } else if (req.method === "POST") {
    const { body: data } = req;
    const newActivity = await prisma.activity.create({ data });
    prisma.$disconnect();
    return res.status(201).send(newActivity);
  }
}
