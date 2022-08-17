import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req) {
  const { pathname, origin } = req.nextUrl;

  if (
    !pathname.startsWith("/api/auth") &&
    !pathname.startsWith("/auth/signin")
  ) {
    const token = await getToken({ req });

    if (!token) {
      return NextResponse.redirect(`${origin}/auth/signin`);
    }
  }

  return NextResponse.next();
}
