// src/app/(store)/page.tsx
import AccordionMenu from "@/components/AccordionMenu";
import { Hero } from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import Spots from "@/components/Spots";
import StoreBenefits from "@/components/StoreBenefits";

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
      <Spots />

      {/* Product grid – hämtar själv via Prisma */}
      <ProductGrid query={{ limit: 8 }} />
      <StoreBenefits />
      <AccordionMenu className="mt-2" />
    </section>
  );
}
