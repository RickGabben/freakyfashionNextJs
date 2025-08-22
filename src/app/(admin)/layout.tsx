// src/app/(admin)/layout.tsx
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Fullbredd toppbar */}
      <header className="sticky top-0 z-40 bg-slate-900 text-white">
        <div className="px-4 py-2">
          <span className="font-semibold">Administration</span>
        </div>
      </header>

      {/* Layout under toppbaren */}
      <div className="grid grid-cols-[220px_1fr]">
        {/* Sidebar */}
        <aside className="border-b h-screen bg-white border-r">
          <nav className="p-3 space-y-2">
            <Link
              href="/admin/products"
              className="block rounded px-2 py-1 hover:bg-slate-100"
            >
              Produkter
            </Link>
            <Link
              href="/admin/categories"
              className="block rounded px-2 py-1 hover:bg-slate-100"
            >
              Kategorier
            </Link>
          </nav>
        </aside>

        {/* Content */}
        <main>
          <div className="mx-auto max-w-5xl p-4">{children}</div>
        </main>
      </div>
    </div>
  );
}
