import { NextRequest, NextResponse } from "next/server";
import supabase from "./config/client";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const checkSession = async () => {
    const { data: session, error } = await supabase.auth.getSession();
    return session && !error;
  };

  if (pathname.startsWith("/myShop")) {
    const isAuthenticated = await checkSession();

    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  } else {
    const isAuthenticated = await checkSession();

    console.log(isAuthenticated);

    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/myShop", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/myShop/:path*"],
};
