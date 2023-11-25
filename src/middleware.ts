// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { authentication } from "next-firebase-auth-edge/lib/next/middleware";

const PUBLIC_PATHS = ["/register", "/login", "/reset-password"];

function redirectToHome(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = "/";
  url.search = "";
  return NextResponse.redirect(url);
}

function redirectToLogin(request: NextRequest) {
  if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/login";
  url.search = `redirect=${request.nextUrl.pathname}${url.search}`;
  return NextResponse.redirect(url);
}

export async function middleware(request: NextRequest) {
  if (
    !process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
    !process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL ||
    !process.env.FIREBASE_ADMIN_PRIVATE_KEY ||
    !process.env.NEXT_PUBLIC_FIREBASE_API_KEY
  ) {
    throw new Error("Missing environment variable");
  }
  return authentication(request, {
    loginPath: "/api/login",
    logoutPath: "/api/logout",
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    cookieName: "AuthToken",
    cookieSerializeOptions: {
      path: "/",
      httpOnly: true,
      secure: false, // set to 'true' on https environments
      sameSite: "lax",
      maxAge: 12 * 60 * 60 * 24, // twelve days
    },
    cookieSignatureKeys: ["secret1", "secret2"],
    serviceAccount: {
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
    },
    handleValidToken: async ({ token, decodedToken }, headers) => {
      return NextResponse.next({
        request: {
          headers, // Pass modified request headers to skip token verification in subsequent getTokens and getTokensFromObject calls
        },
      });
    },
    handleInvalidToken: async () => {
      return redirectToLogin(request);
    },
    handleError: async (error) => {
      console.error("Unhandled authentication error", { error });
      return redirectToLogin(request);
    },
  });
}

export const config = {
  matcher: [
    "/",
    "/test/",
    "/((?!_next|favicon.ico|api|.*\\.).*)",
    "/api/login",
    "/api/logout",
  ],
};
