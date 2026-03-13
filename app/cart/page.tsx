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
      <div className="max-w-screen-xl mx-auto px-6 py-20">
        <h1 className="text-xs tracking-widest uppercase mb-16">Shopping Cart</h1>
        <div className="text-center py-20">
          <p className="text-sm text-gray-400 mb-8">Your cart is empty.</p>
          <Link
            href="/collections"
            className="text-xs tracking-widest uppercase border-b border-black pb-1 hover:opacity-50 transition-opacity"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-12">
      <h1 className="text-xs tracking-widest uppercase mb-12">Shopping Cart</h1>

      <div className="grid md:grid-cols-3 gap-12">
        {/* Items */}
        <div className="md:col-span-2 space-y-0">
          {/* Header */}
          <div className="hidden md:grid grid-cols-[1fr_auto] gap-4 pb-4 border-b border-black/10">
            <p className="text-xs tracking-widest uppercase text-gray-400">Product</p>
            <p className="text-xs tracking-widest uppercase text-gray-400">Total</p>
          </div>

          {state.items.map((item) => (
            <div
              key={`${item.product.id}-${item.size}`}
              className="grid grid-cols-[80px_1fr_auto] md:grid-cols-[100px_1fr_auto] gap-4 py-6 border-b border-black/10"
            >
              {/* Image */}
              <Link href={`/product/${item.product.id}`}>
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="100px"
                  />
                </div>
              </Link>

              {/* Info */}
              <div className="space-y-2">
                <Link href={`/product/${item.product.id}`}>
                  <p className="text-sm hover:opacity-50 transition-opacity">{item.product.name}</p>
                </Link>
                <p className="text-xs text-gray-400">Size: {item.size}</p>
                <p className="text-xs text-gray-400">{formatPrice(item.product.price)}</p>

                {/* Quantity */}
                <div className="flex items-center gap-0 border border-black/10 w-fit mt-2">
                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, item.size, item.quantity - 1)
                    }
                    className="w-8 h-8 flex items-center justify-center text-sm hover:bg-black hover:text-white transition-colors"
                  >
                    −
                  </button>
                  <span className="w-10 h-8 flex items-center justify-center text-xs border-x border-black/10">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, item.size, item.quantity + 1)
                    }
                    className="w-8 h-8 flex items-center justify-center text-sm hover:bg-black hover:text-white transition-colors"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.product.id, item.size)}
                  className="text-xs text-gray-400 hover:text-black transition-colors underline mt-1 block"
                >
                  Remove
                </button>
              </div>

              {/* Total */}
              <div className="text-sm text-right">
                {formatPrice(item.product.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="md:col-span-1">
          <div className="bg-gray-50 p-6 sticky top-20">
            <h2 className="text-xs tracking-widest uppercase mb-6">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Subtotal</span>
                <span className="text-xs">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Shipping</span>
                <span className="text-xs">
                  {totalPrice >= 200000 ? "Free" : formatPrice(15000)}
                </span>
              </div>
              <div className="border-t border-black/10 pt-3 flex justify-between">
                <span className="text-xs tracking-widest uppercase">Total</span>
                <span className="text-sm">
                  {formatPrice(
                    totalPrice + (totalPrice >= 200000 ? 0 : 15000)
                  )}
                </span>
              </div>
            </div>

            <button
              onClick={() => router.push("/checkout")}
              className="w-full bg-black text-white py-4 text-xs tracking-widest uppercase hover:bg-gray-800 transition-colors"
            >
              Proceed to Checkout
            </button>

            <div className="mt-4 text-center">
              <Link
                href="/collections"
                className="text-xs text-gray-400 hover:text-black transition-colors underline"
              >
                Continue Shopping
              </Link>
            </div>

            <p className="text-xs text-gray-400 text-center mt-6">
              Free shipping on orders over ₩200,000
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
