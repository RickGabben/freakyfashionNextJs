// src/app/(store)/categories/[slug]/page.tsx
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";

// Dynamisk <title> från DB
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = await prisma.category.findUnique({
    where: { slug },
    select: { name: true },
  });
  if (!cat) return { title: "Kategori saknas" };
  return { title: cat.name };
}

type Props = { params: Promise<{ slug: string }> };

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  const category = await prisma.category.findUnique({
    where: { slug },
    select: {
      name: true,
      products: {
        orderBy: { id: "desc" },
        select: {
          id: true,
          slug: true,
          name: true,
          price: true,
          brand: true,
          image: true,
        },
      },
    },
  });

  if (!category) return notFound();

  return (
    <section className="space-y-6">
      <h1 className="text-2xl text-center font-bold">{category.name}</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {category.products.map((p) => (
          <ProductCard key={p.id} {...p} showHeart />
        ))}
      </div>
    </section>
  );
}
