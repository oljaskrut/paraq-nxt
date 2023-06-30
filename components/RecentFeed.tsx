import { Post } from "@prisma/client"
import Link from "next/link"
import XImage from "@/components/x-image"
import { formatTimeToNow } from "@/lib/utils"

export default function RecentFeed({ posts }: { posts: Post[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
            <div className="flex justify-between text-sm text-muted-foreground px-2">
              <span>{post.source}</span>
              <span>{formatTimeToNow(post.date)}</span>
            </div>

            <h2 className="text-2xl font-extrabold tracking-tighter leading-6 my-2">
              {post.head}
            </h2>
          </div>
        </Link>
      ))}
    </div>
  )
}
