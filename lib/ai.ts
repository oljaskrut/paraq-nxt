import { env } from "@/env.mjs"

import { Configuration, OpenAIApi } from "openai"
const configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export async function embed(body: string) {
  try {
    if (body === "") return []

    const { data } = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: body,
    })

    console.log("m$", ((data.usage?.prompt_tokens ?? 0) * 0.0001).toFixed(2))

    return data.data[0].embedding
  } catch (error: any) {
    if (error.response) {
      console.log(error.response.status)
      console.log(error.response.data)
    } else {
      console.log(error.message)
    }
    return []
  }
}

import { PineconeClient } from "@pinecone-database/pinecone"
import { prisma } from "./prisma"

const pinecone = new PineconeClient()
const initConfig = {
  environment: "us-west1-gcp-free",
  apiKey: env.PINECONE_API_KEY,
}

export async function query(text: string, topK = 5) {
  try {
    await pinecone.init(initConfig)
    const index = pinecone.Index("paraq")

    const vector = await embed(text)

    const queryRequest = {
      topK,
      vector,
    }

    const res = await index.query({ queryRequest })

    return res.matches?.map(({ id, score }) => ({ id, score })) ?? []
  } catch (e) {
    console.log(e)
    return []
  }
}

export async function bigQ(input: string, take = 5) {
  const data = await query(input, take)
  const posts = await prisma.post.findMany({
    where: { hash: { in: data.map((el) => el.id) } },
  })

  const rat = data.map(({ id, score }) => ({
    score,
    ...posts.find((l) => l.hash === id),
  }))

  return rat
}
