"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

const border = "1px solid #e0e0e0";

const megaMenuData: Record<string, { title: string; links: { label: string; href: string }[] }[]> = {
  "WOMEN": [
    { title: "Clothing", links: [
      { label: "Coats & Jackets", href: "/women?cat=Outerwear" },
      { label: "Tops", href: "/women?cat=Tops" },
      { label: "Knitwear", href: "/women?cat=Tops" },
      { label: "Trousers", href: "/women?cat=Bottoms" },
      { label: "Denim", href: "/women?cat=Bottoms" },
    ]},
    { title: "Accessories", links: [
      { label: "Bags", href: "/women?cat=Bags" },
      { label: "Scarves", href: "/women?cat=Accessories" },
      { label: "Jewellery", href: "/women?cat=Accessories" },
    ]},
    { title: "Shoes", links: [
      { label: "Boots", href: "/women?cat=Footwear" },
      { label: "Sneakers", href: "/women?cat=Footwear" },
      { label: "Heels", href: "/women?cat=Footwear" },
    ]},
  ],
  "MEN": [
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
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);

  const navItems = [
    { label: "WOMEN", href: "/women" },
    { label: "MEN", href: "/men" },
    { label: "BAG", href: "/collections" },
  ];

  return (
    <header
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, backgroundColor: "#fff" }}
      onMouseLeave={() => setActiveMega(null)}
    >
      {/* Main nav bar */}
      <div style={{ display: "flex", alignItems: "center", height: "44px", borderBottom: border }}>
        {/* Desktop nav */}
        <nav style={{ display: "flex", alignItems: "center", height: "100%" }} className="hidden md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                padding: "0 24px",
                fontSize: "10px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                borderRight: border,
                color: "#000",
                textDecoration: "none",
              }}
              onMouseEnter={() => setActiveMega(megaMenuData[item.label] ? item.label : null)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          style={{ height: "100%", display: "flex", alignItems: "center", padding: "0 20px", borderRight: border, background: "none", border: "none", borderRightStyle: "solid", borderRightWidth: "1px", borderRightColor: "#e0e0e0", cursor: "pointer" }}
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg style={{ width: "16px", height: "16px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Center logo — hidden on homepage where overlay logo is shown */}
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
          {!isHome && (
            <Link href="/" className="text-[9px] md:text-[11px] tracking-[0.06em] md:tracking-[0.12em]" style={{ fontWeight: 600, color: "#000", textDecoration: "none" }}>
              SCENTCEPT
            </Link>
          )}
        </div>

        {/* Right nav */}
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          <Link href="/collections" style={{ height: "100%", display: "flex", alignItems: "center", padding: "0 20px", borderLeft: border, fontSize: "10px", letterSpacing: "0.05em", color: "#000", textDecoration: "none" }} className="hidden md:flex">
            Search
          </Link>
          <Link href="/collections" style={{ height: "100%", display: "flex", alignItems: "center", padding: "0 20px", borderLeft: border, fontSize: "10px", letterSpacing: "0.05em", color: "#000", textDecoration: "none" }} className="hidden md:flex">
            Both
          </Link>
          <Link href="/about" style={{ height: "100%", display: "flex", alignItems: "center", padding: "0 20px", borderLeft: border, fontSize: "10px", letterSpacing: "0.05em", color: "#000", textDecoration: "none" }} className="hidden md:flex">
            Account
          </Link>
          <Link href="/cart" style={{ height: "100%", display: "flex", alignItems: "center", padding: "0 20px", borderLeft: border, fontSize: "10px", letterSpacing: "0.05em", color: "#000", textDecoration: "none" }}>
            <svg style={{ width: "14px", height: "14px", marginRight: "6px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.3} d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" strokeWidth={1.3} />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.3} d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {String(totalItems).padStart(2, "0")}
          </Link>
        </div>
      </div>

      {/* Mega Menu Dropdown */}
      {activeMega && megaMenuData[activeMega] && (
        <div
          style={{ position: "absolute", left: 0, right: 0, backgroundColor: "#fff", borderBottom: border, zIndex: 40 }}
          className="hidden md:block"
          onMouseEnter={() => setActiveMega(activeMega)}
          onMouseLeave={() => setActiveMega(null)}
        >
          <div style={{ display: "flex", padding: "32px 40px", gap: "64px" }}>
            {megaMenuData[activeMega].map((col) => (
              <div key={col.title}>
                <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, marginBottom: "16px" }}>
                  {col.title}
                </p>
                <ul style={{ display: "flex", flexDirection: "column", gap: "10px", listStyle: "none", padding: 0, margin: 0 }}>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        style={{ fontSize: "12px", color: "#888", textDecoration: "none" }}
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
        <div style={{ backgroundColor: "#fff", borderBottom: border }} className="md:hidden">
          <nav style={{ display: "flex", flexDirection: "column" }}>
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                style={{ padding: "16px 20px", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", borderBottom: border, color: "#000", textDecoration: "none" }}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/cart"
              style={{ padding: "16px 20px", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", borderBottom: border, color: "#000", textDecoration: "none" }}
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
