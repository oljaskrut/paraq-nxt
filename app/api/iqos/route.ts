import { bigQ2 } from "@/lib/ai"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { search } = await request.json()
  try {
    const res = await bigQ2(search)
    return NextResponse.json(res)
  } catch (e) {
    console.log(e)
    return NextResponse.error()
  }
}
