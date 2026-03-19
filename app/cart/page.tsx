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
        <div className="flex items-center px-6 md:px-10 h-[44px] border-b border-black/15">
          <span className="text-[10px] tracking-[0.2em] uppercase">Shopping Cart</span>
        </div>
        <div className="text-center py-24">
          <p className="text-[12px] text-gray-400 mb-8">Your cart is empty.</p>
          <Link
            href="/collections"
            className="text-[10px] tracking-[0.2em] uppercase border-b border-black pb-0.5 hover:opacity-50 transition-opacity"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center px-6 md:px-10 h-[44px] border-b border-black/15">
        <span className="text-[10px] tracking-[0.2em] uppercase">Shopping Cart</span>
      </div>

      <div className="grid md:grid-cols-3">
        <div className="md:col-span-2 md:border-r md:border-black/15">
          {state.items.map((item) => (
            <div
              key={`${item.product.id}-${item.size}`}
              className="grid grid-cols-[80px_1fr_auto] md:grid-cols-[100px_1fr_auto] gap-4 md:gap-5 p-5 md:px-10 md:py-8 border-b border-black/15"
            >
              <Link href={`/product/${item.product.id}`}>
                <div className="relative aspect-[3/4] overflow-hidden bg-[#f5f5f5]">
                  <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" sizes="100px" />
                </div>
              </Link>
              <div className="space-y-1.5 min-w-0">
                <Link href={`/product/${item.product.id}`}>
                  <p className="text-[12px] hover:opacity-50 transition-opacity truncate">{item.product.name}</p>
                </Link>
                <p className="text-[10px] text-gray-400">Size: {item.size}</p>
                <p className="text-[10px] text-gray-400">{formatPrice(item.product.price)}</p>
                <div className="flex items-center w-fit mt-2">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center text-[12px] border border-black/15 hover:bg-black hover:text-white transition-colors"
                  >−</button>
                  <span className="w-10 h-8 flex items-center justify-center text-[11px] border-y border-black/15">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-[12px] border border-black/15 hover:bg-black hover:text-white transition-colors"
                  >+</button>
                </div>
                <button
                  onClick={() => removeItem(item.product.id, item.size)}
                  className="text-[10px] text-gray-400 hover:text-black transition-colors underline mt-1 block"
                >Remove</button>
              </div>
              <div className="text-[12px] text-right whitespace-nowrap">
                {formatPrice(item.product.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>

        <div className="md:col-span-1">
          <div className="sticky top-[44px] p-6 md:p-8">
            <h2 className="text-[10px] tracking-[0.2em] uppercase mb-6">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-[11px] text-gray-500">Subtotal</span>
                <span className="text-[11px]">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[11px] text-gray-500">Shipping</span>
                <span className="text-[11px]">{totalPrice >= 200000 ? "Free" : formatPrice(15000)}</span>
              </div>
              <div className="pt-3 flex justify-between border-t border-black/15">
                <span className="text-[10px] tracking-[0.2em] uppercase">Total</span>
                <span className="text-[13px]">{formatPrice(totalPrice + (totalPrice >= 200000 ? 0 : 15000))}</span>
              </div>
            </div>
            <button
              onClick={() => router.push("/checkout")}
              className="w-full h-12 bg-black text-white text-[10px] tracking-[0.2em] uppercase hover:bg-gray-900 transition-colors"
            >Proceed to Checkout</button>
            <div className="mt-4 text-center">
              <Link href="/collections" className="text-[10px] text-gray-400 hover:text-black transition-colors underline">Continue Shopping</Link>
            </div>
            <p className="text-[10px] text-gray-400 text-center mt-6">Free shipping on orders over ₩200,000</p>
          </div>
        </div>
      </div>
    </div>
  );
}
