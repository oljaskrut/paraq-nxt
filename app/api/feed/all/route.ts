import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)

    const take = +(searchParams.get("take") ?? "20")
    const skip = +(searchParams.get("skip") ?? "0")

    const data = await prisma.feed.findMany({
      take,
      skip,
      orderBy: { date: "desc" },
    })

    return NextResponse.json(data)
  } catch (e) {
    console.log(e)
    return NextResponse.error()
  }
}
