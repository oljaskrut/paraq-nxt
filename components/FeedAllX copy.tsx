"use client"

import XImage from "@/components/x-image"
import { cn, fetcher, formatTimeToNow } from "@/lib/utils"
import Link from "next/link"

import useSWR from "swr"

import { Feed } from "@prisma/client"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { toast } from "@/hooks/use-toast"
import { useMutation } from "@tanstack/react-query"

function Wrapper({
  post,
  children,
  className,
}: {
  post: Feed
  className: string
  children: React.ReactNode
}) {
  const { id, head, hidden } = post

  const { mutate } = useMutation({
    mutationFn: async () => {
      return await fetcher("/api/feed", {
        method: "PATCH",
        body: JSON.stringify({ id, hidden: !hidden }),
      })
    },
    onError: () =>
      toast({ title: "Error: not toggled", variant: "destructive" }),
    onSuccess: () => toast({ title: "Toggled: " + head.slice(0, 32) }),
  })

  return (
    <ContextMenu>
      <ContextMenuTrigger className={className}>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={() => mutate()}>
          {hidden ? "Show" : "Hide"}
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

function Card(item: Feed) {
  if (!item) return null
  return (
    <Wrapper post={item} className="">
      <Link
        href={item.length > 2 ? `/group/${item.id}` : `/post/${item.hash}`}
        key={item.id}
        className={cn(
          "group flex flex-col space-y-2 rounded-lg border shadow",
          item.length > 2 && "shadow-cyan-500 shadow-md",
          item.hidden && "bg-red-500",
        )}
      >
        <XImage
          url={item.image}
          className="rounded-t-lg bg-muted transition-colors object-cover aspect-video"
        />
        <div className="p-4">
          <div className="flex justify-between text-sm text-muted-foreground px-2">
            <span>{item.source}</span>

            <span>who cares</span>
          </div>

          <div className="flex flex-col items-end justify-between">
            <h2 className="flex text-2xl font-extrabold tracking-tighter leading-6 my-2">
              {item.head}
            </h2>

            {item.length > 2 && <span>еще {item.length} похожих</span>}
          </div>
        </div>
      </Link>
    </Wrapper>
  )
}

export default async function FeedAllX({ feed }: { feed: Feed[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {feed.map((item) => (
        <Card {...item} key={item.id} />
      ))}
    </div>
  )
}
