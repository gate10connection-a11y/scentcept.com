"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";


export default function CheckoutPage() {
  const { state, totalPrice } = useCart();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const shipping = totalPrice >= 200000 ? 0 : 15000;
  const total = totalPrice + shipping;

  if (state.items.length === 0) {
    return (
      <div className="max-w-screen-xl mx-auto px-6 py-20 text-center">
        <p className="text-sm text-gray-400 mb-8">Your cart is empty.</p>
        <Link
          href="/collections"
          className="text-xs tracking-widest uppercase border-b border-black pb-1"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const handleCheckout = async () => {
    if (!email) {
      alert("Please enter your email address.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: state.items,
          email,
        }),
      });

      const { url, error } = await response.json();

      if (error) {
        alert("Checkout error: " + error);
        setLoading(false);
        return;
      }

      if (url) {
        window.location.href = url;
      } else {
        // Demo mode: redirect to order confirmation
        window.location.href = "/order-confirmation?demo=true";
      }
    } catch {
      // Demo mode fallback
      window.location.href = "/order-confirmation?demo=true";
    }
    setLoading(false);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-12">
      <h1 className="text-xs tracking-widest uppercase mb-12">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-16">
        {/* Left - Form */}
        <div className="space-y-8">
          {/* Contact */}
          <div>
            <h2 className="text-xs tracking-widest uppercase mb-4">Contact</h2>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-black/20 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
            />
          </div>

          {/* Shipping */}
          <div>
            <h2 className="text-xs tracking-widest uppercase mb-4">Shipping Address</h2>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="First name"
                  className="border border-black/20 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                />
                <input
                  type="text"
                  placeholder="Last name"
                  className="border border-black/20 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                />
              </div>
              <input
                type="text"
                placeholder="Address"
                className="w-full border border-black/20 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
              />
              <input
                type="text"
                placeholder="Apartment, suite, etc. (optional)"
                className="w-full border border-black/20 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="City"
                  className="border border-black/20 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                />
                <input
                  type="text"
                  placeholder="Postal code"
                  className="border border-black/20 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Stripe Notice */}
          <div className="bg-gray-50 p-4 text-xs text-gray-500 leading-relaxed">
            <p className="font-medium text-black mb-1">Secure Payment via Stripe</p>
            <p>
              You will be redirected to Stripe&apos;s secure checkout to complete your payment.
              Add your Stripe publishable key in <code className="bg-gray-200 px-1">.env.local</code> to enable live payments.
            </p>
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className={`w-full py-4 text-xs tracking-widest uppercase transition-all duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {loading ? "Processing..." : "Complete Order"}
          </button>
        </div>

        {/* Right - Order Summary */}
        <div>
          <h2 className="text-xs tracking-widest uppercase mb-6">Order Summary</h2>
          <div className="space-y-4 mb-6">
            {state.items.map((item) => (
              <div
                key={`${item.product.id}-${item.size}`}
                className="flex gap-4 items-start"
              >
                <div className="relative w-16 aspect-[3/4] bg-gray-50 flex-shrink-0">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-black text-white text-[10px] flex items-center justify-center rounded-full">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm">{item.product.name}</p>
                  <p className="text-xs text-gray-400 mt-1">Size: {item.size}</p>
                </div>
                <p className="text-sm">
                  {formatPrice(item.product.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-black/10 pt-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-xs text-gray-500">Subtotal</span>
              <span className="text-xs">{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-500">Shipping</span>
              <span className="text-xs">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between border-t border-black/10 pt-3">
              <span className="text-xs tracking-widest uppercase">Total</span>
              <span className="text-sm">{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
