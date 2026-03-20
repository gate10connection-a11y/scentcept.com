"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const secondImage = product.images[1];

  return (
    <Link
      href={`/product/${product.id}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Product image */}
      <div className="relative overflow-hidden bg-[#f5f5f5] aspect-[3/4]">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className={`object-cover transition-opacity duration-500 ${
            hovered && secondImage ? "opacity-0" : "opacity-100"
          }`}
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {secondImage && (
          <Image
            src={secondImage}
            alt={product.name}
            fill
            className={`object-cover transition-opacity duration-500 ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        )}
      </div>

      {/* Product info */}
      <div className="px-4 py-3 md:px-5 md:py-4">
        <p className="text-[11px] tracking-[0.01em] leading-snug">
          {product.name}
        </p>
        <p className="text-[11px] text-gray-500 mt-0.5">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
