import { answer, bigQ } from "@/lib/ai"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { search } = await request.json()
  try {
    const res = await bigQ(search, 4)
    const [ans, cost] = await answer(
      search,
      res.map(({ body, hash, image, id, feedId, hidden, ...el }) => ({
        ...el,
        body: body?.slice(0, 2400),
      })),
    )
    return NextResponse.json({ answer: ans, cost })
  } catch (e) {
    console.log(e)
    return NextResponse.error()
  }
}
