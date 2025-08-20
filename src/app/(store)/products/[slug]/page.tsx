import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

type PageProps = { params: Promise<{ slug: string }> }; // 👈 params är en Promise

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params; // 👈 vänta in params

  const p = await prisma.product.findUnique({ where: { slug } });
  if (!p) return notFound();

  return (
    <section className="grid gap-6 md:grid-cols-2">
      <div className="aspect-[4/5] rounded-xl bg-slate-100 overflow-hidden">
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
        <button className="mt-6 h-10 rounded-md bg-black px-4 text-sm font-medium text-white">
          Lägg i varukorg
        </button>
      </div>
    </section>
  );
}
