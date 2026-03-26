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
        <Link href="/collections" className="text-[10px] tracking-[0.2em] uppercase border-b border-black pb-0.5">
          Back to Collections
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) { setSizeError(true); return; }
    setSizeError(false);
    addItem(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 px-4 md:px-10 h-[40px] text-[10px] text-gray-400 ab-b overflow-x-auto scrollbar-none">
        <Link href="/" className="hover:text-black transition-colors whitespace-nowrap">홈</Link>
        <span>/</span>
        <Link href="/collections" className="hover:text-black transition-colors whitespace-nowrap">컬렉션</Link>
        <span>/</span>
        <span className="text-black truncate">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2">
        {/* 이미지 영역 */}
        <div className="md:ab-r">
          {/* 메인 이미지 */}
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

          {/* 썸네일 */}
          {product.images.length > 1 && (
            <div className="flex ab-t">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative flex-1 overflow-hidden bg-[#f5f5f5] transition-opacity ${
                    selectedImage === i ? "opacity-100" : "opacity-40 hover:opacity-70"
                  } ${i < product.images.length - 1 ? "ab-r" : ""}`}
                  style={{ aspectRatio: "1/1" }}
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="120px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 상품 정보 영역 */}
        <div className="flex flex-col">
          {/* 제품명 & 가격 */}
          <div className="px-5 py-6 md:px-10 md:py-10 ab-b">
            <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-2">
              {product.category}
            </p>
            <h1
              className="text-[18px] md:text-xl font-medium tracking-[-0.01em] mb-3 leading-snug"
              style={{ fontFamily: "var(--font-primary)" }}
            >
              {product.name}
            </h1>
            <p className="text-[14px]">{formatPrice(product.price)}</p>
          </div>

          {/* 사이즈 선택 */}
          <div className="px-5 py-6 md:px-10 md:py-8 ab-b">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] tracking-[0.2em] uppercase">사이즈</p>
              <button className="text-[10px] text-gray-400 underline hover:text-black transition-colors">
                사이즈 가이드
              </button>
            </div>
            <div className="flex flex-wrap gap-0">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => { setSelectedSize(size); setSizeError(false); }}
                  className={`h-10 px-4 md:px-5 text-[10px] tracking-[0.1em] uppercase transition-colors duration-150 ab -mr-px -mb-px ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : "hover:bg-black hover:text-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {sizeError && (
              <p className="text-[10px] text-red-500 mt-3">사이즈를 선택해 주세요.</p>
            )}
          </div>

          {/* 장바구니 버튼 — 모바일에서 하단 고정 */}
          <div className="px-5 py-5 md:px-10 md:py-8 ab-b">
            <button
              onClick={handleAddToCart}
              className={`w-full h-12 md:h-12 text-[10px] tracking-[0.2em] uppercase transition-all duration-200 ${
                added ? "bg-gray-800 text-white" : "bg-black text-white hover:bg-gray-900"
              }`}
            >
              {added ? "장바구니에 추가됨 ✓" : "장바구니에 추가"}
            </button>
            {added && (
              <button
                onClick={() => router.push("/cart")}
                className="w-full h-12 mt-2 text-[10px] tracking-[0.2em] uppercase border border-black hover:bg-black hover:text-white transition-all duration-200"
              >
                장바구니 보기
              </button>
            )}
          </div>

          {/* 설명 */}
          <div className="px-5 py-6 md:px-10 md:py-8 ab-b">
            <p className="text-[10px] tracking-[0.2em] uppercase mb-4">제품 설명</p>
            <p className="text-[12px] text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          {/* 상세 정보 */}
          <div className="px-5 py-6 md:px-10 md:py-8">
            <p className="text-[10px] tracking-[0.2em] uppercase mb-4">상세 정보</p>
            <div className="space-y-2">
              <p className="text-[11px] text-gray-500">스타일: {product.id.toUpperCase()}</p>
              <p className="text-[11px] text-gray-500">컬렉션: {product.collection}</p>
              <p className="text-[11px] text-gray-500">30일 이내 무료 반품</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
