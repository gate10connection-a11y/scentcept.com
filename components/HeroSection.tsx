"use client";

import { useEffect, useState } from "react";

export default function HeroSection() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      setIsVisible(scrollY < 800);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center pointer-events-none z-[9999] transition-all duration-500 ease-in-out
        ${isScrolled ? "scale-75" : "scale-100"}
        ${isVisible ? "opacity-100" : "opacity-0"}
      `}
    >
      <span className="logo-overlay-text">Scentcept</span>
    </div>
  );
}
