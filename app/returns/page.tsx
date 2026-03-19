export default function ReturnsPage() {
  const sections = [
    { title: "Return Policy", content: "We accept returns within 30 days of delivery for items in their original condition, unworn and with all tags attached. Items marked as final sale are not eligible for returns." },
    { title: "How to Return", content: "To initiate a return, contact our customer service team at support@scentcept.com with your order number. We will provide you with a prepaid return label and instructions." },
    { title: "Exchanges", content: "We offer free exchanges for different sizes or colours within 30 days of delivery. Contact our team to arrange an exchange. Exchanges are subject to availability." },
    { title: "Refunds", content: "Refunds are processed within 5-7 business days after we receive your returned item. The refund will be issued to the original payment method." },
  ];

  return (
    <div>
      <div className="flex items-center px-6 md:px-10 h-[44px] ab-b">
        <span style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" }}>Returns & Exchanges</span>
      </div>

      {sections.map((section, i) => (
        <div key={i} className="p-8 md:p-16 ab-b">
          <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", marginBottom: "16px" }}>{section.title}</p>
          <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.8, maxWidth: "640px" }}>{section.content}</p>
        </div>
      ))}
    </div>
  );
}
