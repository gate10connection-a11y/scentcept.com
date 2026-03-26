"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="ab-t">
      {/* 반응형 그리드: 모바일 2열, 데스크톱 4열 */}
      <div className="grid grid-cols-2 md:grid-cols-4">
        {/* 1열: 고객 서비스 (모바일 좌측) */}
        <div className="p-5 md:p-8 ab-r ab-b">
          <h3 className="text-[10px] tracking-[0.2em] uppercase mb-5">고객 서비스</h3>
          <ul className="space-y-3">
            {[
              { label: "문의하기", href: "/contact" },
              { label: "배송 안내", href: "/shipping" },
              { label: "반품 & 교환", href: "/returns" },
              { label: "사이즈 가이드", href: "/size-guide" },
              { label: "자주 묻는 질문", href: "/faq" },
            ].map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="text-[11px] text-gray-400 hover:text-black transition-colors duration-200">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 2열: 회사 (모바일 우측 — border-right 없음) */}
        <div className="p-5 md:p-8 md:ab-r ab-b">
          <h3 className="text-[10px] tracking-[0.2em] uppercase mb-5">회사</h3>
          <ul className="space-y-3">
            {[
              { label: "SCENTCEPT 소개", href: "/about" },
              { label: "채용", href: "/about" },
              { label: "언론 보도", href: "/about" },
              { label: "매장 찾기", href: "/contact" },
              { label: "지속가능성", href: "/sustainability" },
            ].map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="text-[11px] text-gray-400 hover:text-black transition-colors duration-200">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 3열: 팔로우 (모바일 좌측) */}
        <div className="p-5 md:p-8 ab-r ab-b">
          <h3 className="text-[10px] tracking-[0.2em] uppercase mb-5">팔로우</h3>
          <ul className="space-y-3">
            {["Instagram", "X (Twitter)", "Pinterest", "TikTok", "Spotify"].map((item) => (
              <li key={item}>
                <span className="text-[11px] text-gray-400 cursor-pointer hover:text-black transition-colors duration-200">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* 4열: 뉴스레터 (모바일 우측) */}
        <div className="p-5 md:p-8 ab-b">
          <h3 className="text-[10px] tracking-[0.2em] uppercase mb-5">뉴스레터</h3>
          <p className="text-[11px] text-gray-400 mb-5 leading-relaxed">
            신상품 및 할인 정보를<br className="hidden md:block" /> 이메일로 받아보세요.
          </p>
          <div className="flex border-b border-black pb-1">
            <input
              type="email"
              placeholder="이메일 주소"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 text-[11px] py-1 outline-none bg-transparent placeholder-gray-400 min-w-0"
            />
            <button
              className="text-[11px] py-1 pl-3 hover:opacity-40 transition-opacity duration-200 flex-shrink-0"
              aria-label="구독"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* 하단 바 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-5 md:px-8 py-5 gap-3">
        <p className="text-[10px] text-gray-400 tracking-wide">
          © {new Date().getFullYear()} SCENTCEPT. All rights reserved.
        </p>
        <div className="flex flex-wrap gap-4 md:gap-5">
          {["개인정보처리방침", "이용약관", "쿠키 설정", "접근성"].map((item) => (
            <span
              key={item}
              className="text-[10px] text-gray-400 cursor-pointer hover:text-black transition-colors duration-200 tracking-wide"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
