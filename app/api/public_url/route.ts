import { NextResponse } from "next/server"
export async function GET(request: Request) {
  const url = process.env.NEXT_PUBLIC_APP_URL
  const env = process.env.NODE_ENV

  return NextResponse.json({ url, env })
}
