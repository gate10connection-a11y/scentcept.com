"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

const megaMenuData: Record<string, { title: string; links: { label: string; href: string }[] }[]> = {
  "SHOP WOMEN": [
    { title: "Clothing", links: [
      { label: "Coats & Jackets", href: "/women?cat=Outerwear" },
      { label: "Tops", href: "/women?cat=Tops" },
      { label: "Knitwear", href: "/women?cat=Tops" },
      { label: "Trousers", href: "/women?cat=Bottoms" },
      { label: "Denim", href: "/women?cat=Bottoms" },
      { label: "Skirts", href: "/women?cat=Bottoms" },
    ]},
    { title: "Accessories", links: [
      { label: "Bags", href: "/women?cat=Bags" },
      { label: "Scarves", href: "/women?cat=Accessories" },
      { label: "Jewellery", href: "/women?cat=Accessories" },
      { label: "Sunglasses", href: "/women?cat=Accessories" },
    ]},
    { title: "Shoes", links: [
      { label: "Boots", href: "/women?cat=Footwear" },
      { label: "Sneakers", href: "/women?cat=Footwear" },
      { label: "Heels", href: "/women?cat=Footwear" },
    ]},
  ],
  "SHOP MEN": [
    { title: "Clothing", links: [
      { label: "Coats & Jackets", href: "/men?cat=Outerwear" },
      { label: "Tops", href: "/men?cat=Tops" },
      { label: "Knitwear", href: "/men?cat=Tops" },
      { label: "Trousers", href: "/men?cat=Bottoms" },
      { label: "Denim", href: "/men?cat=Bottoms" },
    ]},
    { title: "Accessories", links: [
      { label: "Bags", href: "/men?cat=Bags" },
      { label: "Scarves", href: "/men?cat=Accessories" },
      { label: "Wallets", href: "/men?cat=Accessories" },
    ]},
    { title: "Shoes", links: [
      { label: "Boots", href: "/men?cat=Footwear" },
      { label: "Sneakers", href: "/men?cat=Footwear" },
      { label: "Loafers", href: "/men?cat=Footwear" },
    ]},
  ],
};

export default function Navbar() {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);

  const navItems = [
    { label: "SHOP WOMEN", href: "/women" },
    { label: "SHOP MEN", href: "/men" },
    { label: "FACE", href: "/face" },
    { label: "SALE", href: "/sale" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white"
      onMouseLeave={() => setActiveMega(null)}
    >
      {/* Main nav bar */}
      <div className="flex items-center h-[44px] ab-b">
        {/* Desktop nav */}
        <nav className="hidden md:flex items-center h-full">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="h-full flex items-center ab-r"
              style={{ padding: "0 24px", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase" as const }}
              onMouseEnter={() => setActiveMega(megaMenuData[item.label] ? item.label : null)}
            >
              <span className="hover:opacity-50 transition-opacity">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden h-full flex items-center ab-r"
          style={{ padding: "0 20px" }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Center logo */}
        <div className="flex-1" />
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2"
          style={{ fontSize: "13px", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase" as const }}
        >
          Scentcept
        </Link>
        <div className="flex-1" />

        {/* Right icons */}
        <div className="flex items-center h-full">
          <Link href="/collections" aria-label="Search" className="h-full flex items-center ab-l" style={{ padding: "0 20px" }}>
            <svg className="w-[15px] h-[15px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" strokeWidth={1.3} />
              <path d="M16.5 16.5L21 21" strokeWidth={1.3} strokeLinecap="round" />
            </svg>
          </Link>
          <Link href="/about" aria-label="Account" className="hidden md:flex h-full items-center ab-l" style={{ padding: "0 20px" }}>
            <svg className="w-[15px] h-[15px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.3} d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" strokeWidth={1.3} />
            </svg>
          </Link>
          <Link href="/cart" aria-label="Bag" className="h-full flex items-center relative ab-l" style={{ padding: "0 20px" }}>
            <svg className="w-[15px] h-[15px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.3} d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" strokeWidth={1.3} />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.3} d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {totalItems > 0 && (
              <span style={{ position: "absolute", top: "8px", right: "10px", fontSize: "9px", fontWeight: 500 }}>
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mega Menu Dropdown */}
      {activeMega && megaMenuData[activeMega] && (
        <div
          className="hidden md:block absolute left-0 right-0 bg-white ab-b z-40"
          onMouseEnter={() => setActiveMega(activeMega)}
          onMouseLeave={() => setActiveMega(null)}
        >
          <div style={{ display: "flex", padding: "32px 40px", gap: "64px" }}>
            {megaMenuData[activeMega].map((col) => (
              <div key={col.title}>
                <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, marginBottom: "16px" }}>
                  {col.title}
                </p>
                <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        style={{ fontSize: "12px", color: "#888" }}
                        className="hover:text-black transition-colors"
                        onClick={() => setActiveMega(null)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white ab-b">
          <nav style={{ display: "flex", flexDirection: "column" }}>
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="ab-b"
                style={{ padding: "16px 20px", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase" as const }}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/cart"
              className="ab-b"
              style={{ padding: "16px 20px", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase" as const }}
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
