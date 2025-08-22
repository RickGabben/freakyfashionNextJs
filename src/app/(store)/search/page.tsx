// src/app/(store)/search/page.tsx
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ProductGrid from "@/components/ProductGrid";

export const dynamic = "force-dynamic";

// enkel sidtitel
export async function generateMetadata(): Promise<Metadata> {
  return { title: "Sök" };
}

type Props = { searchParams: Promise<{ q?: string }> };

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const term = q.trim();

  if (!term) {
    return (
      <section className="space-y-3">
        <h1 className="text-2xl font-bold">Sök</h1>
        <p className="text-slate-600">
          Skriv något i sökfältet ovan för att hitta produkter.
        </p>
      </section>
    );
  }

  const where = { name: { contains: term } }; // SQLite: case-insensitive för ASCII

  const [items, total] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy: { id: "desc" },
      take: 48, // visa upp till 48 st
      select: {
        id: true,
        slug: true,
        name: true,
        price: true,
        brand: true,
        image: true,
      },
    }),
    prisma.product.count({ where }),
  ]);

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">Hittade {total} produkter</h1>

      <ProductGrid
        showHeart
        products={items} // skicka in färdiga produkter
      />
    </section>
  );
}
