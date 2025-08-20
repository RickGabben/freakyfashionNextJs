import { ProductCard } from "@/components/ProductCard";
import { Hero } from "@/components/Hero";
async function getHero() {
  // Här kan du senare ersätta med fetch till Nest:
  // const res = await fetch("http://localhost:3001/hero", { cache: "no-store" });
  // return res.json();
  return {
    eyebrow: "Hero",
    message: "Informationen är dynamisk.",
    title: "Lorem ipsum dolor",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    // imageUrl: "/hero.jpg", // valfri bild
    // cta: { label: "Handla nu", href: "/categories/nyheter" },
  };
}
export default async function HomePage() {
  const heroData = await getHero();
  const products = Array.from({ length: 8 }).map((_, i) => ({
    name: "Svart T-Shirt",
    price: 199,
    href: "/products/svart-tshirt",
    key: i,
  }));

  return (
    <section className="space-y-8">
      <Hero data={heroData} />
      {/* Nyheter */}
      <div className="rounded-xl border bg-white p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Höstens nyheter</h1>
        <p className="mt-2 text-slate-600">Fri frakt över 499 kr.</p>
        <a
          href="/categories/nyheter"
          className="mt-4 inline-flex h-10 items-center rounded-md bg-black px-4 text-sm font-medium text-white"
        >
          Handla nu
        </a>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
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

      <div>
        <h2 className="mb-3 text-lg font-semibold">Populära produkter</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard
              key={p.key}
              name={p.name}
              price={p.price}
              href={p.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
