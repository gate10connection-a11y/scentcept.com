"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/products";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { state, removeItem, updateQuantity, totalPrice } = useCart();
  const router = useRouter();

  if (state.items.length === 0) {
    return (
      <div>
        <div className="flex items-center px-5 md:px-10 h-[44px] ab-b">
          <span className="text-[10px] tracking-[0.2em] uppercase">장바구니</span>
        </div>
        <div className="text-center py-24 px-6">
          <p className="text-[12px] text-gray-400 mb-8">장바구니가 비어 있습니다.</p>
          <Link
            href="/collections"
            className="text-[10px] tracking-[0.2em] uppercase border-b border-black pb-0.5 hover:opacity-50 transition-opacity"
          >
            쇼핑 계속하기
          </Link>
        </div>
      </div>
    );
  }

  const shipping = totalPrice >= 200000 ? 0 : 15000;
  const total = totalPrice + shipping;

  return (
    <div>
      <div className="flex items-center px-5 md:px-10 h-[44px] ab-b">
        <span className="text-[10px] tracking-[0.2em] uppercase">장바구니</span>
      </div>

      <div className="grid md:grid-cols-3">
        {/* 상품 목록 */}
        <div className="md:col-span-2 md:ab-r">
          {state.items.map((item) => (
            <div
              key={`${item.product.id}-${item.size}`}
              className="grid grid-cols-[72px_1fr] md:grid-cols-[100px_1fr] gap-4 md:gap-6 p-4 md:px-10 md:py-8 ab-b"
            >
              {/* 상품 이미지 */}
              <Link href={`/product/${item.product.id}`} className="flex-shrink-0">
                <div className="relative overflow-hidden bg-[#f5f5f5]" style={{ aspectRatio: "3/4" }}>
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="100px"
                  />
                </div>
              </Link>

              {/* 상품 정보 */}
              <div className="flex flex-col justify-between min-w-0 py-0.5">
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <Link href={`/product/${item.product.id}`} className="flex-1 min-w-0">
                      <p className="text-[12px] leading-snug hover:opacity-50 transition-opacity line-clamp-2">
                        {item.product.name}
                      </p>
                    </Link>
                    <span className="text-[12px] flex-shrink-0">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">사이즈: {item.size}</p>
                  <p className="text-[10px] text-gray-400">{formatPrice(item.product.price)}</p>
                </div>

                {/* 수량 조절 + 삭제 */}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-[14px] ab hover:bg-black hover:text-white transition-colors"
                    >
                      −
                    </button>
                    <span className="w-8 h-8 flex items-center justify-center text-[11px] ab-t ab-b">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-[14px] ab hover:bg-black hover:text-white transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id, item.size)}
                    className="text-[10px] text-gray-400 hover:text-black transition-colors underline"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 주문 요약 */}
        <div className="md:col-span-1">
          <div className="sticky top-[44px] p-5 md:p-8">
            <h2 className="text-[10px] tracking-[0.2em] uppercase mb-6">주문 요약</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-[11px] text-gray-500">소계</span>
                <span className="text-[11px]">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[11px] text-gray-500">배송비</span>
                <span className="text-[11px]">
                  {shipping === 0 ? "무료" : formatPrice(shipping)}
                </span>
              </div>
              <div className="pt-3 flex justify-between ab-t">
                <span className="text-[10px] tracking-[0.2em] uppercase">합계</span>
                <span className="text-[13px]">{formatPrice(total)}</span>
              </div>
            </div>

            <button
              onClick={() => router.push("/checkout")}
              className="w-full h-12 bg-black text-white text-[10px] tracking-[0.2em] uppercase hover:bg-gray-900 transition-colors"
            >
              결제하기
            </button>

            <div className="mt-4 text-center">
              <Link
                href="/collections"
                className="text-[10px] text-gray-400 hover:text-black transition-colors underline"
              >
                쇼핑 계속하기
              </Link>
            </div>

            <p className="text-[10px] text-gray-400 text-center mt-6 leading-relaxed">
              ₩200,000 이상 주문 시 무료 배송
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
