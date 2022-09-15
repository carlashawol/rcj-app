import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const { pathname, origin } = req.nextUrl;

  if (
    !pathname.startsWith("/api/auth") &&
    !pathname.startsWith("/auth/signin")
  ) {
    const token = await getToken({ req });

  
  }

  return NextResponse.next();
}
