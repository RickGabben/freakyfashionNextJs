import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function upsertCategory(slug: string, name: string) {
  return prisma.category.upsert({
    where: { slug },
    update: { name },
    create: { slug, name },
  });
}

function has(str: string, ...needles: string[]) {
  const s = str.toLowerCase();
  return needles.some((n) => s.includes(n));
}

async function main() {
  // 1) Se till att kategorierna finns
  const [dam, herr, nyheter, kepsar, accessoarer] = await Promise.all([
    upsertCategory("dam", "Dam"),
    upsertCategory("herr", "Herr"),
    upsertCategory("nyheter", "Nyheter"), // ersätter "rea"
    upsertCategory("kepsar-mossor", "Kepsar/Mössor"),
    upsertCategory("accessoarer", "Accessoarer"),
  ]);

  // 2) Koppla produkter till Kepsar/Mössor och Accessoarer
  const prods = await prisma.product.findMany({
    select: { id: true, name: true },
  });

  for (const p of prods) {
    const n = p.name.toLowerCase();

    // Kepsar/Mössor
    if (has(n, "keps", "mössa", "mossa")) {
      await prisma.product.update({
        where: { id: p.id },
        data: { categoryId: kepsar.id },
      });
      continue;
    }

    // Accessoarer (bälte m.m.)
    if (has(n, "bälte", "balte", "belt")) {
      await prisma.product.update({
        where: { id: p.id },
        data: { categoryId: accessoarer.id },
      });
      continue;
    }

    // Övriga: lämna deras kategori orörd (kan vara Dam/Herr/ingen)
  }

  console.log("Klart: kategorier uppdaterade och produkter kopplade.");
}

main().finally(() => prisma.$disconnect());
