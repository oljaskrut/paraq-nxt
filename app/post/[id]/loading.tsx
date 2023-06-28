import { Skeleton } from "@/components/ui/skeleton"
import React from "react"

export default function loading() {
  return (
    <main className="container grid items-center justify-center gap-6 pb-8 pt-6 md:py-10">
      <div className="grid">
        <article className="group flex flex-col space-y-2 rounded-lg border shadow ">
          <Skeleton className="rounded-t-lg bg-muted transition-colors object-cover aspect-video" />
          <div className="p-4">
            <p className="text-sm text-muted-foreground text-justify w-full">
              <Skeleton className="w-1/2" />
            </p>
		
            <Skeleton className="w-1/2 my-2" />

            <p className="text-sm text-muted-foreground ">
              {[0, 1, 2].map((el) => (
                <Skeleton className="w-1/2 my-2" key={el} />
              ))}
            </p>
          </div>
        </article>
      </div>
    </main>
  )
}
