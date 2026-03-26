const border = "1px solid #e5e7eb";

export default function AxxxxxisOrdersPage() {
  return (
    <div>
      <div style={{ padding: "24px 32px", borderBottom: border, backgroundColor: "#fff" }}>
        <p style={{ fontSize: "11px", color: "#6b7280", marginBottom: "2px" }}>AXXXXXIS</p>
        <h1 style={{ fontSize: "18px", fontWeight: 600, color: "#111" }}>주문 관리</h1>
      </div>
      <div style={{ padding: "32px" }}>
        <div style={{ padding: "80px 24px", textAlign: "center", border, borderRadius: "4px", backgroundColor: "#fff" }}>
          <p style={{ fontSize: "24px", marginBottom: "12px" }}>📦</p>
          <p style={{ fontSize: "14px", fontWeight: 600, color: "#374151", marginBottom: "8px" }}>주문 데이터가 없습니다</p>
          <p style={{ fontSize: "12px", color: "#6b7280" }}>Stripe 웹훅 연결 후 실시간 주문이 표시됩니다.</p>
        </div>
      </div>
    </div>
  );
}
