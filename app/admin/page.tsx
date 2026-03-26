// ─────────────────────────────────────────────
// 통합 관리자 대시보드 홈
// SCENTCEPT + AXXXXXIS 브랜드 통합 관리
// ─────────────────────────────────────────────

import Link from "next/link";

const border = "1px solid #e5e7eb";

// 브랜드별 설정
const brands = [
  {
    id: "scentcept",
    name: "SCENTCEPT",
    desc: "미니멀 럭셔리 패션",
    color: "#000",
    stats: [
      { label: "상품 수", value: "12" },
      { label: "이번 달 주문", value: "0" },
      { label: "총 회원", value: "0" },
    ],
    links: [
      { label: "상품 관리", href: "/admin/scentcept/products" },
      { label: "주문 관리", href: "/admin/scentcept/orders" },
      { label: "Sanity Studio", href: "/studio" },
    ],
  },
  {
    id: "axxxxxis",
    name: "AXXXXXIS",
    desc: "다크 하이엔드 패션",
    color: "#c8001a",
    stats: [
      { label: "상품 수", value: "12" },
      { label: "이번 달 주문", value: "0" },
      { label: "총 회원", value: "0" },
    ],
    links: [
      { label: "상품 관리", href: "/admin/axxxxxis/products" },
      { label: "주문 관리", href: "/admin/axxxxxis/orders" },
      { label: "사이트 열기", href: "http://localhost:3001" },
    ],
  },
];

export default function AdminDashboard() {
  return (
    <div>
      {/* 헤더 */}
      <div style={{ padding: "24px 32px", borderBottom: border, backgroundColor: "#fff" }}>
        <p style={{ fontSize: "11px", color: "#6b7280", marginBottom: "4px" }}>HAUSVERSE Co., Ltd.</p>
        <h1 style={{ fontSize: "20px", fontWeight: 600, color: "#111" }}>통합 관리자 대시보드</h1>
      </div>

      <div style={{ padding: "32px" }}>
        {/* 브랜드 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "24px", marginBottom: "40px" }}>
          {brands.map((brand) => (
            <div key={brand.id} style={{ border, borderRadius: "4px", backgroundColor: "#fff", overflow: "hidden" }}>
              {/* 브랜드 헤더 */}
              <div style={{ padding: "20px 24px", borderBottom: border, borderLeft: `4px solid ${brand.color}` }}>
                <h2 style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.1em", color: "#111", marginBottom: "4px" }}>
                  {brand.name}
                </h2>
                <p style={{ fontSize: "12px", color: "#6b7280" }}>{brand.desc}</p>
              </div>

              {/* 통계 */}
              <div className="grid grid-cols-3" style={{ borderBottom: border }}>
                {brand.stats.map((stat) => (
                  <div key={stat.label} style={{ padding: "16px", borderRight: border, textAlign: "center" }}>
                    <p style={{ fontSize: "20px", fontWeight: 600, color: "#111", marginBottom: "4px" }}>{stat.value}</p>
                    <p style={{ fontSize: "10px", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em" }}>{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* 링크 */}
              <div style={{ padding: "16px 24px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {brand.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      fontSize: "11px",
                      padding: "6px 14px",
                      border,
                      color: "#374151",
                      textDecoration: "none",
                      borderRadius: "2px",
                      transition: "all 0.2s",
                    }}
                    className="hover:bg-black hover:text-white hover:border-black"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Sanity 다중 브랜드 구조 안내 */}
        <div style={{ border, borderRadius: "4px", backgroundColor: "#fff", padding: "24px" }}>
          <h3 style={{ fontSize: "13px", fontWeight: 600, color: "#111", marginBottom: "16px" }}>
            Sanity 다중 브랜드 구조 안내
          </h3>
          <div style={{ fontSize: "12px", color: "#6b7280", lineHeight: 1.8 }}>
            <p style={{ marginBottom: "12px" }}>
              <strong style={{ color: "#374151" }}>하나의 Sanity 프로젝트</strong>에서 SCENTCEPT와 AXXXXXIS를 통합 관리합니다.
            </p>
            <ul style={{ paddingLeft: "16px", display: "flex", flexDirection: "column", gap: "6px" }}>
              <li>상품 스키마에 <code style={{ backgroundColor: "#f3f4f6", padding: "1px 4px", borderRadius: "2px" }}>brand</code> 필드 추가 → SCENTCEPT / AXXXXXIS 분류</li>
              <li>GROQ 쿼리: <code style={{ backgroundColor: "#f3f4f6", padding: "1px 4px", borderRadius: "2px" }}>*[_type == &quot;product&quot; &amp;&amp; brand == &quot;scentcept&quot;]</code></li>
              <li>주문/회원 스키마도 동일하게 brand 필드로 구분</li>
              <li>Sanity Studio의 Structure Tool로 브랜드별 별도 메뉴 구성 가능</li>
            </ul>
          </div>
          <Link
            href="/studio"
            style={{ display: "inline-block", marginTop: "16px", fontSize: "11px", padding: "8px 20px", backgroundColor: "#111", color: "#fff", textDecoration: "none", borderRadius: "2px", transition: "background-color 0.2s" }}
            className="hover:bg-[#333]"
          >
            Sanity Studio 열기 →
          </Link>
        </div>
      </div>
    </div>
  );
}
