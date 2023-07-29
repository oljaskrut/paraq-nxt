"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import XImage from "@/components/x-image"
import { formatDate, formatTime } from "@/lib/dayjs"
import { fetcher } from "@/lib/utils"
import { Post } from "@prisma/client"
import { Loader2, Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import useSWR from "swr"

type XPost = Post & { score: number }

export default function page() {
  const { data, mutate, isLoading } = useSWR<XPost[]>("/api/iqos", {
    fallbackData: [],
  })

  const [ll, setLl] = useState(false)

  const [searchInput, setSearchInput] = useState("")

  async function ss() {
    const data = (await fetcher("/api/iqos", {
      method: "POST",
      body: JSON.stringify({ search: searchInput }),
    })) as XPost[]
    console.log(data)
    return data
  }

  async function search() {
    setLl(true)
    await mutate(ss)
    setLl(false)
  }
  return (
    <main className="md:container grid items-center gap-6 md:pb-4 pt-6">
      <form
        className="flex space-x-2 mb-4"
        onSubmit={(e) => {
          e.preventDefault()
          search()
        }}
      >
        <Input
          placeholder="Vector Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Button variant="outline" type="submit">
          {isLoading || ll ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </Button>
      </form>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data!.map((item) => (
          <Link
            href={`/post/${item.hash}`}
            key={item.id}
            className="group flex flex-col space-y-2 rounded-lg border shadow"
          >
            <XImage
              url={item.image}
              className="rounded-t-lg bg-muted transition-colors object-cover aspect-video"
            />
            <div className="p-4">
              <div className="flex justify-between text-sm text-muted-foreground px-2">
                <span>{item.source}</span>

                <span>{formatDate(item.date)}</span>
              </div>

              <div className="flex flex-col items-end justify-between">
                <h2 className="flex text-2xl font-extrabold tracking-tighter leading-6 my-2">
                  {item.head}
                </h2>

                <span>{(item.score * 100).toFixed(2)}%</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
