"use client"

import { FeaturedPost } from "@prisma/client"
import XImage from "@/components/x-image"
import { formatTime } from "@/lib/dayjs"
import useSWR from "swr"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { toast } from "@/hooks/use-toast"
import { fetcher } from "@/lib/utils"

function Wrapper({
  post,
  children,
  className,
}: {
  post: FeaturedPost
  children: React.ReactNode
  className: string
}) {
  const { data, mutate } = useSWR<FeaturedPost[]>("/api/featured")

  async function toggleS() {
    const item = (await fetcher("/api/featured", {
      method: "PATCH",
      body: JSON.stringify({ id: post.id, hidden: !post.hidden }),
    })) as FeaturedPost
    return data?.map((el) => (el.id === item.id ? item : el))
  }
  async function deleteF() {
    const item = (await fetcher("/api/featured", {
      method: "PUT",
      body: JSON.stringify({ id: post.id }),
    })) as FeaturedPost
    return data?.filter((el) => el.id !== item.id)
  }

  async function toggleShow() {
    try {
      await mutate(toggleS, {
        optimisticData: data?.map((el) =>
          el.id === post.id ? { ...el, hidden: !post.hidden } : el,
        ),
        rollbackOnError: true,
        populateCache: true,
        revalidate: false,
      })
      toast({ title: "Toggled" })
    } catch (e) {
      toast({ title: "Error: not toggle", variant: "destructive" })
    }
  }

  async function deleteFeatured() {
    try {
      await mutate(deleteF, {
        optimisticData: data?.filter((el) => el.id !== post.id),
        rollbackOnError: true,
        populateCache: true,
        revalidate: false,
      })
      toast({ title: "Deleted" })
    } catch (e) {
      toast({ title: "Error: not deleted", variant: "destructive" })
    }
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger className={className}>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={() => toggleShow()}>
          {post.hidden ? "Show" : "Hide"}
        </ContextMenuItem>
        <ContextMenuItem onClick={() => deleteFeatured()}>
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

function CardFull(post: FeaturedPost) {
  return (
    <Wrapper
      post={post}
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
    </Wrapper>
  )
}

function CardHalfL(post: FeaturedPost) {
  return (
    <Wrapper
      post={post}
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
    </Wrapper>
  )
}

function CardHalfR(post: FeaturedPost) {
  return (
    <Wrapper
      post={post}
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
    </Wrapper>
  )
}

function CardHalfT(post: FeaturedPost) {
  return (
    <Wrapper
      post={post}
      className="group flex flex-col space-y-2 rounded-lg border shadow "
    >
      <XImage
        url={post.image}
        className="rounded-t-lg bg-muted transition-colors object-cover aspect-video"
      />
      <div className="p-4">
        <div className="flex justify-between text-sm text-muted-foreground px-2">
          <span>{post.source}</span>
          <span>{formatTime(post.date)}</span>
        </div>

        <h2 className="text-2xl font-extrabold tracking-tighter leading-6 my-2">
          {post.head}
        </h2>
      </div>
    </Wrapper>
  )
}

export default function FeaturedFeedX({ posts }: { posts: FeaturedPost[] }) {
  const { data } = useSWR<FeaturedPost[]>("/api/featured", fetcher, {
    fallbackData: posts,
  })

  const showed = data?.filter((el) => !el.hidden) ?? []
  const unshowed = data?.filter((el) => el.hidden) ?? []

  return (
    <>
      <div className="flex flex-col items-start justify-center gap-4">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl mb-2">
          Featured
        </h1>

        <CardFull {...showed[0]} />
        <div className="grid grid-cols-2">
          {data!
            .filter((el) => !el.hidden)
            .slice(1, 3)
            .map((el: any) => (
              <CardHalfL {...el} />
            ))}
        </div>
        <div className="grid grid-cols-2">
          {showed.slice(3, 5).map((el: any) => (
            <CardHalfR {...el} />
          ))}
        </div>
      </div>

      <hr className="my-8" />
      <h1 className="text-2xl font-bold leading-tight tracking-tighter md:text-4xl mb-2">
        Unshowed
      </h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...showed.slice(5), ...unshowed].map((el) => (
          <CardHalfT {...el} />
        ))}
      </div>
    </>
  )
}
