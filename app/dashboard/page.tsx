import { prisma } from "@/lib/prisma"
import { columns } from "./columns"
import { DataTable } from "./data-table"

export default async function DemoPage() {
  const data = await prisma.post.findMany({
    orderBy: { date: "desc" },
    take: 100,
  })

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
