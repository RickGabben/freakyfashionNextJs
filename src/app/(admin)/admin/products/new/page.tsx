import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export default async function NewProductPage() {
  // Hämta alla kategorier för kryssrutorna
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });

  async function createProduct(formData: FormData) {
    "use server";

    const name = String(formData.get("name") || "").trim();
    const price = Number(formData.get("price") || 0);
    const sku = String(formData.get("sku") || "").trim() || null;
    const brand = String(formData.get("brand") || "").trim() || null;
    const image = String(formData.get("image") || "").trim() || null;
    const description =
      String(formData.get("description") || "").trim() || null;

    if (!name || Number.isNaN(price)) {
      throw new Error("Namn och pris krävs");
    }

    // gör unik slug
    let base = slugify(name) || "produkt";
    let slug = base;
    for (let i = 1; ; i++) {
      const exists = await prisma.product.findUnique({ where: { slug } });
      if (!exists) break;
      slug = `${base}-${i}`;
    }

    // Läs valda kategorier: name="categoryIds"
    const catIds = (formData.getAll("categoryIds") as string[])
      .map((v) => Number(v))
      .filter((n) => Number.isInteger(n));

    await prisma.product.create({
      data: {
        name,
        price,
        sku,
        brand,
        image,
        description,
        slug,
        // M:N-koppling
        categories: { connect: catIds.map((id) => ({ id })) },
      },
    });

    revalidatePath("/admin/products");
    redirect("/admin/products");
  }

  return (
    <section className="space-y-4">
      <h1 className="text-xl font-semibold">Ny produkt</h1>

      <form
        action={createProduct}
        className="space-y-4 rounded-lg border bg-white p-4"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <div className="text-sm font-medium">
              Namn <span className="text-slate-500">(max 25 tecken)</span>
            </div>
            <input
              name="name"
              maxLength={25}
              required
              className="mt-1 w-full rounded-md border px-3 py-2"
            />
          </label>

          <label className="block">
            <div className="text-sm font-medium">Pris (kr)</div>
            <input
              name="price"
              type="number"
              min={0}
              required
              className="mt-1 w-full rounded-md border px-3 py-2"
            />
          </label>

          <label className="block">
            <div className="text-sm font-medium">SKU</div>
            <input
              name="sku"
              className="mt-1 w-full rounded-md border px-3 py-2"
            />
          </label>

          <label className="block">
            <div className="text-sm font-medium">Märke</div>
            <input
              name="brand"
              className="mt-1 w-full rounded-md border px-3 py-2"
            />
          </label>

          <label className="block sm:col-span-2">
            <div className="text-sm font-medium">Bild-URL</div>
            <input
              name="image"
              className="mt-1 w-full rounded-md border px-3 py-2"
            />
          </label>

          <label className="block sm:col-span-2">
            <div className="text-sm font-medium">Beskrivning</div>
            <textarea
              name="description"
              rows={4}
              className="mt-1 w-full rounded-md border px-3 py-2"
            />
          </label>
        </div>

        {/* Kategorier – flera val (checkbox) */}
        <fieldset className="rounded-md border p-3">
          <legend className="text-sm font-medium">Kategorier</legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <label key={c.id} className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  name="categoryIds"
                  value={c.id}
                  className="h-4 w-4"
                />
                <span className="text-sm">{c.name}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="flex gap-2">
          <button className="h-9 rounded-md bg-black px-4 text-sm font-medium text-white">
            Lägg till
          </button>
          <a
            href="/admin/products"
            className="h-9 rounded-md border px-4 text-sm inline-flex items-center"
          >
            Avbryt
          </a>
        </div>
      </form>
    </section>
  );
}
