import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistanceToNowStrict, subHours } from "date-fns"
import locale from "date-fns/locale/en-US"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const formatDistanceLocale = {
  lessThanXSeconds: "just now",
  xSeconds: "just now",
  halfAMinute: "just now",
  lessThanXMinutes: "{{count}}m",
  xMinutes: "{{count}}m",
  aboutXHours: "{{count}}h",
  xHours: "{{count}}h",
  xDays: "{{count}}d",
  aboutXWeeks: "{{count}}w",
  xWeeks: "{{count}}w",
  aboutXMonths: "{{count}}m",
  xMonths: "{{count}}m",
  aboutXYears: "{{count}}y",
  xYears: "{{count}}y",
  overXYears: "{{count}}y",
  almostXYears: "{{count}}y",
}

function formatDistance(token: string, count: number, options?: any): string {
  options = options || {}

  const result = formatDistanceLocale[
    token as keyof typeof formatDistanceLocale
  ].replace("{{count}}", count.toString())

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return "in " + result
    } else {
      if (result === "just now") return result
      return result + " ago"
    }
  }

  return result
}

export function formatTimeToNow(date: Date): string {
  return formatDistanceToNowStrict(subHours(date, 6), {
    addSuffix: true,
    locale: {
      ...locale,
      formatDistance,
    },
  })
}

export function absoluteUrl(path: RequestInfo | URL) {
  return process.env.NODE_ENV === "production"
    ? path
    : `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

export const fetcher = <T>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
): Promise<T> => fetch(input, init).then((res) => res.json())

export const sfetcher = <T>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
): Promise<T> => fetch(absoluteUrl(input), init).then((res) => res.json())
