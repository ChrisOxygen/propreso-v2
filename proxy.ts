import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@/shared/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
  const { supabase, supabaseResponse } = createMiddlewareClient(request);

  // Refresh the session — MUST be called before any redirect checks.
  // This keeps the user's session alive and syncs the cookie.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Redirect unauthenticated users away from protected routes
  if (
    !user &&
    (pathname.startsWith("/dashboard") || pathname.startsWith("/onboarding"))
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users away from auth pages
  if (user && (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up"))) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all routes except:
     * - _next/static  (static files)
     * - _next/image   (image optimisation)
     * - favicon.ico
     * - public/assets (brand assets, images)
     * - api/          (route handlers handle their own auth)
     */
    "/((?!_next/static|_next/image|favicon.ico|assets/|api/).*)",
  ],
};
