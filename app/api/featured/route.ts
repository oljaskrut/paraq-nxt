import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
export async function GET() {
  try {
    const posts = await prisma.featuredPost.findMany({
      orderBy: {
        date: "desc",
      },
    })
    return NextResponse.json(posts)
  } catch (e) {
    return NextResponse.error()
  }
}
export async function POST(request: Request) {
  const data = await request.json()
  try {
    const post = await prisma.featuredPost.create({
      data,
    })
    return NextResponse.json(post)
  } catch (e) {
    console.log(e)
    return NextResponse.error()
  }
}
export async function PATCH(request: Request) {
  const body = await request.json()
  try {
    const post = await prisma.featuredPost.update({
      where: {
        id: body.id,
      },
      data: {
        hidden: body.hidden,
      },
    })
    return NextResponse.json(post)
  } catch (e) {
    return NextResponse.error()
  }
}

export async function PUT(request: Request) {
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
