export default function ShippingPage() {
  const sections = [
    { title: "Domestic Shipping", content: "Standard delivery within Korea takes 2-3 business days. Orders placed before 2:00 PM KST are dispatched the same day. Free shipping on orders over ₩200,000." },
    { title: "International Shipping", content: "We ship to selected countries worldwide. International delivery takes 5-10 business days depending on destination. Duties and taxes may apply and are the responsibility of the customer." },
    { title: "Express Delivery", content: "Express delivery is available for domestic orders at an additional cost of ₩5,000. Delivery within 1 business day for orders placed before 12:00 PM KST." },
    { title: "Order Tracking", content: "Once your order has been dispatched, you will receive a confirmation email with a tracking number. You can track your order status through our website or the carrier's tracking page." },
  ];

  return (
    <div>
      <div className="flex items-center px-6 md:px-10 h-[44px] ab-b">
        <span style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" }}>Shipping & Delivery</span>
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
