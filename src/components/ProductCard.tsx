type Props = { name: string; price: number; href: string };
export function ProductCard({ name, price, href }: Props) {
  return (
    <a
      href={href}
      className="rounded-xl border bg-white p-3 hover:shadow-sm transition"
    >
      <div className="aspect-[4/5] w-full rounded-lg bg-slate-100 mb-3" />
      <div className="flex items-center justify-between">
        <span className="text-sm">{name}</span>
        <span className="text-sm font-semibold">{price} kr</span>
      </div>
      <div className="text-xs text-slate-500">Varumärke</div>
    </a>
  );
}
