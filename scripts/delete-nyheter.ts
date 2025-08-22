import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.category.delete({ where: { slug: "nyheter" } }).catch(() => {});
  console.log("Nyheter (om den fanns) borttagen.");
}
main().finally(() => prisma.$disconnect());
