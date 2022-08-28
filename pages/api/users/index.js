import { PrismaClient } from "@prisma/client";

export default async function (req, res) {
  const prisma = new PrismaClient();
  if (req.method === "GET") {
    const users = await prisma.user.findMany();
    prisma.$disconnect();
    return res.send(users);
  } else if (req.method === "POST") {
    const { body: data } = req;
    const newUser = await prisma.user.create({ data });
    prisma.$disconnect();
    return res.status(201).send(newUser);
  }
}
