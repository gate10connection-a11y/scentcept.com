// SCENTCEPT 상품 관리 페이지
import Link from "next/link";
import { mockProducts } from "@/lib/products";

const border = "1px solid #e5e7eb";

export default function ScentceptProductsPage() {
  return (
    <div>
      <div style={{ padding: "24px 32px", borderBottom: border, backgroundColor: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <p style={{ fontSize: "11px", color: "#6b7280", marginBottom: "2px" }}>SCENTCEPT</p>
          <h1 style={{ fontSize: "18px", fontWeight: 600, color: "#111" }}>상품 관리</h1>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <Link href="/studio" style={{ fontSize: "11px", padding: "8px 16px", backgroundColor: "#111", color: "#fff", textDecoration: "none", borderRadius: "2px" }}>
            Sanity에서 추가 →
          </Link>
        </div>
      </div>

      <div style={{ padding: "24px 32px" }}>
        {/* 안내 */}
        <div style={{ padding: "16px", backgroundColor: "#fef3c7", borderRadius: "4px", marginBottom: "24px", fontSize: "12px", color: "#92400e" }}>
          💡 Sanity 연결 후 실시간 상품 데이터가 표시됩니다. 현재 목업 데이터를 표시 중입니다.
        </div>

        {/* 상품 테이블 */}
        <div style={{ border, borderRadius: "4px", overflow: "hidden", backgroundColor: "#fff" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: border }}>
                {["상품명", "카테고리", "가격", "성별", "상태"].map((h) => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "11px", fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockProducts.map((product) => (
                <tr key={product.id} style={{ borderBottom: border, transition: "background-color 0.1s" }} className="hover:bg-gray-50">
                  <td style={{ padding: "12px 16px", fontSize: "13px", color: "#111" }}>{product.name}</td>
                  <td style={{ padding: "12px 16px", fontSize: "12px", color: "#6b7280" }}>{product.category}</td>
                  <td style={{ padding: "12px 16px", fontSize: "12px", color: "#111" }}>${product.price}</td>
                  <td style={{ padding: "12px 16px", fontSize: "12px", color: "#6b7280", textTransform: "capitalize" }}>{product.gender}</td>
                  <td style={{ padding: "12px 16px" }}>
                    {product.isNew && <span style={{ fontSize: "10px", padding: "2px 8px", backgroundColor: "#000", color: "#fff", borderRadius: "99px" }}>NEW</span>}
                    {product.isSale && <span style={{ fontSize: "10px", padding: "2px 8px", backgroundColor: "#ef4444", color: "#fff", borderRadius: "99px" }}>SALE</span>}
                    {!product.isNew && !product.isSale && <span style={{ fontSize: "10px", color: "#9ca3af" }}>—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
