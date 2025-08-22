// src/components/Hero.tsx
type HeroData = {
  imageUrl?: string;

  message: string; // ej använd här, men finns kvar
  title: string;
  description: string;
};

export function Hero({ data }: { data: HeroData }) {
  return (
    <section>
      <div className="overflow-hidden rounded-xl border bg-white">
        {/* 1 kolumn på mobil, 2 kolumner på ≥1024px */}
        <div className="grid lg:grid-cols-[1fr_2fr] lg:min-h-[22rem] xl:min-h-[26rem]">
          {/* Textblock – under bilden på mobil, vänster på desktop */}
          <div className="order-2 lg:order-1 flex items-center justify-center lg:justify-start p-6 lg:p-10">
            <div className="max-w-xl text-center lg:text-left space-y-3">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
                {data.title}
              </h2>
              <p className="text-slate-600">{data.description}</p>
            </div>
          </div>

          {/* Bild – överst på mobil, höger på desktop */}
          <div className="order-1 lg:order-2">
            <img
              src={data.imageUrl || "https://placehold.co/1200x600?text=Hero"}
              alt=""
              className="block h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
