"use client"

import XImage from "@/components/x-image"
import { formatTime } from "@/lib/dayjs"
import useSWR, { KeyedMutator } from "swr"
import useSWRInfinite from "swr/infinite"

import { cn, fetcher } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import { Feed } from "@prisma/client"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { toast } from "@/hooks/use-toast"
import Link from "next/link"
import { Button } from "./ui/button"

function Wrapper({
  post,
  children,
  className,
  mutate,
}: {
  post: Feed
  className: string
  children: React.ReactNode
  mutate: KeyedMutator<Feed[][]>
}) {
  const { id, head, hidden } = post

  async function toggleShow() {
    try {
      await mutate(
        async (data) => {
          const item = (await fetcher("/api/feed", {
            method: "PATCH",
            body: JSON.stringify({ id, hidden: !hidden }),
          })) as Feed
          return (
            data?.map((ar) => ar.map((el) => (el.id === id ? item : el))) ?? []
          )
        },
        {
          optimisticData: (data) =>
            data?.map((ar) =>
              ar.map((el) => (el.id === id ? { ...el, hidden: !hidden } : el)),
            ) ?? [],

          rollbackOnError: true,
          populateCache: true,
          revalidate: false,
        },
      )
      toast({ title: "Toggled: " + head })
    } catch (e) {
      toast({ title: "Error: not toggled " + head, variant: "destructive" })
    }
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger className={className}>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={() => toggleShow()}>
          {hidden ? "Show" : "Hide"}
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default function FeedAllX({ feed }: { feed: Feed[] }) {
  // const { data, mutate, isLoading } = useSWR<Feed[]>("/api/feed", fetcher, {
  //   fallbackData: feed,
  //   revalidateOnFocus: false,
  // })

  const { data, mutate, isLoading, setSize, size, isValidating } =
    useSWRInfinite<Feed[]>(
      (pageIndex, previousPageData) => {
        console.log({ pageIndex, previousPageData })
        if (pageIndex === 0) return `/api/feed`
        return `/api/feed?cursor=${previousPageData.at(-1).hash}&limit=10`
      },
      fetcher,
      {
        fallbackData: [feed],
        revalidateOnFocus: false,
      },
    )

  console.log({ size })
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data?.flat().map((item) => (
          <Wrapper post={item} className="" mutate={mutate} key={item.id}>
            <Link
              href={
                item.length > 2 ? `/group/${item.id}` : `/post/${item.hash}`
              }
              key={item.id}
              className={cn(
                "group flex flex-col space-y-2 rounded-lg border shadow",
                item.length > 2 && "shadow-cyan-500 shadow-md",
                item.hidden && "opacity-10",
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
        )) ?? null}
      </div>
      {isLoading || (
        <Button onClick={() => setSize(size + 1)} loading={isValidating}>
          Load More
        </Button>
      )}
    </>
  )
}
