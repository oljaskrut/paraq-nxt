import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
export async function GET() {
  try {
    const posts = await prisma.featuredPost.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        post: true,
      },
    })
    return NextResponse.json(posts)
  } catch (e) {
    return NextResponse.error()
  }
}
export async function POST(request: Request) {
  const { id } = await request.json()
  try {
    const post = await prisma.featuredPost.create({
      data: {
        post: {
          connect: {
            id,
          },
        },
        hidden: true,
      },
    })
    return NextResponse.json(post)
  } catch (e) {
    console.log(e)
    return NextResponse.error()
  }
}
export async function PATCH(request: Request) {
  const { id, hidden } = await request.json()
  try {
    const post = await prisma.featuredPost.update({
      where: {
        id,
      },
      data: {
        hidden,
      },
      include: {
        post: true,
      },
    })
    return NextResponse.json(post)
  } catch (e) {
    return NextResponse.error()
  }
}

export async function PUT(request: Request) {
  const { id } = await request.json()
  try {
    const post = await prisma.featuredPost.delete({
      where: {
        id,
      },
    })
    return NextResponse.json(post)
  } catch (e) {
    return NextResponse.error()
  }
}
