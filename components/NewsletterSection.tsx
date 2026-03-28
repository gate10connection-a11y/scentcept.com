"use client";

import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setEmail("");
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  }

  return (
    <section className="ab-t">
      <div className="px-5 md:px-8 py-16 md:py-20 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        {/* 텍스트 */}
        <div className="md:max-w-sm">
          <h2 className="text-[11px] tracking-[0.25em] uppercase mb-3">
            Join Our Newsletter
          </h2>
          <p className="text-[11px] text-gray-400 leading-relaxed">
            Get exclusive access to new collections, special offers, and more.
          </p>
        </div>

        {/* 폼 */}
        <div className="md:w-[400px] lg:w-[480px]">
          {status === "success" ? (
            <p className="text-[11px] tracking-[0.15em] uppercase">
              Thank you for subscribing!
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="flex border-b border-black pb-1">
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading"}
                  required
                  className="flex-1 text-[11px] py-1.5 outline-none bg-transparent placeholder-gray-400 min-w-0 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="text-[11px] py-1.5 pl-4 hover:opacity-40 transition-opacity duration-200 flex-shrink-0 disabled:opacity-30"
                  aria-label="Subscribe"
                >
                  {status === "loading" ? "..." : "Subscribe"}
                </button>
              </div>
              {status === "error" && (
                <p className="text-[10px] text-red-500 mt-2">{errorMsg}</p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
