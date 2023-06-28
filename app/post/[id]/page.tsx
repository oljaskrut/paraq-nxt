import XImage from "@/components/x-image"
import { formatDate } from "@/lib/dayjs"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

export default async function Page({ params }: { params: { id: string } }) {
  const post = await prisma.post.findFirst({
    where: {
      id: params.id,
    },
  })

  if (!post) return notFound()

  return (
    <main className="container grid items-center justify-center gap-6 pb-8 pt-6 md:py-10">
      <div className="grid">
        {post ? (
          <article className="group flex flex-col justify-centere space-y-2 rounded-lg border shadow ">
            <XImage
              url={post.image}
              className="rounded-t-lg bg-muted transition-colors object-cover aspect-video"
            />
            <div className="p-4">
              <p className="text-sm text-muted-foreground text-justify">
                {formatDate(post.date)} {post.source}
              </p>
              <h2 className="text-2xl font-extrabold tracking-tighter leading-6 my-2">
                {post.head}
              </h2>
              <p className="text-xl">{post.body}</p>
            </div>
          </article>
        ) : (
          <p>not found</p>
        )}
      </div>
    </main>
  )
}
