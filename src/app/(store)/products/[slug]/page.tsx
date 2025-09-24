// src/app/(store)/products/[slug]/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import type { Metadata } from "next";

// Dynamisk <title>
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = await prisma.product.findUnique({
    where: { slug },
    select: { name: true, brand: true },
  });
  if (!p) return { title: "Produkt saknas" };
  const title = p.brand ? `${p.name} – ${p.brand}` : p.name;
  return { title };
}

type Props = { params: Promise<{ slug: string }> };

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  // Hämta produkt + dess kategorier
  const p = await prisma.product.findUnique({
    where: { slug },
    select: {
      id: true,
      slug: true,
      name: true,
      price: true,
      brand: true,
      image: true,
      description: true,
      categories: { select: { id: true } },
    },
  });
  if (!p) return notFound();

  // Liknande produkter: delar minst en kategori.
  const catIds = p.categories.map((c: { id: number }) => c.id);

  const where =
    catIds.length > 0
      ? { id: { not: p.id }, categories: { some: { id: { in: catIds } } } }
      : { id: { not: p.id } };

  const orderBy = catIds.length > 0 ? undefined : { id: "desc" as const };

  const related = await prisma.product.findMany({
    where,
    ...(orderBy ? { orderBy } : {}),
    take: 3,
    select: {
      id: true,
      slug: true,
      name: true,
      price: true,
      brand: true,
      image: true,
    },
  });

  return (
    <section className="space-y-8">
      {/* Produktens egna info */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="aspect-[5/5] sm:aspect-[3/4] overflow-hidden rounded-xl bg-slate-100">
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
          {p.description && (
            <p className="mt-4 text-slate-700">{p.description}</p>
          )}
          <div className="mt-4 text-xl font-semibold">{p.price} kr</div>
          <button className="mt-6 h-10 w-full sm:w-1/2 rounded-md bg-black px-4 text-sm font-medium text-white">
            Lägg i varukorg
          </button>
        </div>
      </div>

      {/* Liknande produkter */}
      {related.length > 0 && (
        <div className="hidden sm:block space-y-3">
          <h2 className="text-center text-lg font-semibold">
            Liknande produkter
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <ProductCard
                key={r.id}
                {...r}
                slug={r.slug ?? ""}
                showHeart={false}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
