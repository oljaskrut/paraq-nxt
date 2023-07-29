import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"

export default async function Home() {
  return (
    <main className="md:container grid items-center gap-6 md:pb-4 pt-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/feed">
          <Card>
            <CardHeader>
              <CardTitle>Feed</CardTitle>
              <CardDescription>Hide feed items</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/search">
          <Card>
            <CardHeader>
              <CardTitle>Search</CardTitle>
              <CardDescription>Use semantic search</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/dash">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Dash</CardTitle>
              <CardDescription>Dashboard of weekly activity</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/dash2">
          <Card>
            <CardHeader>
              <CardTitle>Daily Dash</CardTitle>
              <CardDescription>Dashboard of Daily activity</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/ai/2">
          <Card>
            <CardHeader>
              <CardTitle>GPT 2.0</CardTitle>
              <CardDescription>
                Latest GPT based on site content
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/ai" className="opacity-50">
          <Card>
            <CardHeader>
              <CardTitle>GPT 1.0</CardTitle>
              <CardDescription>
                Depreciated: GPT based on post content
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/category" className="opacity-50">
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
              <CardDescription>
                Depreciated: categories dashboard
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/dashboard" className="opacity-50">
          <Card>
            <CardHeader>
              <CardTitle>Table</CardTitle>
              <CardDescription>Depreciated: Table view</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/featured" className="opacity-50">
          <Card>
            <CardHeader>
              <CardTitle>Featured</CardTitle>
              <CardDescription>Depreciated: Configure Featured</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </main>
  )
}
