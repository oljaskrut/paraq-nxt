import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const limit = +(searchParams.get("limit") ?? 20)
    const cursor = searchParams.get("cursor") ?? ""

    const feed = await prisma.feed.findMany({
      take: limit,
      orderBy: { date: "desc" },
      ...(cursor !== "" && {
        skip: 1,
        cursor: {
          hash: cursor,
        },
      }),
    })
    return NextResponse.json(feed)
  } catch (e) {
    console.log("dafuq", e)
    return NextResponse.error()
  }
}
export async function PATCH(request: Request) {
  const { id, hidden } = await request.json()
  try {
    const feed = await prisma.feed.update({
      where: {
        id,
      },
      data: {
        hidden,
      },
    })

    return NextResponse.json(feed)
  } catch (e) {
    return NextResponse.error()
  }
}
