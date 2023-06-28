"use client"
import { X } from "lucide-react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

export default function CloseModal() {
  const router = useRouter()
  return (
    <Button
      aria-label="close modal"
      size="icon"
      variant="outline"
      onClick={() => router.back()}
      className="p-0 h-6 w-6"
    >
      <X className="h-4 w-4" />
    </Button>
  )
}
