"use client"
import { X } from "lucide-react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

export default function CloseModal({ className }: { className?: string }) {
  const router = useRouter()
  return (
    <Button
      aria-label="close modal"
      size="icon"
      variant="outline"
      onClick={() => router.back()}
      className={cn("p-0 h-6 w-6", className)}
    >
      <X className="h-4 w-4" />
    </Button>
  )
}
