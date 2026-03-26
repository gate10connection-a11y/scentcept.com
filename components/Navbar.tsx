"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";

const border = "1px solid #e0e0e0";

// ─────────────────────────────────────────────
// 메가 메뉴 데이터
// key는 navItems label과 일치해야 함
// ─────────────────────────────────────────────
const megaMenuData: Record<string, { title: string; links: { label: string; href: string }[] }[]> = {
  "WOMEN": [
    { title: "의류", links: [
      { label: "코트 & 자켓", href: "/women?cat=Outerwear" },
      { label: "상의", href: "/women?cat=Tops" },
      { label: "니트", href: "/women?cat=Tops" },
      { label: "바지", href: "/women?cat=Bottoms" },
      { label: "데님", href: "/women?cat=Bottoms" },
    ]},
    { title: "신발", links: [
      { label: "부츠", href: "/women?cat=Footwear" },
      { label: "스니커즈", href: "/women?cat=Footwear" },
      { label: "힐", href: "/women?cat=Footwear" },
    ]},
  ],
  "MEN": [
    { title: "의류", links: [
      { label: "코트 & 자켓", href: "/men?cat=Outerwear" },
      { label: "상의", href: "/men?cat=Tops" },
      { label: "니트", href: "/men?cat=Tops" },
      { label: "바지", href: "/men?cat=Bottoms" },
      { label: "데님", href: "/men?cat=Bottoms" },
    ]},
    { title: "신발", links: [
      { label: "부츠", href: "/men?cat=Footwear" },
      { label: "스니커즈", href: "/men?cat=Footwear" },
      { label: "로퍼", href: "/men?cat=Footwear" },
    ]},
  ],
  "BAG": [
    { title: "여성 가방", links: [
      { label: "토트백", href: "/collections?cat=Bags&gender=women" },
      { label: "숄더백", href: "/collections?cat=Bags&gender=women" },
      { label: "클러치", href: "/collections?cat=Bags&gender=women" },
    ]},
    { title: "남성 가방", links: [
      { label: "백팩", href: "/collections?cat=Bags&gender=men" },
      { label: "토트백", href: "/collections?cat=Bags&gender=men" },
    ]},
  ],
  "ACCESSORY": [
    { title: "여성 액세서리", links: [
      { label: "스카프", href: "/collections?cat=Accessories&gender=women" },
      { label: "주얼리", href: "/collections?cat=Accessories&gender=women" },
      { label: "지갑", href: "/collections?cat=Accessories&gender=women" },
    ]},
    { title: "남성 액세서리", links: [
      { label: "스카프", href: "/collections?cat=Accessories&gender=men" },
      { label: "지갑", href: "/collections?cat=Accessories&gender=men" },
    ]},
  ],
};

