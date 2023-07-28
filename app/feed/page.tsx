import FeedAllX from "@/components/FeedAllX"
import { prisma } from "@/lib/prisma"

export default async function Home() {
  const feed = await prisma.feed.findMany({
    take: 20,
    orderBy: { date: "desc" },
  })

  return (
    <main className="md:container grid items-center gap-6 md:pb-4 pt-6">
      {/* <div className="hidden md:flex flex-col items-start justify-center gap-4">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl mb-2">
          Главные события
        </h1>
        <FeaturedFeed posts={featuredPosts} />
      </div>
      <div className="flex flex-col items-start justify-center gap-4 md:hidden">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl mb-2">
          Главные события
        </h1>
        <FeaturedFeedRest posts={featuredPosts} />
      </div>
      <hr className="my-8" /> */}

      {/* <h1 className="text-2xl font-bold leading-tight tracking-tighter md:text-4xl mb-2">
        Главные события
      </h1>
      <Feed /> */}

      <h1 className="text-2xl font-bold leading-tight tracking-tighter md:text-4xl mb-2">
        Все новости
      </h1>
      <FeedAllX feed={feed} />
    </main>
  )
}
