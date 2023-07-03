"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Link2, MoreHorizontal } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import XImage from "@/components/x-image"
import { formatSimple } from "@/lib/dayjs"
import Link from "next/link"
import { toast } from "@/hooks/use-toast"
import { useMutation } from "@tanstack/react-query"
import { absoluteUrl, fetcher } from "@/lib/utils"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  head: string
  body: string
  image: string
  date: Date
  link: string
  source: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "head",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Head
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "body",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Body
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const body = row.getValue("body") as string
      const formatted = body.slice(0, 80) + "..."
      return (
        <div className="text-left font-medium">
          {body !== "" ? "true" : "false"}
        </div>
      )
    },
  },
  {
    accessorKey: "image",
    header: () => <div className="text-center">Image</div>,
    cell: ({ row }) => {
      const image = row.getValue("image") as string
      return (
        <div className="">
          <XImage url={image} className="aspect-video object-cover w-24" />
        </div>
      )
    },
  },
  {
    accessorKey: "date",
    header: () => <div className="text-center">Date</div>,
    cell: ({ row }) => {
      const date = row.getValue("date") as Date
      const formatted = formatSimple(date)
      return <div className="text-left">{formatted}</div>
    },
  },
  {
    accessorKey: "source",
    header: () => <div className="text-center">Source</div>,
  },
  {
    accessorKey: "link",
    header: () => <div className="text-center">Link</div>,
    cell: ({ row }) => {
      const link = row.getValue("link") as string

      return (
        <Link href={link}>
          <Link2 className="w-4 h-4" />
        </Link>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original

      const { mutate: addFeatured } = useMutation({
        mutationFn: async () => {
          return await fetcher("/api/featured", {
            method: "POST",
            body: JSON.stringify({ ...item }),
          })
        },
        onError: () =>
          toast({ title: "Error: not added", variant: "destructive" }),
        onSuccess: () => toast({ title: "Added: " + item.head.slice(0, 32) }),
      })

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => addFeatured()}>
              Add to Featured
            </DropdownMenuItem>
            {/* <DropdownMenuSeparator /> */}
            {/* <DropdownMenuItem>View customer</DropdownMenuItem> */}
            {/* <DropdownMenuItem>View payment details</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
