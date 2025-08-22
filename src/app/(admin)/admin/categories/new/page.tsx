// src/app/(admin)/admin/categories/new/page.tsx
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export default function NewCategoryPage() {
  async function createCategory(formData: FormData) {
    "use server";

    const name = String(formData.get("name") || "").trim();
    if (!name || name.length > 25)
      throw new Error("Namn krävs (max 25 tecken).");

    // Gör unik slug
    let base = slugify(name) || "kategori";
    let slug = base;
    for (let i = 1; ; i++) {
      const exists = await prisma.category.findUnique({ where: { slug } });
      if (!exists) break;
      slug = `${base}-${i}`;
    }

    // Ev. filuppladdning
    let imageUrl: string | null = null;
    const file = formData.get("image") as File | null;
    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadDir = path.join(
        process.cwd(),
        "public",
        "images",
        "categories"
      );
      await mkdir(uploadDir, { recursive: true });

      const safe = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "");
      const filename = `${Date.now()}-${safe || "cat"}.png`;
      const filepath = path.join(uploadDir, filename);
      await writeFile(filepath, buffer);
      imageUrl = `/images/categories/${filename}`;
    }

    await prisma.category.create({
      data: { name, slug, imageUrl },
    });

    revalidatePath("/admin/categories");
    redirect("/admin/categories");
  }

  return (
    <section className="space-y-4">
      <h1 className="text-xl font-semibold">Ny kategori</h1>

      <form
        action={createCategory}
        className="space-y-4 rounded-lg border bg-white p-4"
      >
        <label className="block">
          <div className="text-sm font-medium">
            Namn <span className="text-slate-500">(max 25 tecken)</span>
          </div>
          <input
            name="name"
            maxLength={25}
            required
            className="mt-1 w-full rounded-md border px-3 py-2"
            placeholder="Ange namn"
          />
        </label>

        <label className="block">
          <div className="text-sm font-medium">Bild</div>
          <input
            name="image"
            type="file"
            accept="image/*"
            className="mt-1 block w-full text-sm"
          />
          <p className="mt-1 text-xs text-slate-500">
            Bilden sparas under <code>/public/images/categories</code> och URL
            lagras i databasen.
          </p>
        </label>

        <div className="flex gap-2">
          <button className="h-9 rounded-md bg-black px-4 text-sm font-medium text-white">
            Lägg till
          </button>
          <a
            href="/admin/categories"
            className="h-9 rounded-md border px-4 text-sm inline-flex items-center"
          >
            Avbryt
          </a>
        </div>
      </form>
    </section>
  );
}
