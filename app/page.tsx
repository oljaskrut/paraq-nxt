import XImage from "@/components/x-image"
import { formatDate } from "@/lib/dayjs"
import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function Home() {
  const posts = await prisma.post.findMany({
    take: 20,
    orderBy: { date: "desc" },
  })

  return (
    <main className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Beautifully designed components <br className="hidden sm:inline" />
          built with Radix UI and Tailwind CSS.
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Accessible and customizable components that you can copy and paste
          into your apps. Free. Open Source. And Next.js 13 Ready.
        </p>
      </div>

      <hr className="my-8" />
      <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={"/post/" + post.id}
            className="group flex flex-col space-y-2 rounded-lg border shadow "
          >
            <XImage
              url={post.image}
              className="rounded-t-lg bg-muted transition-colors object-cover aspect-video"
            />
            <div className="p-4">
              <p className="text-sm text-muted-foreground text-justify w-full">
                {formatDate(post.date)} {post.source}
              </p>
              <h2 className="text-2xl font-extrabold tracking-tighter leading-6 my-2">
                {post.head}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
