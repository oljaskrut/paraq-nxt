import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
export async function POST(request: Request) {
  const body = await request.json()
  try {
    const post = await prisma.featuredPost.update({
      where: {
        id: body.id,
      },
      data: {
        show: body.show,
      },
    })
    return NextResponse.json(post)
  } catch (e) {
    return NextResponse.error()
  }
}
