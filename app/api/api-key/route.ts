import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { generateApiKey, hashApiKey } from "@/lib/apiKey";

export async function GET() {
  const user = await getAuthUser();
  if (!user) return NextResponse.json([], { status: 401 });

  const dbUser = await prisma.user.findUnique({
    where: { email: user.email },
  });

  if (!dbUser) return NextResponse.json([], { status: 404 });

  const keys = await prisma.apiKey.findMany({
    where: { userId: dbUser.id },
    select: {
      id: true,
      createdAt: true,
      lastUsedAt: true,
    },
  });

  return NextResponse.json(keys);
}

export async function POST() {
  const user = await getAuthUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const dbUser = await prisma.user.findUnique({
    where: { email: user.email },
  });

  if (!dbUser || dbUser.credits <= 0) {
    return NextResponse.json(
      { error: "You do not have enough credits to generate an API key." },
      { status: 403 }
    );
  }

  await prisma.apiKey.deleteMany({
    where: { userId: dbUser.id },
  });

  const plainKey = generateApiKey();
  const hashedKey = await hashApiKey(plainKey);

  await prisma.apiKey.create({
    data: {
      userId: dbUser.id,
      key: hashedKey,
    },
  });

  return NextResponse.json({
    key: plainKey, // shown once
    createdAt: new Date(),
  });
}
