// src/app/(store)/page.tsx
import { Hero } from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";

export const dynamic = "force-dynamic";

async function getHero() {
  // Byt till fetch från API/DB senare om du vill
  return {
    eyebrow: "Hero",
    message: "Informationen är dynamisk.",
    title: "Lorem ipsum dolor",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    // imageUrl: "/hero.jpg",
    // cta: { label: "Handla nu", href: "/categories/nyheter" },
  };
}

export default async function HomePage() {
  const heroData = await getHero();

  return (
    <section className="space-y-8">
      <Hero data={heroData} />

      {/* Spots */}
      <div className="lg:grid gap-3 sm:grid-cols-2 lg:grid-cols-4 hidden">
        {["Vinterjackor", "Puffer", "Kappor", "Trenchcoats"].map((label) => (
          <a
            key={label}
            href={`/categories/${label.toLowerCase()}`}
            className="rounded-xl border bg-white p-4 hover:shadow-sm transition"
          >
            <div className="h-28 rounded-lg bg-slate-100 mb-3" />
            <div className="font-medium">{label}</div>
            <div className="text-sm text-slate-600">Upptäck mer</div>
          </a>
        ))}
      </div>

      {/* Product grid – hämtar själv via Prisma */}
      <ProductGrid query={{ limit: 8 }} />
    </section>
  );
}
