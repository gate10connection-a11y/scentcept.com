"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="border-t border-black/10 mt-24">
      <div className="max-w-screen-2xl mx-auto px-6 py-16">
        {/* Logo */}
        <div className="mb-12">
          <Link
            href="/"
            className="font-light text-lg tracking-[0.25em]"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            SCENTCEPT
          </Link>
        </div>

        {/* 4-column grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {/* Customer Service */}
          <div>
            <h3 className="text-[10px] tracking-[0.2em] uppercase mb-5">Customer Service</h3>
            <ul className="space-y-3">
              {["Contact Us", "Shipping & Delivery", "Returns & Exchanges", "Size Guide", "FAQs"].map((item) => (
                <li key={item}>
                  <span className="text-xs text-gray-400 cursor-pointer hover:text-black transition-colors duration-200">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[10px] tracking-[0.2em] uppercase mb-5">Company</h3>
            <ul className="space-y-3">
              {["About SCENTCEPT", "Careers", "Press", "Store Locator", "Sustainability"].map((item) => (
                <li key={item}>
                  <span className="text-xs text-gray-400 cursor-pointer hover:text-black transition-colors duration-200">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow */}
          <div>
            <h3 className="text-[10px] tracking-[0.2em] uppercase mb-5">Follow</h3>
            <ul className="space-y-3">
              {["Instagram", "X (Twitter)", "Pinterest", "TikTok", "Spotify"].map((item) => (
                <li key={item}>
                  <span className="text-xs text-gray-400 cursor-pointer hover:text-black transition-colors duration-200">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-[10px] tracking-[0.2em] uppercase mb-5">Newsletter</h3>
            <p className="text-xs text-gray-400 mb-5 leading-relaxed">
              Sign up to receive updates on new arrivals, special offers, and other discount information.
            </p>
            <div className="flex border-b border-black pb-1">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 text-xs py-1 outline-none bg-transparent placeholder-gray-400"
              />
              <button
                className="text-xs tracking-widest py-1 pl-3 hover:opacity-40 transition-opacity duration-200"
                aria-label="Subscribe"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-black/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-[10px] text-gray-400 tracking-wide">
            © {new Date().getFullYear()} SCENTCEPT. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-5">
            {["Privacy Policy", "Terms & Conditions", "Cookie Settings", "Accessibility"].map((item) => (
              <span
                key={item}
                className="text-[10px] text-gray-400 cursor-pointer hover:text-black transition-colors duration-200 tracking-wide"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
