import { PrismaClient } from "@prisma/client";

export default async function (req, res) {
  const prisma = new PrismaClient();
  if (req.method === "GET") {
    const users = await prisma.user.findMany();
    return res.send(users);
  } else if (req.method === "POST") {
    const { body: data } = req;
    const newUser = await prisma.user.create({ data });
    return res.status(201).send(newUser);
  }
}
