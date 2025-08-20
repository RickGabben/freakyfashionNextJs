import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // ta bort diakritik
    .replace(/[^a-z0-9]+/g, "-") // icke-alfanumeriskt -> -
    .replace(/^-+|-+$/g, "") // trimma -
    .slice(0, 60); // maxlängd
}

async function main() {
  const all = await prisma.product.findMany({
    select: { id: true, name: true, slug: true },
  });

  for (const p of all) {
    if (p.slug) continue;
    let base = slugify(p.name);
    if (!base) base = `product-${p.id}`;

    // säkerställ unikhet
    let candidate = base;
    let i = 1;
    while (await prisma.product.findUnique({ where: { slug: candidate } })) {
      candidate = `${base}-${i++}`;
    }

    await prisma.product.update({
      where: { id: p.id },
      data: { slug: candidate },
    });
    console.log(`Set slug for #${p.id} -> ${candidate}`);
  }
}

main().finally(() => prisma.$disconnect());
