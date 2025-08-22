// src/app/(store)/page.tsx
import AccordionMenu from "@/components/AccordionMenu";
import { Hero } from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import Spots, { SpotItem } from "@/components/Spots";
import StoreBenefits from "@/components/StoreBenefits";

export const dynamic = "force-dynamic";

async function getHero() {
  // Byt till fetch från API/DB senare om du vill
  return {
    message: "Informationen är dynamisk.",
    title: "Lorem ipsum dolor",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    // imageUrl: "/hero.jpg",
    // cta: { label: "Handla nu", href: "/categories/nyheter" },
  };
}
async function getSpots(): Promise<SpotItem[]> {
  // Byt till fetch/DB senare
  return [
    {
      title: "Vinterjackor",
      href: "/categories/vinterjackor",
      imageUrl: "https://placehold.co/600x400/white/white",
    },
    {
      title: "Puffer",
      href: "/categories/pufferjackor",
      imageUrl: "https://placehold.co/600x400/white/white",
    },
    {
      title: "Kappor",
      href: "/categories/kappor",
      imageUrl: "https://placehold.co/600x400/white/white",
    },
  ];
}
export default async function HomePage() {
  const heroData = await getHero();
  const spotsData = await getSpots();

  return (
    <section className="space-y-8">
      <Hero data={heroData} />

      {/* Spots */}
      <Spots items={spotsData} />

      {/* Product grid – hämtar själv via Prisma */}
      <ProductGrid showHeart query={{ limit: 8 }} />
      <StoreBenefits />
      <AccordionMenu className="mt-2" />
    </section>
  );
}
