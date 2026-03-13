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
      <div className="max-w-screen-xl mx-auto px-6 py-20 text-center">
        <p className="text-sm text-gray-400 mb-4">Product not found.</p>
        <Link href="/collections" className="text-xs tracking-widest uppercase underline">
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
    <div className="max-w-screen-xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-xs text-gray-400">
        <Link href="/" className="hover:text-black transition-colors">Home</Link>
        <span>/</span>
        <Link href="/collections" className="hover:text-black transition-colors">Collections</Link>
        <span>/</span>
        <span className="text-black">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10 lg:gap-20">
        {/* Images */}
        <div className="space-y-3">
          <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-16 aspect-square overflow-hidden bg-gray-50 border-2 transition-colors ${
                    selectedImage === i ? "border-black" : "border-transparent"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <p className="text-xs tracking-widest uppercase text-gray-400 mb-2">
            {product.category}
          </p>
          <h1 className="text-2xl font-light mb-3">{product.name}</h1>
          <p className="text-lg mb-8">{formatPrice(product.price)}</p>

          {/* Size Selection */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs tracking-widest uppercase">Size</p>
              <button className="text-xs text-gray-400 underline hover:text-black transition-colors">
                Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setSelectedSize(size);
                    setSizeError(false);
                  }}
                  className={`px-4 py-2 text-xs border transition-colors ${
                    selectedSize === size
                      ? "border-black bg-black text-white"
                      : "border-gray-200 hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {sizeError && (
              <p className="text-xs text-red-500 mt-2">Please select a size.</p>
            )}
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className={`w-full py-4 text-xs tracking-widest uppercase transition-all duration-300 mb-3 ${
              added
                ? "bg-gray-800 text-white"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {added ? "Added to Cart ✓" : "Add to Cart"}
          </button>

          {/* View Cart */}
          {added && (
            <button
              onClick={() => router.push("/cart")}
              className="w-full py-4 text-xs tracking-widest uppercase border border-black hover:bg-black hover:text-white transition-all duration-300 mb-3"
            >
              View Cart
            </button>
          )}

          {/* Description */}
          <div className="mt-8 pt-8 border-t border-black/10">
            <button className="flex items-center justify-between w-full text-xs tracking-widest uppercase mb-4">
              Description
            </button>
            <p className="text-sm text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-black/10">
            <p className="text-xs tracking-widest uppercase mb-3">Details</p>
            <ul className="space-y-1">
              <li className="text-xs text-gray-500">Style: {product.id.toUpperCase()}</li>
              <li className="text-xs text-gray-500">Collection: {product.collection}</li>
              <li className="text-xs text-gray-500">Free returns within 30 days</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
