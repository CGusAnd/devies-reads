import { NextRequest, NextResponse } from "next/server";

const authRoutes = ["/user/*"];
const pubRoutes = ["/login/*", "/register/*"];

function matchesWildcard(path: string, pattern: string): boolean {
  if (pattern.endsWith("/*")) {
    const basePattern = pattern.slice(0, -2);
    return path.startsWith(basePattern);
  }
  return path === pattern;
}

function deleteCookiesAndRedirect(url: string) {
  const response = NextResponse.redirect(url);
  response.cookies.delete("session");
  response.cookies.delete("userData");
  return response;
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("session");
  if (
    authRoutes.some((pattern) =>
      matchesWildcard(request.nextUrl.pathname, pattern)
    )
  ) {
    if (!token)
      return deleteCookiesAndRedirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/login`
      );
  }

  if (
    pubRoutes.some((pattern) =>
      matchesWildcard(request.nextUrl.pathname, pattern)
    )
  ) {
    // Already logged in - redirect to home
    if (token)
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}`);
  }

  return NextResponse.next();
}
