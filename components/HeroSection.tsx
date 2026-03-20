"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (!wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      // Show logo when wrapper is in viewport
      setVisible(rect.bottom > 100 && rect.top < window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Fixed logo overlay — visible only while hero content is in view */}
      <div
        className="logo-overlay"
        aria-hidden="true"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <span>Scentcept</span>
      </div>

      {/* Invisible marker to track scroll position */}
      <div ref={wrapperRef} className="logo-scroll-marker" />
    </>
  );
}
