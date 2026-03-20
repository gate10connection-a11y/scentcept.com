import Image from "next/image";
import Link from "next/link";
import { getNewProducts, products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  const newProducts = getNewProducts();
  const allProducts = products.slice(0, 8);

  return (
    <div>
      {/* Hero — full bleed campaign image, Acne Studios editorial */}
      <section className="relative w-full h-[100vh] overflow-hidden">
        <Image
          src="/images/hero-wide.png"
          alt="Campaign"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          style={{ objectPosition: "center center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute bottom-8 left-6 md:bottom-14 md:left-10">
          <p className="text-[10px] tracking-[0.25em] uppercase text-white/60 mb-3">
            Spring / Summer 2026
          </p>
          <h1
            className="text-white text-xl md:text-2xl font-light tracking-[0.04em] mb-6"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            New Collection
          </h1>
          <Link
            href="/collections"
            className="inline-block text-[10px] tracking-[0.2em] uppercase text-white border-b border-white/50 pb-0.5 hover:border-white transition-colors duration-300"
          >
            Enter
          </Link>
        </div>
      </section>

      {/* New Arrivals — bordered grid */}
      <section>
        <div className="flex items-center justify-between px-6 md:px-10 h-[44px] ab-b">
          <span className="text-[10px] tracking-[0.2em] uppercase">New Arrivals</span>
          <Link
            href="/collections"
            className="text-[10px] tracking-[0.15em] uppercase text-gray-400 hover:text-black transition-colors"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {newProducts.map((product, i) => (
            <div
              key={product.id}
              className={`${(i + 1) % 4 !== 0 ? "ab-r" : ""} ${i < 4 ? "ab-b" : ""}`}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* Editorial split — two campaign images side by side, Acne style */}
      <section className="grid md:grid-cols-2">
        <div className="relative aspect-[3/4] md:aspect-auto md:h-[80vh] overflow-hidden ab-r ab-b">
          <Image
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&q=85"
            alt="Editorial Women"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute bottom-8 left-6 md:bottom-10 md:left-8">
            <p className="text-[10px] tracking-[0.25em] uppercase text-white/60 mb-2">Women</p>
            <Link
              href="/collections"
              className="text-[10px] tracking-[0.2em] uppercase text-white border-b border-white/50 pb-0.5 hover:border-white transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
        <div className="relative aspect-[3/4] md:aspect-auto md:h-[80vh] overflow-hidden ab-b">
          <Image
            src="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=900&q=85"
            alt="Editorial Men"
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute bottom-8 left-6 md:bottom-10 md:left-8">
            <p className="text-[10px] tracking-[0.25em] uppercase text-white/60 mb-2">Men</p>
            <Link
              href="/collections"
              className="text-[10px] tracking-[0.2em] uppercase text-white border-b border-white/50 pb-0.5 hover:border-white transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Full-bleed editorial banner */}
      <section className="relative w-full aspect-[21/9] overflow-hidden ab-b">
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1800&q=85"
          alt="Campaign Editorial"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/15" />
        <div className="absolute bottom-8 left-6 md:bottom-12 md:left-10">
          <p className="text-[10px] tracking-[0.25em] uppercase text-white/60 mb-3">
            The Collection
          </p>
          <p
            className="text-white text-lg md:text-xl font-light tracking-[0.02em] mb-5"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            Crafted with intention
          </p>
          <Link
            href="/collections"
            className="inline-block text-[10px] tracking-[0.2em] uppercase text-white border-b border-white/50 pb-0.5 hover:border-white transition-colors duration-300"
          >
            Enter
          </Link>
        </div>
      </section>

      {/* Shop by Category — Acne grid cell style */}
      <section>
        <div className="flex items-center px-6 md:px-10 h-[44px] ab-b">
          <span className="text-[10px] tracking-[0.2em] uppercase">Shop by Category</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3">
          {[
            { name: "Outerwear", img: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600&q=80" },
            { name: "Tops", img: "https://images.unsplash.com/photo-1598033129183-c4f50c736c10?w=600&q=80" },
            { name: "Bottoms", img: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80" },
            { name: "Bags", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80" },
            { name: "Footwear", img: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=600&q=80" },
            { name: "Accessories", img: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&q=80" },
          ].map((cat, i) => (
            <Link
              key={cat.name}
              href="/collections"
              className={`group relative aspect-[4/5] overflow-hidden bg-[#f5f5f5] ${
                (i + 1) % 3 !== 0 ? "ab-r" : ""
              } ab-b`}
            >
              <Image
                src={cat.img}
                alt={cat.name}
                fill
                className="object-cover transition-opacity duration-500 group-hover:opacity-80"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/10" />
              <div className="absolute bottom-5 left-5">
                <p className="text-white text-[10px] tracking-[0.2em] uppercase">
                  {cat.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* All Products */}
      <section>
        <div className="flex items-center justify-between px-6 md:px-10 h-[44px] ab-b">
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
              className={`${(i + 1) % 4 !== 0 ? "ab-r" : ""} ab-b`}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
