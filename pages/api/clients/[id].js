import { PrismaClient } from "@prisma/client";

export default async function (req, res) {
  const prisma = new PrismaClient();
  const { id } = req.query;
  if (req.method === "GET") {
    const client = await prisma.client.findUnique({
      where: {
        name: id,
      },
    });
    prisma.$disconnect();
    return res.send(client);
  }
}
