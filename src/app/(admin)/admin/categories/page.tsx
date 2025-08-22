// src/app/(admin)/admin/categories/page.tsx
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true, imageUrl: true },
  });

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Kategorier</h1>
        <Link
          href="/admin/categories/new"
          className="h-9 inline-flex items-center rounded-md bg-black px-3 text-sm font-medium text-white"
        >
          Ny kategori
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100">
            <tr className="text-left">
              <th className="px-3 py-2 font-medium">Namn</th>
              <th className="px-3 py-2 font-medium">Bild</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="px-3 py-2">{c.name}</td>
                <td className="px-3 py-2">
                  {c.imageUrl ? (
                    <img
                      src={c.imageUrl}
                      alt=""
                      className="h-10 w-16 object-cover rounded"
                    />
                  ) : (
                    <span className="text-slate-400">—</span>
                  )}
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td
                  colSpan={2}
                  className="px-3 py-6 text-center text-slate-500"
                >
                  Inga kategorier ännu.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
