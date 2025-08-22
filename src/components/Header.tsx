import Link from "next/link";

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M21 21l-4.3-4.3"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <circle
        cx="11"
        cy="11"
        r="7"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}
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
function CartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="9" cy="20" r="1.5" fill="currentColor" />
      <circle cx="17" cy="20" r="1.5" fill="currentColor" />
      <path
        d="M3 4h2l2.2 10.4a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L22 8H7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Header() {
  return (
    <header className="border-b bg-white">
      {/* MOBILE <640px */}
      <div className="sm:hidden px-4 py-3">
        {/* Logotyp (länkar hem) */}
        <Link href="/" className="block" aria-label="Gå till startsidan">
          <img src="https://placehold.co/640x100?text=Freaky+Fashion" alt="" />
        </Link>

        {/* Sök + ikoner */}
        <div className="mt-3 flex items-center gap-3">
          <form action="/search" className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              name="q"
              placeholder="Sök produkt"
              aria-label="Sök produkt"
              className="h-10 w-full rounded-md border bg-white pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-slate-400"
            />
          </form>

          <a
            href="#"
            aria-label="Önskelista"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border"
          >
            <HeartIcon className="h-5 w-5" />
          </a>
          <a
            href="#"
            aria-label="Varukorg"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border"
          >
            <CartIcon className="h-5 w-5" />
          </a>
        </div>

        {/* Länkar: Dam / Herr / Rea (vertikalt) */}
        <nav className="mt-3 space-y-1 text-sm">
          <Link href="/categories/dam" className="block hover:underline">
            Dam
          </Link>
          <Link href="/categories/herr" className="block hover:underline">
            Herr
          </Link>
          <Link href="/categories/rea" className="block hover:underline">
            Rea
          </Link>
        </nav>
      </div>

      {/* DESKTOP >=640px (valfritt: din tidigare header) */}
      <div className="hidden sm:block">
        <div className="max-w-6xl mx-auto px-4 py-3 space-y-3">
          {/* Rad 1: logga, sök, ikoner */}
          <div className="flex items-center gap-4">
            {/* Logotyp-plats (byt gärna mot <Image> senare) */}
            <Link href="/" aria-label="Gå till startsidan" className="block">
              <img
                src="https://placehold.co/200x100?text=Freaky+Fashion"
                alt=""
              />
            </Link>

            {/* Sökfält i mitten (pill) */}
            <form action="/search" className="relative flex-1">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                name="q"
                placeholder="Sök produkt"
                aria-label="Sök produkt"
                className="h-10 w-full rounded-full border bg-white pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-slate-400"
              />
            </form>

            {/* Ikoner till höger */}
            <div className="ml-2 flex items-center gap-4 text-slate-700">
              <a
                href="#"
                aria-label="Önskelista"
                className="inline-flex h-9 w-9 items-center justify-center"
              >
                <HeartIcon className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Varukorg"
                className="inline-flex h-9 w-9 items-center justify-center"
              >
                <CartIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Rad 2: länkar under (vänsterställda) */}
          <nav className="flex items-center gap-5 text-sm text-slate-700">
            <Link href="/categories/dam" className="hover:underline">
              Dam
            </Link>
            <Link href="/categories/herr" className="hover:underline">
              Herr
            </Link>
            <Link href="/categories/rea" className="hover:underline">
              Rea
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
