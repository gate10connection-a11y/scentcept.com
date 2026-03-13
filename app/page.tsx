import Image from "next/image";
import Link from "next/link";
import { getNewProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  const newProducts = getNewProducts();

  return (
    <div>
      {/* Announcement bar — ultra thin */}
      <div className="bg-white border-b border-black/5 text-center py-2">
        <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400">
          Free shipping on orders over ₩200,000
        </p>
      </div>

      {/* Hero — full screen, minimal text overlay bottom-left */}
      <section className="relative w-full h-[calc(100vh-theme(spacing.12))] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80"
          alt="Hero"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* subtle dark gradient at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        {/* Bottom-left small text */}
        <div className="absolute bottom-10 left-8 text-white">
          <p className="text-[10px] tracking-[0.3em] uppercase mb-2 opacity-70">
            Fall / Winter 2024
          </p>
          <h1
            className="text-2xl font-light tracking-[0.05em] mb-5"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            New Collection
          </h1>
          <Link
            href="/collections"
            className="text-[10px] tracking-[0.25em] uppercase border-b border-white/70 pb-0.5 hover:border-white transition-colors duration-300"
          >
            Explore
          </Link>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-screen-2xl mx-auto px-6 py-20">
        <div className="flex items-baseline justify-between mb-10">
          <h2
            className="text-2xl md:text-3xl font-light tracking-wide"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            New Arrivals
          </h2>
          <Link
            href="/collections"
            className="text-[10px] tracking-[0.2em] uppercase hover:opacity-40 transition-opacity"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Editorial Banner */}
      <section className="bg-[#f7f6f4] py-24">
        <div className="max-w-screen-2xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80"
                alt="Editorial"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col justify-center space-y-6 md:px-16">
              <p className="text-[10px] tracking-[0.25em] uppercase text-gray-400">
                The Collection
              </p>
              <h2
                className="text-3xl md:text-4xl font-light leading-tight"
                style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
              >
                Crafted with
                <br />
                intention
              </h2>
              <p className="text-xs text-gray-500 leading-loose max-w-xs">
                Each piece in our collection is designed with a singular
                purpose — to be worn, to last, and to become part of your story.
                Premium materials, considered construction.
              </p>
              <Link
                href="/collections"
                className="inline-block text-[10px] tracking-[0.2em] uppercase border-b border-black pb-0.5 w-fit hover:opacity-40 transition-opacity"
              >
                Shop the Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="max-w-screen-2xl mx-auto px-6 py-20">
        <h2
          className="text-2xl md:text-3xl font-light tracking-wide mb-10"
          style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
        >
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {[
            {
              name: "Outerwear",
              img: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=80",
            },
            {
              name: "Tops",
              img: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&q=80",
            },
            {
              name: "Bottoms",
              img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80",
            },
            {
              name: "Bags",
              img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
            },
            {
              name: "Footwear",
              img: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&q=80",
            },
            {
              name: "Accessories",
              img: "https://images.unsplash.com/photo-1601924638867-3a6de6b7a500?w=600&q=80",
            },
          ].map((cat) => (
            <Link
              key={cat.name}
              href="/collections"
              className="group relative aspect-square overflow-hidden bg-[#f5f5f5]"
            >
              <Image
                src={cat.img}
                alt={cat.name}
                fill
                className="object-cover transition-opacity duration-500 group-hover:opacity-80"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 flex items-end p-4">
                <p className="text-white text-[10px] tracking-[0.2em] uppercase">
                  {cat.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
