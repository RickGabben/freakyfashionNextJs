// src/app/(store)/layout.tsx
import { prisma } from "@/lib/prisma";
import { Header } from "@/components/Header";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: {
    default: "FreakyFashion",
    template: "%s | FreakyFashion",
  },
};
export default async function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    select: { slug: true, name: true },
  });

  return (
    <>
      <Header categories={categories} />
      <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
    </>
  );
}
