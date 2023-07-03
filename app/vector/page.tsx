import { bigQ } from "@/lib/ai"

export default async function page() {
  const posts = await bigQ("celebrity")
  return (
    <div className="flex flex-col">
      {posts.map((el) => (
        <div className="p-4">
          <p>{el.score}</p>
          <p>{el.head}</p>
          <p>{el.body}</p>
        </div>
      ))}
    </div>
  )
}
