import { PrismaClient } from "@prisma/client";

export default async function (req, res) {
  const prisma = new PrismaClient();
  const { id } = req.query;
  if (req.method === "GET") {
    const specification = await prisma.specification.findUnique({
      where: {
        name: id,
      },
    });
    prisma.$disconnect();
    return res.send(specification);
  }
}
