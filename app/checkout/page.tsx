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
      <div>
        <div
          className="flex items-center px-6 md:px-10 h-11"
          style={{ borderBottom: "var(--border)" }}
        >
          <span className="text-[10px] tracking-[0.2em] uppercase">Checkout</span>
        </div>
        <div className="text-center py-24">
          <p className="text-[11px] text-gray-400 mb-8">Your cart is empty.</p>
          <Link
            href="/collections"
            className="text-[10px] tracking-[0.2em] uppercase border-b border-black pb-0.5"
          >
            Continue Shopping
          </Link>
        </div>
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
        body: JSON.stringify({ items: state.items, email }),
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
        window.location.href = "/order-confirmation?demo=true";
      }
    } catch {
      window.location.href = "/order-confirmation?demo=true";
    }
    setLoading(false);
  };

  return (
    <div>
      {/* Header bar */}
      <div
        className="flex items-center px-6 md:px-10 h-11"
        style={{ borderBottom: "var(--border)" }}
      >
        <span className="text-[10px] tracking-[0.2em] uppercase">Checkout</span>
      </div>

      <div className="grid md:grid-cols-2">
        {/* Left — Form */}
        <div style={{ borderRight: "var(--border)" }}>
          {/* Contact */}
          <div className="p-6 md:p-10" style={{ borderBottom: "var(--border)" }}>
            <h2 className="text-[10px] tracking-[0.2em] uppercase mb-5">Contact</h2>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 text-[12px] focus:outline-none transition-colors"
              style={{ border: "var(--border)" }}
            />
          </div>

          {/* Shipping Address */}
          <div className="p-6 md:p-10" style={{ borderBottom: "var(--border)" }}>
            <h2 className="text-[10px] tracking-[0.2em] uppercase mb-5">Shipping Address</h2>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="First name"
                  className="px-4 py-3 text-[12px] focus:outline-none transition-colors"
                  style={{ border: "var(--border)" }}
                />
                <input
                  type="text"
                  placeholder="Last name"
                  className="px-4 py-3 text-[12px] focus:outline-none transition-colors"
                  style={{ border: "var(--border)" }}
                />
              </div>
              <input
                type="text"
                placeholder="Address"
                className="w-full px-4 py-3 text-[12px] focus:outline-none transition-colors"
                style={{ border: "var(--border)" }}
              />
              <input
                type="text"
                placeholder="Apartment, suite, etc. (optional)"
                className="w-full px-4 py-3 text-[12px] focus:outline-none transition-colors"
                style={{ border: "var(--border)" }}
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="City"
                  className="px-4 py-3 text-[12px] focus:outline-none transition-colors"
                  style={{ border: "var(--border)" }}
                />
                <input
                  type="text"
                  placeholder="Postal code"
                  className="px-4 py-3 text-[12px] focus:outline-none transition-colors"
                  style={{ border: "var(--border)" }}
                />
              </div>
            </div>
          </div>

          {/* Payment notice + Submit */}
          <div className="p-6 md:p-10">
            <div className="p-4 mb-6 text-[11px] text-gray-500 leading-relaxed" style={{ border: "var(--border)" }}>
              <p className="font-medium text-black mb-1">Secure Payment via Stripe</p>
              <p>
                You will be redirected to Stripe&apos;s secure checkout to complete your payment.
              </p>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className={`w-full h-12 text-[10px] tracking-[0.2em] uppercase transition-all duration-200 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-black text-white hover:bg-gray-900"
              }`}
            >
              {loading ? "Processing..." : "Complete Order"}
            </button>
          </div>
        </div>

        {/* Right — Order Summary */}
        <div>
          <div className="p-6 md:p-10" style={{ borderBottom: "var(--border)" }}>
            <h2 className="text-[10px] tracking-[0.2em] uppercase mb-6">Order Summary</h2>

            <div className="space-y-5">
              {state.items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex gap-4 items-start"
                >
                  <div className="relative w-16 aspect-[3/4] bg-[#f5f5f5] flex-shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-black text-white text-[9px] flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-[12px]">{item.product.name}</p>
                    <p className="text-[10px] text-gray-400 mt-1">Size: {item.size}</p>
                  </div>
                  <p className="text-[12px]">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 md:p-10">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[11px] text-gray-500">Subtotal</span>
                <span className="text-[11px]">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[11px] text-gray-500">Shipping</span>
                <span className="text-[11px]">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between pt-3" style={{ borderTop: "var(--border)" }}>
                <span className="text-[10px] tracking-[0.2em] uppercase">Total</span>
                <span className="text-[13px]">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