export default function Navbar() {
  const { totalItems } = useCart();
  const { data: session } = useSession();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);

  // 메뉴 열릴 때 body 스크롤 방지
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // 페이지 이동 시 메뉴 닫기
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { label: "WOMEN", href: "/women" },
    { label: "MEN", href: "/men" },
    { label: "BAG", href: "/collections?cat=Bags" },
    { label: "ACCESSORY", href: "/collections?cat=Accessories" },
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, backgroundColor: "#fff" }}
        onMouseLeave={() => setActiveMega(null)}
      >
        {/* 메인 네비게이션 바 */}
        <div style={{ display: "flex", alignItems: "center", height: "44px", borderBottom: border }}>

          {/* 모바일 햄버거 버튼 */}
          <button
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              padding: "0 18px",
              borderRight: border,
              background: "none",
              cursor: "pointer",
              flexShrink: 0,
            }}
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
          >
            <svg
              style={{ width: "16px", height: "16px", transition: "opacity 0.2s" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* 데스크톱 좌측 메뉴 */}
          <nav style={{ display: "flex", alignItems: "center", height: "100%" }} className="hidden md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 24px",
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  borderRight: border,
                  color: "#000",
                  textDecoration: "none",
                }}
                onMouseEnter={() => setActiveMega(megaMenuData[item.label] ? item.label : null)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* 중앙 로고 */}
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              borderRight: border,
              minWidth: 0,
              overflow: "hidden",
            }}
            className="md:border-l"
          >
            {!isHome ? (
              <Link
                href="/"
                onClick={closeMenu}
                className="text-[9px] md:text-[11px] tracking-[0.06em] md:tracking-[0.12em]"
                style={{ fontWeight: 600, color: "#000", textDecoration: "none", whiteSpace: "nowrap" }}
              >
                SCENTCEPT
              </Link>
            ) : (
              <Link
                href="/"
                onClick={closeMenu}
                className="text-[9px] md:text-[11px] tracking-[0.06em] md:tracking-[0.12em]"
                style={{ fontWeight: 600, color: "#000", textDecoration: "none", whiteSpace: "nowrap", opacity: 0, pointerEvents: "none" }}
                aria-hidden="true"
              >
                SCENTCEPT
              </Link>
            )}
          </div>

          {/* 우측 유틸리티 메뉴 */}
          <div style={{ display: "flex", alignItems: "center", height: "100%", flexShrink: 0 }}>

            {/* 검색 아이콘 — 데스크톱만 표시 */}
            <Link
              href="/collections"
              style={{ height: "100%", display: "flex", alignItems: "center", padding: "0 18px", borderLeft: border, color: "#000", textDecoration: "none" }}
              className="hidden md:flex"
              aria-label="검색"
            >
              <svg style={{ width: "15px", height: "15px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" strokeWidth={1.4} />
                <path strokeLinecap="round" strokeWidth={1.4} d="M16.5 16.5L21 21" />
              </svg>
            </Link>

            {/* 컬렉션 링크 — 데스크톱만 표시 */}
            <Link
              href="/collections"
              style={{ height: "100%", display: "flex", alignItems: "center", padding: "0 18px", borderLeft: border, fontSize: "10px", letterSpacing: "0.05em", color: "#000", textDecoration: "none" }}
              className="hidden md:flex"
            >
              컬렉션
            </Link>

            {/* 로그인/계정 아이콘 — 데스크톱만 표시 */}
            <Link
              href={session ? "/account" : "/login"}
              style={{ height: "100%", display: "flex", alignItems: "center", padding: "0 18px", borderLeft: border, color: "#000", textDecoration: "none" }}
              className="hidden md:flex"
              aria-label={session ? "계정" : "로그인"}
            >
              <svg style={{ width: "15px", height: "15px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" strokeWidth={1.4} />
              </svg>
            </Link>

            {/* 장바구니 아이콘 — 모바일/데스크톱 모두 표시 */}
            <Link
              href="/cart"
              onClick={closeMenu}
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                padding: "0 18px",
                fontSize: "10px",
                letterSpacing: "0.05em",
                color: "#000",
                textDecoration: "none",
                borderLeft: border,
                gap: "5px",
              }}
            >
              <svg style={{ width: "15px", height: "15px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.3} d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" strokeWidth={1.3} />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.3} d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span className="hidden md:inline">{String(totalItems).padStart(2, "0")}</span>
              {totalItems > 0 && (
                <span className="md:hidden text-[10px]">{totalItems}</span>
              )}
            </Link>
          </div>
        </div>

        {/* 데스크톱 메가 메뉴 드롭다운 */}
        {activeMega && megaMenuData[activeMega] && (
          <div
            style={{ position: "absolute", left: 0, right: 0, backgroundColor: "#fff", borderBottom: border, zIndex: 40 }}
            className="hidden md:block"
            onMouseEnter={() => setActiveMega(activeMega)}
            onMouseLeave={() => setActiveMega(null)}
          >
            <div style={{ display: "flex", padding: "32px 40px", gap: "64px" }}>
              {megaMenuData[activeMega].map((col) => (
                <div key={col.title}>
                  <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, marginBottom: "16px" }}>
                    {col.title}
                  </p>
                  <ul style={{ display: "flex", flexDirection: "column", gap: "10px", listStyle: "none", padding: 0, margin: 0 }}>
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          style={{ fontSize: "12px", color: "#888", textDecoration: "none" }}
                          onClick={() => setActiveMega(null)}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* 모바일 풀스크린 오버레이 메뉴 (Acne Studios 스타일) */}
      <div
        className="md:hidden"
        style={{
          position: "fixed",
          top: "44px",
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#fff",
          zIndex: 99,
          overflowY: "auto",
          transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
          opacity: menuOpen ? 1 : 0,
          transition: "transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease",
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        {/* HOME 링크 — 최상단 */}
        <Link
          href="/"
          onClick={closeMenu}
          style={{
            display: "block",
            padding: "28px 32px",
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#000",
            textDecoration: "none",
            borderBottom: border,
          }}
        >
          HOME
        </Link>

        {/* 주요 카테고리 */}
        <nav>
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={closeMenu}
              style={{
                display: "block",
                padding: "28px 32px",
                fontSize: "22px",
                fontWeight: 400,
                letterSpacing: "0.02em",
                color: "#000",
                textDecoration: "none",
                borderBottom: border,
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* 보조 메뉴 */}
        <div style={{ paddingTop: "8px" }}>
          <Link
            href="/collections"
            onClick={closeMenu}
            style={{
              display: "block",
              padding: "18px 32px",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#666",
              textDecoration: "none",
              borderBottom: border,
            }}
          >
            컬렉션
          </Link>
          <Link
            href={session ? "/account" : "/login"}
            onClick={closeMenu}
            style={{
              display: "block",
              padding: "18px 32px",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#666",
              textDecoration: "none",
              borderBottom: border,
            }}
          >
            {session ? session.user?.name?.split(" ")[0] || "계정" : "로그인"}
          </Link>
        </div>

        {/* 하단 여백 */}
        <div style={{ height: "60px" }} />
      </div>

      {/* 오버레이 배경 (메뉴 외부 탭 시 닫기) */}
      {menuOpen && (
        <div
          className="md:hidden"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 98,
            background: "transparent",
          }}
          onClick={closeMenu}
        />
      )}
    </>
  );
}
