import Image from "next/image";
import Link from "next/link";
import { getNewProducts, products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import HeroSection from "@/components/HeroSection";

const tileTextStyle = {
  fontSize: "11px",
  letterSpacing: "0.01em",
  fontFamily: "'Helvetica Now Text', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  color: "#000",
};

export default function HomePage() {
  const newProducts = getNewProducts();
  const allProducts = products.slice(0, 8);

  return (
    <div>
      {/* Section 1: Logo + Campaign — Acne Studios tile grid */}
      <HeroSection />

      {/* Section 2: Women / Men split tiles — Acne style 50/50 */}
      <section className="grid grid-cols-2">
        {/* Women tile */}
        <Link href="/women" className="group relative overflow-hidden" style={{ aspectRatio: "2/3" }}>
          <Image
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&q=85"
            alt="여성 신상품"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            sizes="50vw"
          />
          <div className="absolute top-0 left-0 p-3 md:p-4 z-10">
            <p style={tileTextStyle}>여성</p>
          </div>
          <div className="absolute top-0 left-0 p-3 md:p-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <p style={tileTextStyle}>
              <span className="hidden md:inline">여성 </span>&gt; 신상품
            </p>
          </div>
        </Link>

        {/* Men tile */}
        <Link href="/men" className="group relative overflow-hidden" style={{ aspectRatio: "2/3" }}>
          <Image
            src="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=900&q=85"
            alt="남성 신상품"
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
            sizes="50vw"
          />
          <div className="absolute top-0 left-0 p-3 md:p-4 z-10">
            <p style={tileTextStyle}>남성</p>
          </div>
          <div className="absolute top-0 left-0 p-3 md:p-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <p style={tileTextStyle}>
              <span className="hidden md:inline">남성 </span>&gt; 신상품
            </p>
          </div>
        </Link>
      </section>

      {/* Section 3: Full-width editorial — runway/collection */}
      <section>
        <Link href="/collections" className="group relative block overflow-hidden" style={{ aspectRatio: "16/9" }}>
          <Image
            src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1800&q=85"
            alt="2026 가을/겨울 런웨이"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            sizes="100vw"
          />
          <div className="absolute top-0 left-0 p-3 md:p-4 z-10">
            <p style={tileTextStyle}>2026 가을/겨울 런웨이</p>
          </div>
          <div className="absolute top-0 left-0 p-3 md:p-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <p style={tileTextStyle}>
              <span className="hidden md:inline">2026 가을/겨울 런웨이 </span>&gt; 여성 룩
            </p>
          </div>
        </Link>
      </section>

      {/* Section 4: Key Categories — 4-column grid, Acne style */}
      <section className="grid grid-cols-2 md:grid-cols-4">
        {[
          { name: "여성 진", nameHover: "더 보기", img: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600&q=80", href: "/women?cat=Bottoms" },
          { name: "백", nameHover: "더 보기", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80", href: "/collections" },
          { name: "티셔츠", nameHover: "더 보기", img: "https://images.unsplash.com/photo-1598033129183-c4f50c736c10?w=600&q=80", href: "/women?cat=Tops" },
          { name: "남성 진", nameHover: "더 보기", img: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80", href: "/men?cat=Bottoms" },
        ].map((cat) => (
          <Link
            key={cat.name}
            href={cat.href}
            className="group relative overflow-hidden"
            style={{ aspectRatio: "2/3" }}
          >
            <Image
              src={cat.img}
              alt={cat.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute top-0 left-0 p-3 md:p-4 z-10">
              <p style={tileTextStyle}>{cat.name}</p>
            </div>
            <div className="absolute top-0 left-0 p-3 md:p-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <p style={tileTextStyle}>
                <span className="hidden md:inline">{cat.name} </span>&gt; {cat.nameHover}
              </p>
            </div>
          </Link>
        ))}
      </section>

      {/* Section 5: All Products grid */}
      <section>
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
