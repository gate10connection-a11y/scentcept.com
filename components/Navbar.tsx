"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

const megaMenuData: Record<string, { title: string; links: string[] }[]> = {
  "SHOP WOMEN": [
    { title: "Clothing", links: ["Coats & Jackets", "Dresses", "Tops", "Knitwear", "Shirts", "T-shirts", "Trousers", "Skirts", "Denim"] },
    { title: "Accessories", links: ["Bags", "Scarves", "Hats", "Belts", "Jewellery", "Sunglasses"] },
    { title: "Shoes", links: ["Boots", "Sneakers", "Heels", "Flats", "Sandals"] },
  ],
  "SHOP MEN": [
    { title: "Clothing", links: ["Coats & Jackets", "Knitwear", "Shirts", "T-shirts", "Trousers", "Denim", "Suits"] },
    { title: "Accessories", links: ["Bags", "Scarves", "Hats", "Belts", "Wallets", "Sunglasses"] },
    { title: "Shoes", links: ["Boots", "Sneakers", "Loafers", "Sandals"] },
  ],
};

export default function Navbar() {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);

  const navItems = [
    { label: "SHOP WOMEN", href: "/collections" },
    { label: "SHOP MEN", href: "/collections" },
    { label: "FACE", href: "/collections" },
    { label: "SALE", href: "/collections" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white"
      onMouseLeave={() => setActiveMega(null)}
    >
      {/* Main nav bar */}
      <div className="flex items-center h-[44px] border-b border-black/15">
        {/* Left nav — desktop: cell/grid borders like Acne Studios */}
        <nav className="hidden md:flex items-center h-full">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="h-full flex items-center px-6 text-[10px] tracking-[0.15em] uppercase border-r border-black/15 hover:bg-black hover:text-white transition-colors duration-150"
              onMouseEnter={() => {
                if (megaMenuData[item.label]) {
                  setActiveMega(item.label);
                } else {
                  setActiveMega(null);
                }
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile: hamburger */}
        <button
          className="md:hidden h-full px-5 flex items-center border-r border-black/15"
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

        {/* Center logo — absolute centered */}
        <div className="flex-1" />
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 text-[15px] font-bold tracking-[0.02em] uppercase leading-none"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Scentcept
        </Link>
        <div className="flex-1" />

        {/* Right icons — cell borders */}
        <div className="flex items-center h-full">
          <button
            aria-label="Search"
            className="h-full px-5 flex items-center border-l border-black/15 hover:bg-black hover:text-white transition-colors duration-150"
          >
            <svg className="w-[15px] h-[15px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" strokeWidth={1.3} />
              <path d="M16.5 16.5L21 21" strokeWidth={1.3} strokeLinecap="round" />
            </svg>
          </button>

          <button
            aria-label="Account"
            className="hidden md:flex h-full px-5 items-center border-l border-black/15 hover:bg-black hover:text-white transition-colors duration-150"
          >
            <svg className="w-[15px] h-[15px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.3}
                d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" strokeWidth={1.3} />
            </svg>
          </button>

          <Link
            href="/cart"
            aria-label="Bag"
            className="h-full px-5 flex items-center relative border-l border-black/15 hover:bg-black hover:text-white transition-colors duration-150"
          >
            <svg className="w-[15px] h-[15px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.3}
                d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" strokeWidth={1.3} />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.3}
                d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute top-2.5 right-2.5 text-[9px] font-medium leading-none">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mega Menu — Acne Studios dropdown */}
      {activeMega && megaMenuData[activeMega] && (
        <div
          className="hidden md:block absolute left-0 right-0 bg-white border-b border-black/15 z-40"
          onMouseEnter={() => setActiveMega(activeMega)}
          onMouseLeave={() => setActiveMega(null)}
        >
          <div className="flex px-6 py-8 gap-16 max-w-screen-xl">
            {megaMenuData[activeMega].map((col) => (
              <div key={col.title}>
                <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-4">{col.title}</p>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <Link
                        href="/collections"
                        className="text-[11px] text-gray-500 hover:text-black transition-colors duration-150"
                        onClick={() => setActiveMega(null)}
                      >
                        {link}
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
        <div className="md:hidden bg-white border-b border-black/15">
          <nav className="flex flex-col">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-5 py-4 text-[10px] tracking-[0.15em] uppercase border-b border-black/15 hover:bg-black hover:text-white transition-colors duration-150"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/cart"
              className="px-5 py-4 text-[10px] tracking-[0.15em] uppercase border-b border-black/15 hover:bg-black hover:text-white transition-colors duration-150"
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
