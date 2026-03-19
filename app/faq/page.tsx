"use client";

import { useState } from "react";

const faqs = [
  { q: "How long does delivery take?", a: "Standard domestic delivery takes 2-3 business days. Express delivery is available within 1 business day for orders placed before 12:00 PM KST. International delivery takes 5-10 business days." },
  { q: "What is your return policy?", a: "We accept returns within 30 days of delivery for items in their original condition, unworn and with all tags attached. Contact support@scentcept.com to initiate a return." },
  { q: "Do you offer free shipping?", a: "Yes, free standard shipping is available on all domestic orders over ₩200,000." },
  { q: "How do I track my order?", a: "Once your order is dispatched, you will receive a confirmation email with a tracking number and a link to track your package." },
  { q: "Can I change or cancel my order?", a: "Orders can be modified or cancelled within 1 hour of placement. Please contact us immediately at support@scentcept.com." },
  { q: "Do you ship internationally?", a: "Yes, we ship to selected countries worldwide. Please note that duties and taxes may apply and are the responsibility of the customer." },
  { q: "How do I find my size?", a: "Please refer to our Size Guide for detailed measurements. If you need further assistance, our customer service team is happy to help." },
  { q: "What payment methods do you accept?", a: "We accept all major credit cards, PayPal, and bank transfer. All payments are processed securely through Stripe." },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div>
      <div className="flex items-center px-6 md:px-10 h-[44px] ab-b">
        <span style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" }}>FAQs</span>
      </div>

      {faqs.map((faq, i) => (
        <div key={i} className="ab-b">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px 32px",
              fontSize: "12px",
              textAlign: "left",
              letterSpacing: "0.02em",
            }}
          >
            <span>{faq.q}</span>
            <span style={{ fontSize: "16px", color: "#999", flexShrink: 0, marginLeft: "16px" }}>{open === i ? "−" : "+"}</span>
          </button>
          {open === i && (
            <div style={{ padding: "0 32px 20px 32px" }}>
              <p style={{ fontSize: "12px", color: "#666", lineHeight: 1.8, maxWidth: "640px" }}>{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
