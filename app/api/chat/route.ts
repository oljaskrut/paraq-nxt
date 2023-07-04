// ./app/api/chat/route.ts
import { Configuration, OpenAIApi } from "openai-edge"
import { OpenAIStream, StreamingTextResponse } from "ai"
import { env } from "@/env.mjs"

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(config)

// IMPORTANT! Set the runtime to edge
export const runtime = "edge"

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { messages } = await req.json()

  // const context = await bigQ(messages[0].content, 2)

  const omsgs = messages.map((message: any) => ({
    content: message.content,
    role: message.role,
  }))

  // const msgs = [
  //   {
  //     role: "system",
  //     content: "This is possibly relevant context: " + JSON.stringify(context),
  //   },
  //   omsgs,
  // ]

  // console.log("GRD", msgs)

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: omsgs,
  })

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response)
  // Respond with the stream
  return new StreamingTextResponse(stream)
}
