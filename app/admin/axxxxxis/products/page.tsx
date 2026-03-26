const border = "1px solid #e5e7eb";

// AXXXXXIS 상품 목업 (실제 연동 전 표시용)
const axxxxxisProducts = [
  { id: "a001", name: "Le Voyou Graphic Tee", category: "Tops", price: "₩380,000", gender: "femme", status: "NEW" },
  { id: "a002", name: "Oversized Blazer", category: "Outerwear", price: "₩1,200,000", gender: "femme", status: "NEW" },
  { id: "a003", name: "Silk Slip Dress", category: "Bottoms", price: "₩890,000", gender: "femme", status: "" },
  { id: "a007", name: "Cropped Leather Jacket", category: "Outerwear", price: "₩2,400,000", gender: "femme", status: "NEW" },
  { id: "a009", name: "Relaxed Suit Jacket", category: "Outerwear", price: "₩1,480,000", gender: "homme", status: "NEW" },
  { id: "a010", name: "Oversized Cotton Tee", category: "Tops", price: "₩280,000", gender: "homme", status: "SALE" },
];

export default function AxxxxxisProductsPage() {
  return (
    <div>
      <div style={{ padding: "24px 32px", borderBottom: border, backgroundColor: "#fff" }}>
        <p style={{ fontSize: "11px", color: "#6b7280", marginBottom: "2px" }}>AXXXXXIS</p>
        <h1 style={{ fontSize: "18px", fontWeight: 600, color: "#111" }}>상품 관리</h1>
      </div>
      <div style={{ padding: "24px 32px" }}>
        <div style={{ padding: "16px", backgroundColor: "#fef3c7", borderRadius: "4px", marginBottom: "24px", fontSize: "12px", color: "#92400e" }}>
          💡 Sanity 연결 후 실시간 상품 데이터가 표시됩니다. 현재 목업 데이터를 표시 중입니다.
        </div>
        <div style={{ border, borderRadius: "4px", overflow: "hidden", backgroundColor: "#fff" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: border }}>
                {["상품명", "카테고리", "가격", "성별", "상태"].map((h) => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "11px", fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {axxxxxisProducts.map((p) => (
                <tr key={p.id} style={{ borderBottom: border }} className="hover:bg-gray-50">
                  <td style={{ padding: "12px 16px", fontSize: "13px", color: "#111" }}>{p.name}</td>
                  <td style={{ padding: "12px 16px", fontSize: "12px", color: "#6b7280" }}>{p.category}</td>
                  <td style={{ padding: "12px 16px", fontSize: "12px", color: "#111" }}>{p.price}</td>
                  <td style={{ padding: "12px 16px", fontSize: "12px", color: "#6b7280" }}>{p.gender}</td>
                  <td style={{ padding: "12px 16px" }}>
                    {p.status === "NEW" && <span style={{ fontSize: "10px", padding: "2px 8px", backgroundColor: "#000", color: "#fff", borderRadius: "99px" }}>NEW</span>}
                    {p.status === "SALE" && <span style={{ fontSize: "10px", padding: "2px 8px", backgroundColor: "#c8001a", color: "#fff", borderRadius: "99px" }}>SALE</span>}
                    {!p.status && <span style={{ fontSize: "10px", color: "#9ca3af" }}>—</span>}
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
