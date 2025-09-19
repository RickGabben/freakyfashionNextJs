import Link from "next/link";
// (valfritt) byt till next/image om du vill
// import Image from "next/image";

export type SpotItem = {
  title: string; // rubrik/text som visas på bilden
  href: string; // länk
  imageUrl?: string; // bild (om saknas visas en placeholder)
  alt?: string;
  subtext?: string; // extra rad under title (valfritt)
};

export default function Spots({ items }: { items?: SpotItem[] }) {
  // fallback-data om inget skickas in
  const data: SpotItem[] = items ?? [
    {
      title: "Vinterjackor",
      subtext: "Upptäck säsongens varma nyheter",
      href: "/categories/vinterjackor",
    },
    {
      title: "Puffer",
      subtext: "Lätt & varmt",
      href: "/categories/pufferjackor",
    },
    {
      title: "Kappor",
      subtext: "Klassiskt & tidlöst",
      href: "/categories/kappor",
    },
  ];

  return (
    <div className="hidden lg:grid grid-cols-3 gap-3">
      {data.slice(0, 3).map((spot) => (
        <Link
          key={spot.title}
          href={spot.href}
          className="group relative block overflow-hidden rounded-xl border bg-white"
        >
          {/* Bildyta */}
          <div className="aspect-[4/3] w-full bg-slate-200">
            {spot.imageUrl ? (
              <img
                src={spot.imageUrl}
                alt={spot.alt ?? spot.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            ) : null}
          </div>

          {/* Liten gradient för läsbarhet */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />

          {/* Överlagrad text (mitt på bilden) */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="rounded-md  px-3 py-2 text-center ">
              <div className="text-sm font-medium text-slate-900">
                {spot.title}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
