import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.product.findMany({ orderBy: { id: "desc" } });
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const { name, price } = await req.json();
  const p = await prisma.product.create({
    data: { name, price: Number(price) },
  });
  return NextResponse.json(p, { status: 201 });
}

// Prisma kräver Node-runtime (inte Edge) i Next:
export const runtime = "nodejs";
