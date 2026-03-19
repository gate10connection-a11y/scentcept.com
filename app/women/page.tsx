"use client";

import { useState } from "react";
import { getProductsByGender } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function WomenContent() {
  const searchParams = useSearchParams();
  const catParam = searchParams.get("cat");
  const [selectedCategory, setSelectedCategory] = useState(catParam || "All");

  const allWomen = getProductsByGender("women");
  const categories = ["All", ...Array.from(new Set(allWomen.map((p) => p.category)))];
  const filtered = selectedCategory === "All" ? allWomen : allWomen.filter((p) => p.category === selectedCategory);

  return (
    <div>
      <div className="flex items-center justify-between px-6 md:px-10 h-[44px] ab-b">
        <span style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" }}>Shop Women</span>
        <span style={{ fontSize: "10px", letterSpacing: "0.15em", color: "#999" }}>{filtered.length} items</span>
      </div>
      <div className="flex overflow-x-auto scrollbar-none ab-b">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`whitespace-nowrap flex-shrink-0 ab-r ${selectedCategory === cat ? "bg-black text-white" : ""}`}
            style={{ height: "40px", padding: "0 24px", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase" }}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((product, i) => (
          <div key={product.id} className={`${(i + 1) % 4 !== 0 ? "ab-r" : ""} ab-b`}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function WomenPage() {
  return <Suspense><WomenContent /></Suspense>;
}
