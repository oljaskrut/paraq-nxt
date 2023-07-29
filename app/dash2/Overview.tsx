"use client"

import { formatDateX } from "@/lib/dayjs"
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"

export function Overview({
  stats,
}: {
  stats: { date: Date; count: number; count1: number }[]
}) {
  const restats = stats.map((el) => ({
    ...el,
    date: formatDateX(el.date).split(":")[0],
  }))
  // .filter(({ date }) => date > "2023-07-01")
  // .sort((a, b) => (a.date > b.date ? 1 : -1))

  let gcl = new Map()

  for (const { count, count1, date } of restats) {
    if (gcl.has(date)) {
      gcl.get(date).count += count
      gcl.get(date).count1 += count1
    } else {
      gcl.set(date, { date, count, count1 })
    }
  }

  const gata = Array.from(gcl.values())

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={gata}>
        <XAxis
          dataKey="date"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(tick) => tick.split(" ")[1]}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickCount={8}
        />
        <Bar dataKey="count1" fill="#9d396d" radius={[4, 4, 0, 0]} />
        <Bar dataKey="count" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
