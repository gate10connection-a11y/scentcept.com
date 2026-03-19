"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="ab-t">
      {/* 4-column grid with cell borders */}
      <div className="grid grid-cols-2 md:grid-cols-4">
        <div className="p-6 md:p-8 ab-r ab-b">
          <h3 className="text-[10px] tracking-[0.2em] uppercase mb-5">Customer Service</h3>
          <ul className="space-y-2.5">
            {[
              { label: "Contact Us", href: "/contact" },
              { label: "Shipping & Delivery", href: "/shipping" },
              { label: "Returns & Exchanges", href: "/returns" },
              { label: "Size Guide", href: "/size-guide" },
              { label: "FAQs", href: "/faq" },
            ].map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="text-[11px] text-gray-400 hover:text-black transition-colors duration-200">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 md:p-8 ab-r ab-b">
          <h3 className="text-[10px] tracking-[0.2em] uppercase mb-5">Company</h3>
          <ul className="space-y-2.5">
            {[
              { label: "About SCENTCEPT", href: "/about" },
              { label: "Careers", href: "/about" },
              { label: "Press", href: "/about" },
              { label: "Store Locator", href: "/contact" },
              { label: "Sustainability", href: "/sustainability" },
            ].map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="text-[11px] text-gray-400 hover:text-black transition-colors duration-200">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 md:p-8 ab-r ab-b">
          <h3 className="text-[10px] tracking-[0.2em] uppercase mb-5">Follow</h3>
          <ul className="space-y-2.5">
            {["Instagram", "X (Twitter)", "Pinterest", "TikTok", "Spotify"].map((item) => (
              <li key={item}>
                <span className="text-[11px] text-gray-400 cursor-pointer hover:text-black transition-colors duration-200">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 md:p-8 ab-b">
          <h3 className="text-[10px] tracking-[0.2em] uppercase mb-5">Newsletter</h3>
          <p className="text-[11px] text-gray-400 mb-5 leading-relaxed">
            Sign up to receive updates on new arrivals and other discount information.
          </p>
          <div className="flex border-b border-black pb-1">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 text-[11px] py-1 outline-none bg-transparent placeholder-gray-400"
            />
            <button className="text-[11px] py-1 pl-3 hover:opacity-40 transition-opacity duration-200" aria-label="Subscribe">→</button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-6 md:px-8 py-5 gap-3">
        <p className="text-[10px] text-gray-400 tracking-wide">© {new Date().getFullYear()} SCENTCEPT. All rights reserved.</p>
        <div className="flex flex-wrap gap-5">
          {["Privacy Policy", "Terms & Conditions", "Cookie Settings", "Accessibility"].map((item) => (
            <span key={item} className="text-[10px] text-gray-400 cursor-pointer hover:text-black transition-colors duration-200 tracking-wide">{item}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}
