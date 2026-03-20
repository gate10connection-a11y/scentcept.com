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
      {/* Header bar */}
      <div className="flex items-center justify-between px-6 md:px-10 h-[44px] ab-b">
        <span className="text-[10px] tracking-[0.2em] uppercase">All Collections</span>
        <span className="text-[10px] tracking-[0.15em] text-gray-400">
          {filtered.length} {filtered.length === 1 ? "item" : "items"}
        </span>
      </div>

      {/* Filter Bar */}
      <div className="flex overflow-x-auto scrollbar-none ab-b">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`whitespace-nowrap h-[40px] px-6 text-[10px] tracking-[0.15em] uppercase transition-colors duration-150 flex-shrink-0 ab-r ${
              selectedCategory === cat
                ? "bg-black text-white"
                : "text-gray-500 hover:bg-black hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((product, i) => (
          <div
            key={product.id}
            className={`${(i + 1) % 4 !== 0 ? "ab-r" : ""} ab-b`}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
