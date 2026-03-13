"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function Navbar() {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-black/10">
      <div className="max-w-screen-2xl mx-auto px-6 h-12 flex items-center">
        {/* Left nav — desktop */}
        <nav className="hidden md:flex items-center gap-8 flex-1">
          {["WOMEN", "MEN", "FACE", "SALE"].map((item) => (
            <Link
              key={item}
              href="/collections"
              className="text-[10px] tracking-[0.2em] hover:opacity-40 transition-opacity duration-200"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Mobile: hamburger left */}
        <button
          className="md:hidden flex-1 flex items-center"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Center logo */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 font-serif font-light text-base tracking-[0.25em] whitespace-nowrap"
          style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
        >
          Acne Studios
        </Link>

        {/* Right icons */}
        <div className="flex items-center gap-5 flex-1 justify-end">
          {/* Search */}
          <button aria-label="Search" className="hover:opacity-40 transition-opacity duration-200">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" strokeWidth={1.25} />
              <path d="M16.5 16.5L21 21" strokeWidth={1.25} strokeLinecap="round" />
            </svg>
          </button>

          {/* Account */}
          <button aria-label="Account" className="hover:opacity-40 transition-opacity duration-200">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25}
                d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" strokeWidth={1.25} />
            </svg>
          </button>

          {/* Bag */}
          <Link href="/cart" aria-label="Bag" className="relative hover:opacity-40 transition-opacity duration-200">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25}
                d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" strokeWidth={1.25} />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25}
                d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 text-[9px] font-light leading-none">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-black/10">
          <nav className="px-6 py-5 flex flex-col gap-5">
            {["WOMEN", "MEN", "FACE", "SALE"].map((item) => (
              <Link
                key={item}
                href="/collections"
                className="text-[10px] tracking-[0.2em]"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <Link
              href="/cart"
              className="text-[10px] tracking-[0.2em]"
              onClick={() => setMenuOpen(false)}
            >
              BAG {totalItems > 0 && `(${totalItems})`}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
