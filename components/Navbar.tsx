"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";

const border = "1px solid #e0e0e0";

// ─────────────────────────────────────────────
// 메가 메뉴 데이터 (WOMEN / MEN 데스크톱 전용)
// ─────────────────────────────────────────────
const megaMenuData: Record<string, { title: string; links: { label: string; href: string }[] }[]> = {
  WOMEN: [
    {
      title: "의류",
      links: [
        { label: "코트 & 자켓", href: "/women?cat=Outerwear" },
        { label: "상의", href: "/women?cat=Tops" },
        { label: "니트", href: "/women?cat=Tops" },
        { label: "바지", href: "/women?cat=Bottoms" },
        { label: "데님", href: "/women?cat=Bottoms" },
      ],
    },
    {
      title: "신발",
      links: [
        { label: "부츠", href: "/women?cat=Footwear" },
        { label: "스니커즈", href: "/women?cat=Footwear" },
        { label: "힐", href: "/women?cat=Footwear" },
      ],
    },
  ],
  MEN: [
    {
      title: "의류",
      links: [
        { label: "코트 & 자켓", href: "/men?cat=Outerwear" },
        { label: "상의", href: "/men?cat=Tops" },
        { label: "니트", href: "/men?cat=Tops" },
        { label: "바지", href: "/men?cat=Bottoms" },
        { label: "데님", href: "/men?cat=Bottoms" },
      ],
    },
    {
      title: "신발",
      links: [
        { label: "부츠", href: "/men?cat=Footwear" },
        { label: "스니커즈", href: "/men?cat=Footwear" },
        { label: "로퍼", href: "/men?cat=Footwear" },
      ],
    },
  ],
};

// 모바일 햄버거 메뉴 항목 (BAG / ACCESSORY 포함)
const mobileMenuItems = [
  { label: "HOME", href: "/" },
  { label: "WOMEN", href: "/women" },
  { label: "MEN", href: "/men" },
  { label: "BAG", href: "/collections?cat=Bags" },
  { label: "ACCESSORY", href: "/collections?cat=Accessories" },
  { label: "COLLECTIONS", href: "/collections" },
  { label: "SALE", href: "/collections?sale=true" },
];

