"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useChat } from "ai/react"

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat()

  return (
    <div className="flex flex-col w-full max-w-md mx-auto stretch">
      <form onSubmit={handleSubmit} className="mb-8 mt-12">
        <div className="flex space-x-2">
          <Input
            value={input}
            className="w-64"
            placeholder="Say something..."
            onChange={handleInputChange}
          />
          <Button variant="outline" loading={isLoading}>
            Ask
          </Button>
        </div>
      </form>
      {messages.length > 0
        ? messages.map((m) => (
            <div key={m.id} className="whitespace-pre-wrap">
              {m.role === "user" ? "User: " : "AI: "}
              {m.content}
            </div>
          ))
        : null}
    </div>
  )
}
