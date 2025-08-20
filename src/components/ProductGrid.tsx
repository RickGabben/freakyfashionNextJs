// src/components/ProductGrid.tsx
import { prisma } from "@/lib/prisma";
import { ProductCard } from "./ProductCard";
import type { Prisma } from "@prisma/client";

type ProductSummary = {
  id: number;
  slug: string | null;
  name: string;
  price: number;
  brand?: string | null;
  image?: string | null;
};

type GridByQuery = {
  title?: string;
  query: {
    limit?: number;
    search?: string;
    brand?: string;
    excludeId?: number;
  };
};

type GridByData = {
  title?: string;
  products: ProductSummary[];
};

type Props = GridByQuery | GridByData;

export default async function ProductGrid(props: Props) {
  let items: ProductSummary[];

  if ("products" in props) {
    items = props.products;
  } else {
    const { limit = 8, search, brand, excludeId } = props.query;

    const where: Prisma.ProductWhereInput = {};
    if (search) where.name = { contains: search }; // ❗️ingen mode på SQLite
    if (brand) where.brand = brand;
    if (excludeId) where.id = { not: excludeId }; // eller: where.NOT = { id: excludeId }

    items = await prisma.product.findMany({
      where,
      orderBy: { id: "desc" },
      take: limit,
      select: {
        id: true,
        slug: true,
        name: true,
        price: true,
        brand: true,
        image: true,
      },
    });
  }

  if (items.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-6">
        <p className="text-sm text-slate-600">Inga produkter hittades.</p>
      </div>
    );
  }

  return (
    <section className="space-y-3">
      {"title" in props && props.title ? (
        <h2 className="text-lg font-semibold">{props.title}</h2>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.id} {...p} slug={p.slug ?? ""} />
        ))}
      </div>
    </section>
  );
}
