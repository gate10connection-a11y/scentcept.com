import Link from "next/link";

// ─────────────────────────────────────────────
// 관리자 대시보드 레이아웃
// middleware.ts에서 admin 역할 체크를 선행함
// ─────────────────────────────────────────────

const navLinks = [
  { label: "대시보드", href: "/admin" },
  { label: "SCENTCEPT 상품", href: "/admin/scentcept/products" },
  { label: "SCENTCEPT 주문", href: "/admin/scentcept/orders" },
  { label: "AXXXXXIS 상품", href: "/admin/axxxxxis/products" },
  { label: "AXXXXXIS 주문", href: "/admin/axxxxxis/orders" },
  { label: "회원 관리", href: "/admin/users" },
  { label: "← 메인 사이트", href: "/" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#fafafa" }}>
      {/* 사이드바 */}
      <aside style={{ width: "220px", backgroundColor: "#000", flexShrink: 0, position: "sticky", top: 0, height: "100vh", overflowY: "auto" }}>
        {/* 로고 */}
        <div style={{ padding: "20px 16px", borderBottom: "1px solid #222" }}>
          <p style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#666", marginBottom: "4px" }}>
            관리자 패널
          </p>
          <p style={{ fontSize: "13px", letterSpacing: "0.1em", color: "#fff", fontWeight: 500 }}>
            HAUSVERSE
          </p>
        </div>
        {/* 네비게이션 */}
        <nav style={{ padding: "8px 0" }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: "block",
                padding: "10px 16px",
                fontSize: "11px",
                letterSpacing: "0.05em",
                color: link.href === "/" ? "#555" : "#aaa",
                textDecoration: "none",
                transition: "color 0.2s, background-color 0.2s",
                borderBottom: link.href === "/" ? "1px solid #222" : "none",
              }}
              className="hover:bg-[#111] hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* 메인 컨텐츠 */}
      <main style={{ flex: 1, padding: "0", overflowY: "auto" }}>
        {children}
      </main>
    </div>
  );
}
