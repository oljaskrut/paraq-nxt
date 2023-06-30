import { NextResponse } from "next/server"
export async function GET(request: Request) {
  const url = process.env.NEXT_PUBLIC_APP_URL
  return NextResponse.json({ url })
}
