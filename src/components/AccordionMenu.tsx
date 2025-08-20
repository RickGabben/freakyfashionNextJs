// src/components/AccordionMenu.tsx
"use client";

import Link from "next/link";
import { useState } from "react";

type Section = { title: string; links: { label: string; href: string }[] };
type Props = { className?: string };

const SECTIONS: Section[] = [
  {
    title: "Shopping",
    links: [
      { label: "Vinterjackor", href: "/categories/vinterjackor" },
      { label: "Pufferjackor", href: "/categories/pufferjackor" },
      { label: "Kappa", href: "/categories/kappa" },
      { label: "Trenchcoats", href: "/categories/trenchcoats" },
    ],
  },
  {
    title: "Mina Sidor",
    links: [
      { label: "Mina Ordrar", href: "/orders" },
      { label: "Mitt Konto", href: "/account" },
    ],
  },
  {
    title: "Kundtjänst",
    links: [
      { label: "Returnpolicy", href: "/returns" },
      { label: "Integritetspolicy", href: "/privacy" },
    ],
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
      <div className="sm:hidden rounded-xl border bg-white divide-y">
        {SECTIONS.map((s, i) => {
          const isOpen = !!open[i];
          const id = `acc-${i}`;
          return (
            <div key={s.title}>
              <button
                className="w-full px-4 py-3 flex items-center justify-between text-left font-medium"
                aria-expanded={isOpen}
                aria-controls={id}
                onClick={() => setOpen((p) => ({ ...p, [i]: !p[i] }))}
              >
                <span>{s.title}</span>
                <Chevron open={isOpen} />
              </button>
              <div id={id} className={`${isOpen ? "block" : "hidden"}`}>
                <ul className="px-4 pb-3 space-y-2 text-sm text-slate-700">
                  {s.links.map((l) => (
                    <li key={l.label}>
                      <Link className="hover:underline" href={l.href}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop: tre kolumner */}
      <div className="hidden sm:grid grid-cols-1 sm:grid-cols-3 gap-8">
        {SECTIONS.map((s) => (
          <div key={s.title}>
            <h3 className="text-sm font-semibold mb-2">{s.title}</h3>
            <ul className="space-y-2 text-sm text-slate-700">
              {s.links.map((l) => (
                <li key={l.label}>
                  <Link className="hover:underline" href={l.href}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
