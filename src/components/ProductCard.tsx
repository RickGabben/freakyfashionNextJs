import Link from "next/link";

function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M12 21s-7-4.4-9.5-8.2C.6 9.9 2 6 5.9 6c2 0 3.3 1.2 4.1 2.4C10.8 7.2 12.1 6 14.1 6 18 6 19.4 9.9 17.5 12.8 15 16.6 12 21 12 21z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type Props = {
  id?: number; // fallback-länk om slug saknas
  slug?: string | null; // ⬅️ gör slug valfri / nullable
  name: string;
  price: number;
  brand?: string | null;
  image?: string | null;
  showHeart?: boolean;
};

export function ProductCard({
  slug,
  name,
  price,
  brand,
  image,
  showHeart = false,
}: Props) {
  return (
    <Link
      href={`/products/${slug}`}
      className="group block overflow-hidden rounded-xl border bg-white hover:shadow-sm transition"
    >
      <div className="relative aspect-[3/3] sm:aspect-[2/3] bg-slate-100">
        {image ? (
          <img
            src={image}
            alt={name}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : null}
        {showHeart && (
          <span className="absolute bottom-2 right-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-slate-300">
            <HeartIcon className="h-5 w-5 text-slate-700 group-hover:text-rose-600" />
          </span>
        )}
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
