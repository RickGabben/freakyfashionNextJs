// src/components/AccordionMenu.tsx
"use client";

import { useState } from "react";

type Section = { title: string; items: string[] };
type Props = { className?: string };

const SECTIONS: Section[] = [
  {
    title: "Shopping",
    items: ["Vinterjackor", "Pufferjackor", "Kappa", "Trenchcoats"],
  },
  {
    title: "Mina Sidor",
    items: ["Mina Ordrar", "Mitt Konto"],
  },
  {
    title: "Kundtjänst",
    items: ["Returnpolicy", "Integritetspolicy"],
  },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path
        d="M5 8l5 5 5-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function AccordionMenu({ className = "" }: Props) {
  const [open, setOpen] = useState<Record<number, boolean>>({});

  return (
    <section className={className}>
      {/* Mobile: accordion */}
      <div className="sm:hidden border bg-white divide-y">
        {SECTIONS.map((s, i) => {
          const isOpen = !!open[i];
          const id = `acc-${i}`;
          return (
            <div key={s.title}>
              <button
                className={`w-full px-4 py-3 flex items-center justify-between text-left font-medium
                ${isOpen ? "bg-slate-300" : "bg-white"}`}
                aria-expanded={isOpen}
                aria-controls={id}
                onClick={() => setOpen((p) => ({ ...p, [i]: !p[i] }))}
              >
                <span>{s.title}</span>
                <Chevron open={isOpen} />
              </button>
              <div id={id} className={isOpen ? "block" : "hidden"}>
                <ul className="px-4 pb-3 space-y-2 text-sm text-slate-700">
                  {s.items.map((label) => (
                    <li key={label} className="select-none">
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop: tre kolumner */}
      <div className="hidden sm:bg-gray-200 sm:grid sm:p-6 sm:mt-4 grid-cols-1 sm:grid-cols-3 gap-8">
        {SECTIONS.map((s) => (
          <div key={s.title}>
            <h3 className="text-sm font-semibold mb-2">{s.title}</h3>
            <ul className="space-y-2 text-sm text-slate-700">
              {s.items.map((label) => (
                <li key={label} className="select-none">
                  {label}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
