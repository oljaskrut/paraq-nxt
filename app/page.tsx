import FeaturedFeed from "@/components/FeaturedFeed"
import RecentFeed from "@/components/RecentFeed"

import { prisma } from "@/lib/prisma"

export default async function Home() {
  const posts = await prisma.post.findMany({
    take: 20,
    orderBy: { date: "desc" },
  })

  const featuredPosts = await prisma.featuredPost.findMany({
    take: 5,
    orderBy: { date: "desc" },
    where: {
      OR: [
        {
          hidden: {
            equals: null,
          },
        },
        {
          hidden: {
            equals: false,
          },
        },
      ],
    },
  })

  return (
    <main className="container grid items-center gap-6 pb-4 pt-6 md:py-10">
      <div className="hidden md:flex flex-col items-start justify-center gap-4">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl mb-2">
          Главные события
        </h1>
        <FeaturedFeed posts={featuredPosts} />
      </div>

      <hr className="my-8" />
      <h1 className="text-2xl font-bold leading-tight tracking-tighter md:text-4xl mb-2">
        Последние новости
      </h1>
      <RecentFeed posts={posts} />
    </main>
  )
}
