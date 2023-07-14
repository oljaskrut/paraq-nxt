"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCompletion } from "ai/react"
import { Loader2, Search } from "lucide-react"

export default function SloganGenerator() {
  const { completion, input, handleInputChange, handleSubmit, isLoading } =
    useCompletion()

  return (
    <main className="md:container grid items-center gap-6 md:pb-4 pt-6">
      <form onSubmit={handleSubmit} className="flex space-x-2 ">
        <Input
          placeholder="question AI"
          value={input}
          onChange={handleInputChange}
        />
        <Button variant="outline" type="submit">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </Button>
      </form>
      <div className="grid items-center justify-left max-w-3xl gap-4">
        <div className="whitespace-pre-wrap my-6">{completion}</div>
      </div>
    </main>
  )
}
