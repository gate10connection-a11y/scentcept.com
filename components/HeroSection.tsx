"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Logo tile — Acne Studios style: huge text spanning full viewport */}
      <div className="logo-index" aria-hidden="true">
        <span>Scentcept</span>
      </div>

      {/* Campaign image tile */}
      <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
        <Image
          src="/images/hero-wide.png"
          alt="Campaign"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          style={{ objectPosition: "center center" }}
        />

        {/* Campaign text overlay — top left, sticky style */}
        <div className="absolute top-0 left-0 p-3 md:p-4" style={{ zIndex: 3 }}>
          <p style={{
            fontSize: "11px",
            letterSpacing: "0.01em",
            color: "#000",
            fontFamily: "'Helvetica Now Text', 'Helvetica Neue', Helvetica, Arial, sans-serif",
          }}>
            캠페인 더 보기
          </p>
        </div>

        {/* Hover state text */}
        <div className="absolute top-0 left-0 p-3 md:p-4 opacity-0 hover:opacity-100 transition-opacity" style={{ zIndex: 4 }}>
          <p style={{
            fontSize: "11px",
            letterSpacing: "0.01em",
            color: "#000",
            fontFamily: "'Helvetica Now Text', 'Helvetica Neue', Helvetica, Arial, sans-serif",
          }}>
            <span className="hidden md:inline">캠페인 더 보기 </span>&gt; 2026 봄/여름 캠페인
          </p>
        </div>

        <Link
          href="/collections"
          className="absolute inset-0"
          style={{ zIndex: 2 }}
          aria-label="2026 봄/여름 캠페인"
        />
      </div>
    </section>
  );
}
