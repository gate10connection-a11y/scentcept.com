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
    <div className="max-w-screen-xl mx-auto px-6 py-12">
      {/* Page Header */}
      <div className="mb-12">
        <p className="text-xs tracking-widest uppercase text-gray-400 mb-2">
          FW2024
        </p>
        <h1 className="text-2xl tracking-widest uppercase font-light">
          All Collections
        </h1>
      </div>

      {/* Filter Bar */}
      <div className="flex gap-6 overflow-x-auto pb-4 mb-10 border-b border-black/10 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`whitespace-nowrap text-xs tracking-widest uppercase transition-opacity flex-shrink-0 pb-4 -mb-4 border-b-2 ${
              selectedCategory === cat
                ? "border-black text-black"
                : "border-transparent text-gray-400 hover:text-black"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Count */}
      <p className="text-xs text-gray-400 mb-6">
        {filtered.length} {filtered.length === 1 ? "item" : "items"}
      </p>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
