"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Suspense } from "react";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const isDemo = searchParams.get("demo") === "true";
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (isDemo || sessionId) {
      clearCart();
    }
  }, [isDemo, sessionId, clearCart]);

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-20 text-center">
      <div className="max-w-md mx-auto">
        {/* Check icon */}
        <div className="w-16 h-16 mx-auto mb-8 border border-black flex items-center justify-center">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <p className="text-xs tracking-widest uppercase text-gray-400 mb-3">
          Order Confirmed
        </p>
        <h1 className="text-3xl font-light mb-6">Thank You</h1>

        <p className="text-sm text-gray-500 leading-relaxed mb-4">
          {isDemo
            ? "This was a demo checkout. In production, your order would be confirmed here."
            : "Your order has been placed successfully. You will receive a confirmation email shortly."}
        </p>

        {sessionId && (
          <p className="text-xs text-gray-400 mb-8">
            Order reference: <span className="text-black">{sessionId.slice(-12).toUpperCase()}</span>
          </p>
        )}

        <div className="border-t border-black/10 pt-8 mt-8 space-y-4">
          <p className="text-xs text-gray-500">
            We&apos;ll send you shipping confirmation when your order is on its way.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Link
              href="/collections"
              className="text-xs tracking-widest uppercase bg-black text-white px-8 py-4 hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="text-xs tracking-widest uppercase border border-black px-8 py-4 hover:bg-black hover:text-white transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>

        {isDemo && (
          <div className="mt-12 bg-gray-50 p-6 text-left">
            <p className="text-xs tracking-widest uppercase mb-2">Demo Mode</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              To enable live Stripe payments, add your API keys to{" "}
              <code className="bg-gray-200 px-1">.env.local</code>:
            </p>
            <pre className="text-xs text-gray-600 mt-3 bg-gray-100 p-3 overflow-x-auto">
{`STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...`}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="max-w-screen-xl mx-auto px-6 py-20 text-center">
        <p className="text-sm text-gray-400">Loading...</p>
      </div>
    }>
      <OrderConfirmationContent />
    </Suspense>
  );
}
