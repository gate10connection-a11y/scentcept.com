import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { UserRole } from "@/lib/auth";

// ─────────────────────────────────────────────
// 미들웨어: 인증 및 권한 체크
//
// - /account/*  → 로그인 필요 (미로그인 시 /login으로)
// - /admin/*    → 관리자(admin) 역할 필요 (일반 사용자 접근 시 홈으로)
// ─────────────────────────────────────────────
export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;
    const role = token?.role as UserRole | undefined;

    // 관리자 경로: admin 역할만 허용
    if (pathname.startsWith("/admin")) {
      if (role !== "admin") {
        return NextResponse.redirect(new URL("/?reason=unauthorized", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // 토큰 존재 여부로 접근 허용 결정
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // 인증이 필요한 경로
        if (pathname.startsWith("/admin") || pathname.startsWith("/account")) {
          return !!token;
        }

        return true;
      },
    },
  }
);

// 미들웨어 적용 경로
export const config = {
  matcher: ["/admin/:path*", "/account/:path*"],
};
