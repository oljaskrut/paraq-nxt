"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn, fetcher } from "@/lib/utils"
import { Sparkles } from "lucide-react"
import { useMemo, useState } from "react"
import useSWR from "swr"

interface XRes {
  answer: string
  cost: number
}

export default function page() {
  const { data, mutate, isLoading, isValidating } = useSWR<XRes>("/api/iqos")

  const [ll, setLl] = useState(false)

  const loading = useMemo(
    () => isLoading || isValidating || ll,
    [isLoading, isValidating, ll],
  )

  const [searchInput, setSearchInput] = useState("")

  async function ss() {
    const data = (await fetcher("/api/ai", {
      method: "POST",
      body: JSON.stringify({ search: searchInput }),
    })) as XRes
    return data
  }

  async function search() {
    setLl(true)
    await mutate(ss)
    setLl(false)
  }
  return (
    <main className="md:container grid items-center gap-6 md:pb-4 pt-6">
      <div className="flex space-x-2 ">
        <Input
          placeholder="question AI"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Button variant="outline" onClick={search}>
          <Sparkles
            className={cn("h-6 w-6 ", loading && "animate-pulse text-cyan-300")}
          />
        </Button>
      </div>
      <div className="grid items-center justify-center max-w-3xl gap-4">
        <div className="flex flex-col p-4">
          <p className="text-lg">{data?.answer}</p>
          {data?.cost && data?.cost !== 0 && (
            <p className=" text-red-300 mt-2">{data.cost} m$</p>
          )}
        </div>
      </div>
    </main>
  )
}
