export default function SizeGuidePage() {
  return (
    <div>
      <div className="flex items-center px-6 md:px-10 h-[44px] ab-b">
        <span style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" }}>Size Guide</span>
      </div>

      <div className="p-8 md:p-16 ab-b">
        <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", marginBottom: "24px" }}>Women — Clothing</p>
        <div className="overflow-x-auto">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
            <thead>
              <tr>
                {["Size", "Bust (cm)", "Waist (cm)", "Hip (cm)"].map((h) => (
                  <th key={h} className="ab-b" style={{ textAlign: "left", padding: "12px 16px", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 500 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["XS", "80-84", "60-64", "86-90"],
                ["S", "84-88", "64-68", "90-94"],
                ["M", "88-92", "68-72", "94-98"],
                ["L", "92-96", "72-76", "98-102"],
                ["XL", "96-100", "76-80", "102-106"],
              ].map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, i) => (
                    <td key={i} className="ab-b" style={{ padding: "12px 16px", color: i === 0 ? "#000" : "#666" }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-8 md:p-16 ab-b">
        <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", marginBottom: "24px" }}>Men — Clothing</p>
        <div className="overflow-x-auto">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
            <thead>
              <tr>
                {["Size", "Chest (cm)", "Waist (cm)", "Hip (cm)"].map((h) => (
                  <th key={h} className="ab-b" style={{ textAlign: "left", padding: "12px 16px", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 500 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["44", "86-90", "74-78", "90-94"],
                ["46", "90-94", "78-82", "94-98"],
                ["48", "94-98", "82-86", "98-102"],
                ["50", "98-102", "86-90", "102-106"],
                ["52", "102-106", "90-94", "106-110"],
              ].map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, i) => (
                    <td key={i} className="ab-b" style={{ padding: "12px 16px", color: i === 0 ? "#000" : "#666" }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-8 md:p-16 ab-b">
        <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", marginBottom: "16px" }}>Shoes</p>
        <div className="overflow-x-auto">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
            <thead>
              <tr>
                {["EU", "UK", "US", "Foot Length (cm)"].map((h) => (
                  <th key={h} className="ab-b" style={{ textAlign: "left", padding: "12px 16px", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 500 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["36", "3", "5", "23"],
                ["37", "4", "6", "23.5"],
                ["38", "5", "7", "24.5"],
                ["39", "6", "8", "25"],
                ["40", "7", "9", "25.5"],
                ["41", "8", "10", "26.5"],
                ["42", "9", "11", "27"],
              ].map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, i) => (
                    <td key={i} className="ab-b" style={{ padding: "12px 16px", color: i === 0 ? "#000" : "#666" }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
