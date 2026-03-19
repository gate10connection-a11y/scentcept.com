"use client";

import { useState } from "react";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

const categories = ["All", "Outerwear", "Tops", "Bottoms", "Bags", "Footwear", "Accessories"];

export default function CollectionsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filtered =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div>
      {/* Header bar — Acne cell style */}
      <div
        className="flex items-center justify-between px-6 md:px-10 h-11"
        style={{ borderBottom: "var(--border)" }}
      >
        <span className="text-[10px] tracking-[0.2em] uppercase">
          All Collections
        </span>
        <span className="text-[10px] tracking-[0.15em] text-gray-400">
          {filtered.length} {filtered.length === 1 ? "item" : "items"}
        </span>
      </div>

      {/* Filter Bar — Acne cell/tab style with borders */}
      <div
        className="flex overflow-x-auto scrollbar-none"
        style={{ borderBottom: "var(--border)" }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`whitespace-nowrap h-10 px-5 text-[10px] tracking-[0.15em] uppercase transition-colors duration-150 flex-shrink-0 ${
              selectedCategory === cat
                ? "bg-black text-white"
                : "text-gray-500 hover:bg-black hover:text-white"
            }`}
            style={{ borderRight: "var(--border)" }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid — Acne style with cell borders */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((product, i) => (
          <div
            key={product.id}
            style={{
              borderRight: (i + 1) % 4 !== 0 ? "var(--border)" : "none",
              borderBottom: "var(--border)",
            }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
