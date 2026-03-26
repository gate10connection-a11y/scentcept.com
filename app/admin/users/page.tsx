const border = "1px solid #e5e7eb";

export default function UsersPage() {
  return (
    <div>
      <div style={{ padding: "24px 32px", borderBottom: border, backgroundColor: "#fff" }}>
        <p style={{ fontSize: "11px", color: "#6b7280", marginBottom: "2px" }}>HAUSVERSE</p>
        <h1 style={{ fontSize: "18px", fontWeight: 600, color: "#111" }}>회원 관리</h1>
      </div>
      <div style={{ padding: "32px" }}>
        <div style={{ padding: "16px", backgroundColor: "#eff6ff", borderRadius: "4px", marginBottom: "24px", fontSize: "12px", color: "#1e40af" }}>
          ℹ️ 실제 DB(Sanity/Prisma) 연결 후 회원 목록이 표시됩니다. 현재 NextAuth JWT 세션 방식 사용 중입니다.
        </div>
        <div style={{ border, borderRadius: "4px", padding: "40px 24px", textAlign: "center", backgroundColor: "#fff" }}>
          <p style={{ fontSize: "24px", marginBottom: "12px" }}>👥</p>
          <p style={{ fontSize: "14px", fontWeight: 600, color: "#374151", marginBottom: "8px" }}>회원 데이터가 없습니다</p>
          <p style={{ fontSize: "12px", color: "#6b7280" }}>
            DB 어댑터 연결 시 SCENTCEPT / AXXXXXIS 통합 회원 목록이 브랜드별로 표시됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}
