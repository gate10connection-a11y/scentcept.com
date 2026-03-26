import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// ─────────────────────────────────────────────
// 사용자 역할 타입
// ─────────────────────────────────────────────
export type UserRole = "user" | "admin";

// 관리자 이메일 목록 (쉼표 구분, 환경변수로 관리)
// .env.local에 ADMIN_EMAILS=admin@example.com,another@example.com 형식으로 추가
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "")
  .split(",")
  .map((e) => e.trim())
  .filter(Boolean);

// ─────────────────────────────────────────────
// DB 자격증명 검증 함수
//
// TODO: 실제 운영 시 아래 단계로 교체:
//   1. Sanity: sanityClient.fetch('*[_type == "user" && email == $email][0]', { email })
//   2. Prisma: prisma.user.findUnique({ where: { email } })
//   3. Supabase: supabase.from('users').select().eq('email', email).single()
//   4. 비밀번호: bcrypt.compare(password, user.passwordHash)
// ─────────────────────────────────────────────
async function verifyUserCredentials(
  email: string,
  password: string
): Promise<{ id: string; email: string; name: string; role: UserRole } | null> {
  // 입력값 기본 검증
  if (!email || !password || password.length < 6) return null;

  // ⚠️ 현재 데모 모드: 이메일/비밀번호 조합이 있으면 허용
  // 실제 운영 시 아래 주석을 해제하고 위 TODO 참고하여 구현
  /*
  const user = await db.user.findUnique({ where: { email } });
  if (!user || !user.passwordHash) return null;
  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) return null;
  return {
    id: user.id,
    email: user.email,
    name: user.name ?? email.split("@")[0],
    role: user.role as UserRole,
  };
  */

  const role: UserRole = ADMIN_EMAILS.includes(email) ? "admin" : "user";
  return {
    id: email,
    email,
    name: email.split("@")[0],
    role,
  };
}

// ─────────────────────────────────────────────
// NextAuth 설정
// ─────────────────────────────────────────────
export const authOptions: NextAuthOptions = {
  providers: [
    // Google OAuth 로그인
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),

    // 이메일/비밀번호 로그인
    CredentialsProvider({
      name: "이메일",
      credentials: {
        email: { label: "이메일", type: "email", placeholder: "you@example.com" },
        password: { label: "비밀번호", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        return verifyUserCredentials(credentials.email, credentials.password);
      },
    }),
  ],

  // 커스텀 페이지 경로
  pages: {
    signIn: "/login",
  },

  // JWT 세션 전략
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30일
  },

  callbacks: {
    // JWT 토큰에 id, role 추가
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role =
          (user as { role?: UserRole }).role ??
          (ADMIN_EMAILS.includes(user.email ?? "") ? "admin" : "user");
      }
      return token;
    },

    // 세션 객체에 id, role 노출
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string; role?: UserRole }).id = token.id as string;
        (session.user as { id?: string; role?: UserRole }).role = token.role as UserRole;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
