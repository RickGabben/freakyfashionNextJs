type HeroData = {
  imageUrl?: string; // valfri bakgrundsbild
  eyebrow?: string; // liten rubrik överst i rutan
  message: string; // text i den gula rutan
  title: string; // rubriken under bilden
  description: string; // brödtext under bilden
  cta?: { label: string; href: string }; // valfri knapp
};

export function Hero({ data }: { data: HeroData }) {
  return (
    <section className="space-y-4">
      {/* Bildyta */}
      <div className="relative overflow-hidden rounded-xl border bg-white">
        <img
          src={data.imageUrl || "https://placehold.co/600x400?text=Hero"}
          alt=""
          className="block w-full h-56 sm:h-72 md:h-96 object-cover"
        />
      </div>

      {/* Titel + brödtext under bilden */}
      <div className="space-y-2">
        <h2 className="text-xl sm:text-2xl font-semibold">{data.title}</h2>
        <p className="text-slate-600">{data.description}</p>
      </div>
    </section>
  );
}
