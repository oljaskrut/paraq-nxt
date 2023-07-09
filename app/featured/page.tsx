import FeaturedFeedRest from "@/components/FeaturedFeedRest"
import FeaturedFeedX from "@/components/FeaturedFeedX"

import { prisma } from "@/lib/prisma"

export default async function Page() {
  const posts = await prisma.featuredPost.findMany({
    include: {
      post: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })

  return (
    <main className="md:container grid items-center gap-6 pb-4 pt-6 md:py-10">
      <div className="hidden md:flex flex-col">
        <FeaturedFeedX posts={posts} />
      </div>
      <div className="flex flex-col md:hidden">
        <FeaturedFeedRest posts={posts} />
      </div>
    </main>
  )
}
