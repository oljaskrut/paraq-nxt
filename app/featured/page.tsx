import FeaturedFeedX from "@/components/FeaturedFeedX"

import { prisma } from "@/lib/prisma"

export default async function Page() {
  const posts = await prisma.featuredPost.findMany({
    orderBy: { date: "desc" },
  })

  return (
    <main className="container grid items-center gap-6 pb-4 pt-6 md:py-10">
      <FeaturedFeedX posts={posts} />
    </main>
  )
}
