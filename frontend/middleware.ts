import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const path = req.nextUrl.pathname;

  const publicPaths = ["/login", "/verify"];
  const protectedPaths = ["/chat"];

  console.log("Middleware - Path:", path, "Token exists:", !!token);

  // If user is logged in and tries to access login/verify, redirect to chat
  if (token && publicPaths.includes(path)) {
    console.log("Redirecting logged-in user to /chat");
    return NextResponse.redirect(new URL("/chat", req.url));
  }

  // If user is NOT logged in and tries to access protected routes, redirect to login
  if (!token && protectedPaths.includes(path)) {
    console.log("Redirecting logged-out user to /login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/verify", "/chat"],
};