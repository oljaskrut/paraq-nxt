import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Overview } from "./Overview"
import { prisma } from "@/lib/prisma"
import { thisMonth, thisWeek } from "@/lib/dayjs"
import { DatePickerWithRange } from "@/components/DatePickerWithRange"

export default async function Page() {
  const stats = (
    await prisma.feed.groupBy({
      by: ["date"],
      _count: {
        id: true,
      },
      _sum: {
        length: true,
      },
      orderBy: {
        date: "asc",
      },
      where: {
        date: {
          gte: thisWeek(),
        },
      },
    })
  ).map(({ _count: { id: count }, _sum: { length: count1 }, date }) => ({
    date,
    count,
    count1: count1 || 0,
  }))

  const totalPostCount = await prisma.post.count({
    where: {
      date: {
        gte: thisWeek(),
      },
    },
  })
  const totalFeedCount = await prisma.feed.count({
    where: {
      date: {
        gte: thisWeek(),
      },
    },
  })

  const avgPost = (totalPostCount / 7).toFixed(0)
  const avgFeed = (totalFeedCount / 7).toFixed(0)

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <span className="text-3xl font-bold">Weekly</span>
        <DatePickerWithRange />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{totalPostCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Feed Units</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{totalFeedCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Post per day</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{avgPost}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Feed per day</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{avgFeed}</div>
          </CardContent>
        </Card>
      </div>
      <div className="hidden md:grid">
        <Card className="">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview stats={stats} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