export default function Navbar() {
  const { totalItems } = useCart();
  const { data: session } = useSession();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* ── MAIN HEADER ── */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: "#fff",
        }}
        onMouseLeave={() => setActiveMega(null)}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "48px",
            borderBottom: border,
            position: "relative",
          }}
        >
          {/* ── header-left: hamburger (mobile) + desktop-nav (WOMEN/MEN) ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              flexShrink: 0,
            }}
          >
            {/* Hamburger — mobile only */}
            <button
              className="md:hidden"
              style={{
                width: "44px",
                height: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "none",
                border: "none",
                cursor: "pointer",
                paddingLeft: "10px",
              }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
            >
              <svg
                style={{ width: "20px", height: "20px" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            {/* desktop-nav: WOMEN / MEN — desktop only, BAG/ACCESSORY excluded */}
            <nav
              className="hidden md:flex"
              style={{ height: "100%", alignItems: "center" }}
            >
              {(["WOMEN", "MEN"] as const).map((label) => (
                <Link
                  key={label}
                  href={`/${label.toLowerCase()}`}
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
                  onMouseEnter={() => setActiveMega(label)}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* ── Logo — absolute center, always ── */}
          <h1
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              margin: 0,
              lineHeight: 1,
              zIndex: 1,
            }}
          >
            <Link
              href="/"
              onClick={closeMenu}
              style={{
                fontSize: "11px",
                letterSpacing: "0.12em",
                fontWeight: 600,
                color: "#000",
                textDecoration: "none",
                whiteSpace: "nowrap",
                opacity: isHome ? 0 : 1,
                pointerEvents: isHome ? "none" : "auto",
                transition: "opacity 0.2s",
              }}
            >
              SCENTCEPT
            </Link>
          </h1>

          {/* ── header-right: SEARCH + account + BAG ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              flexShrink: 0,
              marginLeft: "auto",
            }}
          >
            {/* SEARCH — desktop: "SEARCH" text / mobile: 돋보기 아이콘 */}
            <Link
              href="/collections"
              aria-label="검색"
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                borderLeft: border,
                color: "#000",
                textDecoration: "none",
              }}
            >
              {/* Desktop */}
              <span
                className="hidden md:flex items-center"
                style={{ padding: "0 18px", fontSize: "10px", letterSpacing: "0.1em" }}
              >
                SEARCH
              </span>
              {/* Mobile */}
              <span
                className="md:hidden flex items-center justify-center"
                style={{ width: "40px", height: "48px" }}
              >
                <svg
                  style={{ width: "19px", height: "19px" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="7" strokeWidth={1.5} />
                  <path strokeLinecap="round" strokeWidth={1.5} d="M16.5 16.5L21 21" />
                </svg>
              </span>
            </Link>

            {/* Account — 사람 아이콘 (desktop + mobile) */}
            <Link
              href={session ? "/account" : "/login"}
              aria-label={session ? "계정" : "로그인"}
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                borderLeft: border,
                color: "#000",
                textDecoration: "none",
              }}
            >
              {/* Desktop */}
              <span
                className="hidden md:flex items-center"
                style={{ padding: "0 16px" }}
              >
                <svg
                  style={{ width: "15px", height: "15px" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.4}
                    d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                  />
                  <circle cx="12" cy="7" r="4" strokeWidth={1.4} />
                </svg>
              </span>
              {/* Mobile */}
              <span
                className="md:hidden flex items-center justify-center"
                style={{ width: "40px", height: "48px" }}
              >
                <svg
                  style={{ width: "19px", height: "19px" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                  />
                  <circle cx="12" cy="7" r="4" strokeWidth={1.5} />
                </svg>
              </span>
            </Link>

            {/* BAG — desktop: "BAG (00)" / mobile: 가방 아이콘 */}
            <Link
              href="/cart"
              onClick={closeMenu}
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                borderLeft: border,
                color: "#000",
                textDecoration: "none",
              }}
            >
              {/* Desktop: BAG text */}
              <span
                className="hidden md:flex items-center"
                style={{
                  padding: "0 18px",
                  fontSize: "10px",
                  letterSpacing: "0.05em",
                  gap: "4px",
                }}
              >
                BAG ({String(totalItems).padStart(2, "0")})
              </span>
              {/* Mobile: 가방 아이콘 */}
              <span
                className="md:hidden flex items-center"
                style={{ padding: "0 10px", gap: "2px", height: "48px" }}
              >
                <svg
                  style={{ width: "19px", height: "19px" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"
                  />
                  <line x1="3" y1="6" x2="21" y2="6" strokeWidth={1.5} />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 10a4 4 0 0 1-8 0"
                  />
                </svg>
                {totalItems > 0 && (
                  <span style={{ fontSize: "11px", fontWeight: 500 }}>{totalItems}</span>
                )}
              </span>
            </Link>
          </div>
        </div>

        {/* ── Desktop mega menu dropdown ── */}
        {activeMega && megaMenuData[activeMega] && (
          <div
            className="hidden md:block"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              backgroundColor: "#fff",
              borderBottom: border,
              zIndex: 40,
            }}
            onMouseEnter={() => setActiveMega(activeMega)}
            onMouseLeave={() => setActiveMega(null)}
          >
            <div style={{ display: "flex", padding: "32px 40px", gap: "64px" }}>
              {megaMenuData[activeMega].map((col) => (
                <div key={col.title}>
                  <p
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      marginBottom: "16px",
                    }}
                  >
                    {col.title}
                  </p>
                  <ul
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                    }}
                  >
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

      {/* ── Mobile fullscreen overlay menu ── */}
      <div
        className="md:hidden"
        style={{
          position: "fixed",
          top: "48px",
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#fff",
          zIndex: 99,
          overflowY: "auto",
          transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
          opacity: menuOpen ? 1 : 0,
          transition:
            "transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease",
          pointerEvents: menuOpen ? "auto" : "none",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* 주요 메뉴 — BAG / ACCESSORY 포함, 컬렉션 텍스트 없음 */}
        <nav style={{ flex: 1 }}>
          {mobileMenuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={closeMenu}
              style={{
                display: "block",
                padding: "22px 28px",
                fontSize: "24px",
                fontWeight: 400,
                letterSpacing: "0.01em",
                color: "#000",
                textDecoration: "none",
                borderBottom: border,
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* 하단: 로그인 / 회원가입 */}
        <div
          style={{
            borderTop: border,
            padding: "20px 28px",
            display: "flex",
            gap: "12px",
          }}
        >
          <Link
            href="/login"
            onClick={closeMenu}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "48px",
              fontSize: "10px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#000",
              textDecoration: "none",
              border: "1px solid #000",
            }}
          >
            로그인
          </Link>
          <Link
            href="/login?mode=signup"
            onClick={closeMenu}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "48px",
              fontSize: "10px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#fff",
              textDecoration: "none",
              backgroundColor: "#000",
            }}
          >
            회원가입
          </Link>
        </div>
      </div>

      {/* 오버레이 배경 (외부 탭 시 닫기) */}
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
