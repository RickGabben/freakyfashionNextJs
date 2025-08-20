const Spots = () => {
  return (
    <div className="lg:grid gap-3 sm:grid-cols-2 lg:grid-cols-4 hidden">
      {["Vinterjackor", "Puffer", "Kappor", "Trenchcoats"].map((label) => (
        <a
          key={label}
          href={`/categories/${label.toLowerCase()}`}
          className="rounded-xl border bg-white p-4 hover:shadow-sm transition"
        >
          <div className="h-28 rounded-lg bg-slate-100 mb-3" />
          <div className="font-medium">{label}</div>
          <div className="text-sm text-slate-600">Upptäck mer</div>
        </a>
      ))}
    </div>
  );
};

export default Spots;
