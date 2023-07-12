import { todayDate } from "@/lib/dayjs"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const data = await prisma.feed.findMany({
      take: 6,
      orderBy: { length: "desc" },
      where: {
        date: {
          gte: todayDate(),
        },
      },
    })

    return NextResponse.json(data)
  } catch (e) {
    console.log(e)
    return NextResponse.error()
  }
}
