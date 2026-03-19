import Image from "next/image";
import Link from "next/link";
import { getNewProducts, products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  const newProducts = getNewProducts();
  const allProducts = products.slice(0, 8);

  return (
    <div>
      {/* Hero — full bleed, Acne Studios editorial style */}
      <section className="relative w-full h-[100vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80"
          alt="Hero"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Bottom-left: season label + CTA — Acne style */}
        <div className="absolute bottom-8 left-6 md:bottom-12 md:left-10">
          <p className="text-[10px] tracking-[0.25em] uppercase text-white/70 mb-3">
            Spring / Summer 2026
          </p>
          <h1
            className="text-white text-xl md:text-2xl font-light tracking-[0.04em] mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            New Collection
          </h1>
          <Link
            href="/collections"
            className="inline-block text-[10px] tracking-[0.2em] uppercase text-white border-b border-white/60 pb-0.5 hover:border-white transition-colors duration-300"
          >
            Enter
          </Link>
        </div>
      </section>

      {/* Product Grid — tight, Acne Studios style: no section padding, edge-to-edge feel */}
      <section className="px-0">
        {/* Section label bar */}
        <div
          className="flex items-center justify-between px-6 md:px-10 h-11"
          style={{ borderBottom: "var(--border)" }}
        >
          <span className="text-[10px] tracking-[0.2em] uppercase">New Arrivals</span>
          <Link
            href="/collections"
            className="text-[10px] tracking-[0.15em] uppercase text-gray-400 hover:text-black transition-colors"
          >
            View All
          </Link>
        </div>

        {/* Grid — tight gaps like Acne */}
        <div className="grid grid-cols-2 md:grid-cols-4">
          {newProducts.map((product, i) => (
            <div
              key={product.id}
              style={{
                borderRight: (i + 1) % 4 !== 0 ? "var(--border)" : "none",
                borderBottom: "var(--border)",
              }}
              className="md:[&:nth-child(n+5)]:border-b-0"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* Editorial Image — full bleed, Acne style */}
      <section className="relative w-full aspect-[16/7] md:aspect-[16/6] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&q=80"
          alt="Editorial"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute bottom-8 left-6 md:bottom-12 md:left-10">
          <p className="text-[10px] tracking-[0.25em] uppercase text-white/70 mb-3">
            The Collection
          </p>
          <p
            className="text-white text-lg md:text-xl font-light tracking-[0.02em] mb-5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Crafted with intention
          </p>
          <Link
            href="/collections"
            className="inline-block text-[10px] tracking-[0.2em] uppercase text-white border-b border-white/60 pb-0.5 hover:border-white transition-colors duration-300"
          >
            Enter
          </Link>
        </div>
      </section>

      {/* Shop by Category — Acne grid cell style */}
      <section>
        <div
          className="flex items-center px-6 md:px-10 h-11"
          style={{ borderBottom: "var(--border)" }}
        >
          <span className="text-[10px] tracking-[0.2em] uppercase">Shop by Category</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3">
          {[
            { name: "Outerwear", img: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=80" },
            { name: "Tops", img: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&q=80" },
            { name: "Bottoms", img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80" },
            { name: "Bags", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80" },
            { name: "Footwear", img: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&q=80" },
            { name: "Accessories", img: "https://images.unsplash.com/photo-1601924638867-3a6de6b7a500?w=600&q=80" },
          ].map((cat, i) => (
            <Link
              key={cat.name}
              href="/collections"
              className="group relative aspect-[4/5] overflow-hidden bg-[#f5f5f5]"
              style={{
                borderRight: (i + 1) % 3 !== 0 ? "var(--border)" : "none",
                borderBottom: "var(--border)",
              }}
            >
              <Image
                src={cat.img}
                alt={cat.name}
                fill
                className="object-cover transition-opacity duration-500 group-hover:opacity-80"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 flex items-end p-5">
                <p className="text-white text-[10px] tracking-[0.2em] uppercase">
                  {cat.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* All Products — Acne style full grid */}
      <section>
        <div
          className="flex items-center justify-between px-6 md:px-10 h-11"
          style={{ borderBottom: "var(--border)" }}
        >
          <span className="text-[10px] tracking-[0.2em] uppercase">All Products</span>
          <Link
            href="/collections"
            className="text-[10px] tracking-[0.15em] uppercase text-gray-400 hover:text-black transition-colors"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4">
          {allProducts.map((product, i) => (
            <div
              key={product.id}
              style={{
                borderRight: (i + 1) % 4 !== 0 ? "var(--border)" : "none",
                borderBottom: "var(--border)",
              }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
