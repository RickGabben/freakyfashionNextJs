type Props = { params: { slug: string } };

export default function ProductPage({ params }: Props) {
  const title = decodeURIComponent(params.slug).replace(/-/g, " ");
  return (
    <section className="space-y-4">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="aspect-[4/5] rounded-xl bg-slate-100" />
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="mt-1 text-slate-600">Kort beskrivning av produkten.</p>
          <div className="mt-4 text-xl font-semibold">199 kr</div>
          <button className="mt-4 h-10 rounded-md bg-black px-4 text-sm font-medium text-white">
            Lägg i varukorg
          </button>
        </div>
      </div>
    </section>
  );
}
