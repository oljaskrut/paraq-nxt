import { Configuration, OpenAIApi } from "openai-edge"
import { OpenAIStream, StreamingTextResponse } from "ai"
import { bigQ } from "@/lib/ai"

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(config)

// Set the runtime to edge for best performance

export async function POST(req: Request) {
  const { prompt } = await req.json()

  if (!prompt || prompt.length < 4)
    return new Response("prompt too short", { status: 400 })

  console.time("first")
  const res = await bigQ(prompt, 3)
  console.timeEnd("first")

  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    temperature: 0.33,
    messages: [
      {
        role: "system",
        content:
          "You are journalist, given semantically similar news articles, Give concise, summarized, relevant, true answer in plain russian text. Mention source and date if relevant. Articles in JSON format: " +
          JSON.stringify(res) +
          "\n",
      },

      { role: "user", content: prompt },
    ],
  })
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response)
  // Respond with the stream
  return new StreamingTextResponse(stream)
}
