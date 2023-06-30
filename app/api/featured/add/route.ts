import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
export async function POST(request: Request) {
  const body = await request.json()
  try {
    const { id } = await prisma.featuredPost.create({
      data: body,
    })
    return NextResponse.json({ id })
  } catch (e) {
    return NextResponse.error()
  }
}
