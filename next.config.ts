import type { NextConfig } from "next";

// ─────────────────────────────────────────────
// NEXTAUTH_URL 자동 감지
// - 로컬 개발: http://localhost:3000
// - Vercel 배포: https://{VERCEL_URL} 자동 설정
// - 프로덕션: NEXTAUTH_URL 환경변수 직접 지정
// ─────────────────────────────────────────────
if (!process.env.NEXTAUTH_URL) {
  if (process.env.VERCEL_URL) {
    // Vercel이 자동으로 주입하는 배포 URL
    process.env.NEXTAUTH_URL = `https://${process.env.VERCEL_URL}`;
  } else {
    // 로컬 개발 환경
    process.env.NEXTAUTH_URL = "http://localhost:3000";
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
