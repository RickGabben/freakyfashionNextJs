import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // 1) Skapa kategorier (idempotent)
  const [dam, herr, rea] = await Promise.all([
    prisma.category.upsert({
      where: { slug: "dam" },
      update: {},
      create: { slug: "dam", name: "Dam" },
    }),
    prisma.category.upsert({
      where: { slug: "herr" },
      update: {},
      create: { slug: "herr", name: "Herr" },
    }),
    prisma.category.upsert({
      where: { slug: "rea" },
      update: {},
      create: { slug: "rea", name: "Rea" },
    }),
  ]);

  // 2) Koppla några produkter (exempelregler – byt efter behov)
  const all = await prisma.product.findMany({
    select: { id: true, name: true },
  });

  for (const p of all) {
    const name = p.name.toLowerCase();
    const catId =
      name.includes("t-shirt") || name.includes("hoodie")
        ? herr.id
        : name.includes("kappa") || name.includes("byxa")
        ? dam.id
        : rea.id;

    await prisma.product.update({
      where: { id: p.id },
      data: { categoryId: catId },
    });
  }
}

main().finally(() => prisma.$disconnect());
