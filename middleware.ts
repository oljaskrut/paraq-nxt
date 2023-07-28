import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
  // publicRoutes: ["/", "/post(.*)", "/dashboard", "/api/feed(.*)"],
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
