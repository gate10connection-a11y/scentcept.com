"use client";

import { getSaleProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default function SalePage() {
  const saleProducts = getSaleProducts();

  return (
    <div>
      <div className="flex items-center justify-between px-6 md:px-10 h-[44px] ab-b">
        <span style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" }}>Sale</span>
        <span style={{ fontSize: "10px", letterSpacing: "0.15em", color: "#999" }}>{saleProducts.length} items</span>
      </div>

      {saleProducts.length === 0 ? (
        <div className="text-center py-24">
          <p style={{ fontSize: "12px", color: "#999", marginBottom: "32px" }}>No sale items at the moment.</p>
          <Link href="/collections" style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", borderBottom: "1px solid #000", paddingBottom: "2px" }}>
            Browse Collections
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {saleProducts.map((product, i) => (
            <div key={product.id} className={`${(i + 1) % 4 !== 0 ? "ab-r" : ""} ab-b`}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
