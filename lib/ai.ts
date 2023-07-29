import { env } from "@/env.mjs"

import { Configuration, OpenAIApi } from "openai"
const configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

// export async function summarize(body: string) {
//   try {
//     if (body === "") return ""

//     const { data } = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: [
//         {
//           role: "system",
//           content:
//             "Summarize into 30 words text of news articles provided by user, in russian",
//         },
//         { role: "user", content: body.slice(0, 2500) },
//       ],
//     })

//     console.log(
//       "m$",
//       (
//         (data.usage?.prompt_tokens ?? 0) * 0.0015 +
//         (data.usage?.completion_tokens ?? 0) * 0.002
//       ).toFixed(2),
//     )

//     return data.choices[0].message?.content ?? ""
//   } catch (error: any) {
//     if (error.response) {
//       console.log(error.response.status)
//       console.log(error.response.data)
//     } else {
//       console.log(error.message)
//     }
//     return ""
//   }
// }

export async function answer(question: string, context: any) {
  try {
    if (question === "") return ["", 0]

    const { data } = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are journalist, given news articles with simillar embeddings you have to answer question using articles if relevant, in russian. When answering mention source,time,date,location. Try to give latest info, if date not specified. Articles in JSON format: " +
            JSON.stringify(context),
        },
        { role: "user", content: question },
      ],
    })

    const cost = (
      (data.usage?.prompt_tokens ?? 0) * 0.0015 +
      (data.usage?.completion_tokens ?? 0) * 0.002
    ).toFixed(2)

    return [data.choices[0].message?.content ?? "", cost]
  } catch (error: any) {
    if (error.response) {
      console.log(error.response.status)
      console.log(error.response.data)
    } else {
      console.log(error.message)
    }
    return ["", 0]
  }
}

export async function embed(body: string) {
  try {
    if (body === "") return []

    const { data } = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: body,
    })

    // console.log("m$", ((data.usage?.prompt_tokens ?? 0) * 0.0001).toFixed(2))

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
    orderBy: { date: "desc" },
    select: {
      hash: true,
      body: true,
      source: true,
      date: true,
      link: true,
    },
  })

  const rat = data.map(({ id, score }) => ({
    score,
    ...posts.find((l) => l.hash === id),
  }))

  return rat
}

export async function bigQ2(input: string, take = 20) {
  const data = await query(input, take)
  const posts = await prisma.post.findMany({
    where: { hash: { in: data.map((el) => el.id) } },
    orderBy: { date: "desc" },
  })

  const rat = posts.map((el) => ({
    ...el,
    score: data.find((l) => l.id === el.hash)?.score ?? 0,
  }))

  return rat
}
