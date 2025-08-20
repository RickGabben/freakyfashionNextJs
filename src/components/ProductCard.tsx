import Link from "next/link";

type Props = {
  id?: number; // kvar för kompatibilitet
  slug: string;
  name: string;
  price: number;
  brand?: string | null;
  image?: string | null;
};

export function ProductCard({ slug, name, price, brand, image }: Props) {
  return (
    <Link
      href={`/products/${slug}`}
      className="group block overflow-hidden rounded-xl border bg-white hover:shadow-sm transition"
    >
      {/* Kortare bildyta → känns mer balanserad */}
      <div className="relative aspect-[4/4] sm:aspect-[2/3] bg-slate-100">
        {image ? (
          <img
            src={image}
            alt={name}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : null}
      </div>

      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <span className="truncate text-sm font-medium">{name}</span>
          <span className="whitespace-nowrap text-sm font-semibold">
            {price} kr
          </span>
        </div>
        {brand && (
          <div className="mt-1 truncate text-xs text-slate-500">{brand}</div>
        )}
      </div>
    </Link>
  );
}
