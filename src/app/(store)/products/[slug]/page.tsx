// src/app/(store)/products/[slug]/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import StoreBenefits from "@/components/StoreBenefits";
import AccordionMenu from "@/components/AccordionMenu";

type Props = { params: Promise<{ slug: string }> };

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const p = await prisma.product.findUnique({ where: { slug } });
  if (!p) return notFound();

  // Hämta kandidater (exkludera aktuell), blanda, ta 3
  const candidates = await prisma.product.findMany({
    where: { id: { not: p.id } },
    select: {
      id: true,
      slug: true,
      name: true,
      price: true,
      brand: true,
      image: true,
    },
    take: 24,
  });
  const related = candidates.sort(() => Math.random() - 0.5).slice(0, 3);

  return (
    <>
      <section className="space-y-8">
        {/* Produktens egna info */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="aspect-[5/5] sm:aspect-[3/4] rounded-xl bg-slate-100 overflow-hidden">
            {p.image ? (
              <img
                src={p.image}
                alt={p.name}
                className="h-full w-full object-cover"
              />
            ) : null}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{p.name}</h1>
            {p.brand && <div className="mt-1 text-slate-600">{p.brand}</div>}
            <div className="mt-4 text-xl font-semibold">{p.price} kr</div>
            {p.description && (
              <p className="mt-4 text-slate-700">{p.description}</p>
            )}
            <button className="mt-6 h-10 w-full sm:w-1/2 rounded-md bg-black px-4 text-sm font-medium text-white">
              Lägg i varukorg
            </button>
          </div>
        </div>

        {/* Liknande produkter (3 kort, 3 kolumner på md) */}
        <div className="space-y-3 hidden sm:block">
          <h2 className="text-center text-lg font-semibold">
            Liknande produkter
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <ProductCard key={r.id} {...r} showHeart={false} />
            ))}
          </div>
        </div>
      </section>
      <section>
        <StoreBenefits />
        <AccordionMenu className="mt-10" />
      </section>
    </>
  );
}
