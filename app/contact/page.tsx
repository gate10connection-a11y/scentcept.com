"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <div>
      <div className="flex items-center px-6 md:px-10 h-[44px] ab-b">
        <span style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" }}>Contact Us</span>
      </div>

      <div className="grid md:grid-cols-2">
        <div className="p-8 md:p-16 ab-r ab-b">
          <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", marginBottom: "16px" }}>Get in Touch</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="ab"
              style={{ padding: "12px 16px", fontSize: "12px", outline: "none" }}
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="ab"
              style={{ padding: "12px 16px", fontSize: "12px", outline: "none" }}
            />
            <textarea
              placeholder="Message"
              rows={6}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="ab"
              style={{ padding: "12px 16px", fontSize: "12px", outline: "none", resize: "vertical" }}
            />
            <button
              style={{ width: "100%", height: "48px", backgroundColor: "#000", color: "#fff", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" }}
            >
              Send Message
            </button>
          </div>
        </div>

        <div className="p-8 md:p-16 ab-b">
          <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", marginBottom: "16px" }}>Information</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div>
              <p style={{ fontSize: "12px", fontWeight: 500, marginBottom: "8px" }}>Email</p>
              <p style={{ fontSize: "12px", color: "#666" }}>support@scentcept.com</p>
            </div>
            <div>
              <p style={{ fontSize: "12px", fontWeight: 500, marginBottom: "8px" }}>Hours</p>
              <p style={{ fontSize: "12px", color: "#666", lineHeight: 1.8 }}>Monday — Friday: 9:00 — 18:00 KST</p>
              <p style={{ fontSize: "12px", color: "#666", lineHeight: 1.8 }}>Saturday — Sunday: Closed</p>
            </div>
            <div>
              <p style={{ fontSize: "12px", fontWeight: 500, marginBottom: "8px" }}>Address</p>
              <p style={{ fontSize: "12px", color: "#666", lineHeight: 1.8 }}>서울특별시 강남구 청담동 123-45</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
