"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { getProductById, formatPrice } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem } = useCart();

  const product = getProductById(params.id as string);

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  if (!product) {
    return (
      <div className="px-6 md:px-10 py-20 text-center">
        <p className="text-[11px] text-gray-400 mb-6">Product not found.</p>
        <Link
          href="/collections"
          className="text-[10px] tracking-[0.2em] uppercase border-b border-black pb-0.5"
        >
          Back to Collections
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addItem(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div>
      {/* Breadcrumb bar — Acne cell style */}
      <nav
        className="flex items-center gap-2 px-6 md:px-10 h-10 text-[10px] text-gray-400"
        style={{ borderBottom: "var(--border)" }}
      >
        <Link href="/" className="hover:text-black transition-colors">Home</Link>
        <span>/</span>
        <Link href="/collections" className="hover:text-black transition-colors">Collections</Link>
        <span>/</span>
        <span className="text-black">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2">
        {/* Left — Images stacked vertically, Acne style */}
        <div style={{ borderRight: "var(--border)" }}>
          {/* Main image */}
          <div className="relative aspect-[3/4] overflow-hidden bg-[#f5f5f5]">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Thumbnail row */}
          {product.images.length > 1 && (
            <div className="flex" style={{ borderTop: "var(--border)" }}>
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative flex-1 aspect-square overflow-hidden bg-[#f5f5f5] transition-opacity ${
                    selectedImage === i ? "opacity-100" : "opacity-50 hover:opacity-75"
                  }`}
                  style={{ borderRight: i < product.images.length - 1 ? "var(--border)" : "none" }}
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="100px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right — Product Info, Acne style: clean, structured */}
        <div className="flex flex-col">
          {/* Product header */}
          <div className="p-6 md:p-10" style={{ borderBottom: "var(--border)" }}>
            <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-2">
              {product.category}
            </p>
            <h1
              className="text-lg md:text-xl font-medium tracking-[-0.01em] mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {product.name}
            </h1>
            <p className="text-[13px]">{formatPrice(product.price)}</p>
          </div>

          {/* Size Selection */}
          <div className="p-6 md:p-10" style={{ borderBottom: "var(--border)" }}>
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] tracking-[0.2em] uppercase">Size</p>
              <button className="text-[10px] text-gray-400 underline hover:text-black transition-colors">
                Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-0">
              {product.sizes.map((size, i) => (
                <button
                  key={size}
                  onClick={() => {
                    setSelectedSize(size);
                    setSizeError(false);
                  }}
                  className={`h-10 px-5 text-[10px] tracking-[0.1em] uppercase transition-colors duration-150 ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : "hover:bg-black hover:text-white"
                  }`}
                  style={{
                    border: "var(--border)",
                    marginRight: "-1px",
                    marginBottom: "-1px",
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
            {sizeError && (
              <p className="text-[10px] text-red-500 mt-3">Please select a size.</p>
            )}
          </div>

          {/* Add to Cart */}
          <div className="p-6 md:p-10" style={{ borderBottom: "var(--border)" }}>
            <button
              onClick={handleAddToCart}
              className={`w-full h-12 text-[10px] tracking-[0.2em] uppercase transition-all duration-200 ${
                added
                  ? "bg-gray-800 text-white"
                  : "bg-black text-white hover:bg-gray-900"
              }`}
            >
              {added ? "Added to Cart ✓" : "Add to Cart"}
            </button>

            {added && (
              <button
                onClick={() => router.push("/cart")}
                className="w-full h-12 mt-2 text-[10px] tracking-[0.2em] uppercase border border-black hover:bg-black hover:text-white transition-all duration-200"
              >
                View Cart
              </button>
            )}
          </div>

          {/* Description */}
          <div className="p-6 md:p-10" style={{ borderBottom: "var(--border)" }}>
            <p className="text-[10px] tracking-[0.2em] uppercase mb-4">Description</p>
            <p className="text-[12px] text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Details */}
          <div className="p-6 md:p-10">
            <p className="text-[10px] tracking-[0.2em] uppercase mb-4">Details</p>
            <div className="space-y-1.5">
              <p className="text-[11px] text-gray-500">Style: {product.id.toUpperCase()}</p>
              <p className="text-[11px] text-gray-500">Collection: {product.collection}</p>
              <p className="text-[11px] text-gray-500">Free returns within 30 days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
