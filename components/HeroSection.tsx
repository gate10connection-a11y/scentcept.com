"use client";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Logo tile — scrolling marquee style */}
      <div className="logo-index" aria-hidden="true">
        <div className="logo-marquee">
          <span>Scentcept</span>
          <span>Scentcept</span>
          <span>Scentcept</span>
          <span>Scentcept</span>
        </div>
      </div>
    </section>
  );
}
