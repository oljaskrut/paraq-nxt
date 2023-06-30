import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
export async function POST(request: Request) {
  const body = await request.json()
  try {
    const post = await prisma.featuredPost.delete({
      where: {
        id: body.id,
      },
    })
    return NextResponse.json(post)
  } catch (e) {
    return NextResponse.error()
  }
}
