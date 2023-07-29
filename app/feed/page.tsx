import Feed from "@/components/Feed"
import FeedAllX from "@/components/FeedAllX"
import { prisma } from "@/lib/prisma"

export default async function Home() {
  const feed = await prisma.feed.findMany({
    take: 20,
    orderBy: { date: "desc" },
  })

  return (
    <main className="md:container grid items-center gap-6 md:pb-4 pt-6">
      <h1 className="text-2xl font-bold leading-tight tracking-tighter md:text-4xl mb-2">
        Главные события
      </h1>
      <Feed />
      <h1 className="text-2xl font-bold leading-tight tracking-tighter md:text-4xl mb-2">
        Все новости
      </h1>
      <FeedAllX feed={feed} />
    </main>
  )
}
