import Link from "next/link";

type Props = {
  id: number;
  slug: string; // <—
  name: string;
  price: number;
  brand?: string | null;
  image?: string | null;
};

export function ProductCard({ slug, name, price, brand, image }: Props) {
  return (
    <Link
      href={`/products/${slug}`}
      className="block rounded-xl border bg-white p-3 hover:shadow-sm transition"
    >
      <div className="aspect-[4/5] w-full overflow-hidden rounded-lg bg-slate-100 mb-3">
        {image ? (
          <img src={image} alt={name} className="h-full w-full object-cover" />
        ) : null}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm">{name}</span>
        <span className="text-sm font-semibold">{price} kr</span>
      </div>
      <div className="text-xs text-slate-500">{brand ?? "—"}</div>
    </Link>
  );
}
