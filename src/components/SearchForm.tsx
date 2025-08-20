export function SearchForm() {
  return (
    <form action="/search" className="flex items-center gap-2">
      <input
        name="q"
        placeholder="Sök produkt"
        className="h-9 rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-slate-400"
        aria-label="Sök produkt"
      />
      <button className="h-9 rounded-md bg-black px-3 text-sm font-medium text-white">
        Sök
      </button>
    </form>
  );
}
