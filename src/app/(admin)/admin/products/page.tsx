// src/app/(admin)/admin/products/page.tsx
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
    select: { id: true, name: true, sku: true, price: true },
  });

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Produkter</h1>
        <Link
          href="/admin/products/new"
          className="h-9 inline-flex items-center rounded-md bg-black px-3 text-sm font-medium text-white"
        >
          Ny produkt
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100">
            <tr className="text-left">
              <th className="px-3 py-2 font-medium">Namn</th>
              <th className="px-3 py-2 font-medium">SKU</th>
              <th className="px-3 py-2 font-medium">Pris</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="px-3 py-2">{p.name}</td>
                <td className="px-3 py-2">{p.sku ?? "—"}</td>
                <td className="px-3 py-2">{p.price} kr</td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="px-3 py-6 text-center text-slate-500"
                >
                  Inga produkter ännu.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
