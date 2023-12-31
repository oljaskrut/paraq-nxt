import { IFeaturedPost } from "@/lib/types"
import XImage from "@/components/x-image"
import Link from "next/link"
import { formatTime } from "@/lib/dayjs"
import { Post } from "@prisma/client"

function CardFull(post: Post) {
  return (
    <Link
      key={post.id}
      href={"/post/" + post.id}
      className="grid grid-cols-2 space-y-2 rounded-lg w-full shadow"
    >
      <XImage
        url={post.image}
        className="rounded-lg bg-muted transition-colors object-cover aspect-video"
      />
      <div className="p-8">
        <div className="flex justify-between text-sm text-muted-foreground px-2">
          <span>{post.source}</span>
          <span>{formatTime(post.date)}</span>
        </div>

        <h2 className="text-2xl font-extrabold tracking-tight leading-7 my-2">
          {post.head}
        </h2>

        <p className="text-lg tracking-tight leading-6 my-2">
          {post.body.slice(0, 240)}...
        </p>
      </div>
    </Link>
  )
}

function CardHalfL(post: Post) {
  return (
    <Link
      key={post.id}
      href={"/post/" + post.id}
      className="grid grid-cols-2 space-y-2 rounded-lg w-full shadow"
    >
      <XImage
        url={post.image}
        className="rounded-lg bg-muted transition-colors object-cover aspect-video"
      />
      <div className="p-4">
        <div className="flex justify-between text-sm text-muted-foreground px-2">
          <span>{post.source}</span>
          <span>{formatTime(post.date)}</span>
        </div>

        <h2 className="text-xl font-extrabold tracking-tighter leading-6 my-2">
          {post.head}
        </h2>
      </div>
    </Link>
  )
}

function CardHalfR(post: Post) {
  return (
    <Link
      key={post.id}
      href={"/post/" + post.id}
      className="grid grid-cols-2 space-y-2 rounded-lg w-full shadow"
    >
      <div className="p-4">
        <div className="flex justify-between text-sm text-muted-foreground px-2">
          <span>{post.source}</span>
          <span>{formatTime(post.date)}</span>
        </div>

        <h2 className="text-xl font-extrabold tracking-tighter leading-6 my-2">
          {post.head}
        </h2>
      </div>
      <XImage
        url={post.image}
        className="rounded-lg bg-muted transition-colors object-cover aspect-video"
      />
    </Link>
  )
}

export default function FeaturedFeed({ posts }: { posts: IFeaturedPost[] }) {
  if (posts.length !== 0)
    return (
      <>
        <CardFull {...posts[0].post} />
        <div className="grid grid-cols-2">
          {posts.slice(1, 3).map(({ post }) => (
            <CardHalfL {...post} />
          ))}
        </div>
        <div className="grid grid-cols-2">
          {posts.slice(3, 5).map(({ post }) => (
            <CardHalfR {...post} />
          ))}
        </div>
      </>
    )
  return null
}
