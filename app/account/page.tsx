"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { UserRole } from "@/lib/auth";

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // 세션 로딩 중
  if (status === "loading") {
    return (
      <div>
        <div className="flex items-center px-6 md:px-10 h-[44px] ab-b">
          <span style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" }}>계정</span>
        </div>
        <div className="text-center py-24">
          <p className="text-[12px] text-gray-400">로딩 중...</p>
        </div>
      </div>
    );
  }

  // 미로그인 → /login으로
  if (!session) {
    router.push("/login");
    return null;
  }

  const userRole = (session.user as { role?: UserRole })?.role;
  const isAdmin = userRole === "admin";

  const menuItems = [
    { label: "주문 내역", desc: "주문 내역을 확인합니다", href: "/order-confirmation?demo=true" },
    { label: "배송지 관리", desc: "배송 주소를 관리합니다", href: "#" },
    { label: "위시리스트", desc: "저장된 상품을 확인합니다", href: "/collections" },
    // 관리자인 경우 관리자 대시보드 메뉴 추가
    ...(isAdmin ? [{ label: "관리자 대시보드", desc: "상품·주문·회원을 관리합니다", href: "/admin" }] : []),
  ];

  return (
    <div>
      <div className="flex items-center justify-between px-6 md:px-10 h-[44px] ab-b">
        <span style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" }}>내 계정</span>
        {isAdmin && (
          <span className="text-[9px] tracking-[0.15em] uppercase bg-black text-white px-2 py-0.5">관리자</span>
        )}
      </div>

      <div className="max-w-[600px] mx-auto px-6 py-16">
        {/* 프로필 */}
        <div className="flex items-center gap-5 mb-10 pb-10 ab-b">
          {session.user?.image ? (
            <Image
              src={session.user.image}
              alt="프로필"
              width={56}
              height={56}
              className="rounded-full"
            />
          ) : (
            <div className="w-14 h-14 bg-black text-white flex items-center justify-center text-[16px] font-medium rounded-full">
              {(session.user?.name || session.user?.email || "U")[0].toUpperCase()}
            </div>
          )}
          <div>
            <p className="text-[14px] font-medium">{session.user?.name || "사용자"}</p>
            <p className="text-[12px] text-gray-400 mt-1">{session.user?.email}</p>
          </div>
        </div>

        {/* 메뉴 */}
        <div className="space-y-0">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center justify-between py-5 ab-b hover:bg-gray-50 transition-colors px-4 -mx-4"
            >
              <div>
                <p className="text-[12px]">{item.label}</p>
                <p className="text-[11px] text-gray-400 mt-1">{item.desc}</p>
              </div>
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>

        {/* 로그아웃 */}
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full h-12 mt-10 text-[10px] tracking-[0.2em] uppercase ab hover:bg-black hover:text-white transition-all duration-200"
        >
          로그아웃
        </button>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-[10px] tracking-[0.15em] uppercase text-gray-400 hover:text-black transition-colors"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
