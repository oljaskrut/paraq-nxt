import FeaturedFeedX from "@/components/FeaturedFeedX"
import RecentFeed from "@/components/RecentFeed"

import { prisma } from "@/lib/prisma"

export default async function Page() {
  const posts = await prisma.featuredPost.findMany({
    orderBy: { date: "desc" },
  })

  return (
    <main className="md:container grid items-center gap-6 pb-4 pt-6 md:py-10">
      <div className="hidden md:flex">
        <FeaturedFeedX posts={posts} />
      </div>
      <div className="flex md:hidden">
        <RecentFeed posts={posts} />
      </div>
    </main>
  )
}
