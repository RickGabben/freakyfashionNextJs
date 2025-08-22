import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";

type Props = { params: Promise<{ slug: string }> };

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  if (slug === "nyheter") {
    const items = await prisma.product.findMany({
      orderBy: { id: "desc" }, // eller createdAt: "desc"
      take: 24,
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
      <section className="space-y-6">
        <h1 className="text-2xl font-bold">Nyheter</h1>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} {...p} showHeart />
          ))}
        </div>
      </section>
    );
  }

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
      <h1 className="text-2xl font-bold">{category.name}</h1>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {category.products.map((p) => (
          <ProductCard key={p.id} {...p} showHeart />
        ))}
      </div>
    </section>
  );
}
