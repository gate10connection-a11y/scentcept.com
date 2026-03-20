import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import HeroSection from "@/components/HeroSection";

const tileTextStyle = {
  fontSize: "11px",
  letterSpacing: "0.01em",
  fontFamily: "'Helvetica Now Text', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  color: "#000",
};

const tileTextStyleLight = {
  ...tileTextStyle,
  color: "#fff",
};

export default function HomePage() {
  const allProducts = products.slice(0, 8);

  return (
    <div>
      {/* Fixed logo + scroll marker */}
      <HeroSection />

      {/* Section 1: Women / Men split tiles — logo overlays this */}
      <section className="grid grid-cols-1 md:grid-cols-2 relative">
        <Link href="/women" className="group relative overflow-hidden" style={{ aspectRatio: "2/3" }}>
          <Image
            src="/images/home/women.jpg"
            alt="여성 신상품"
            fill
            priority
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

        <Link href="/men" className="group relative overflow-hidden" style={{ aspectRatio: "2/3" }}>
          <Image
            src="/images/home/men.jpg"
            alt="남성 신상품"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            sizes="50vw"
          />
          <div className="absolute top-0 left-0 p-3 md:p-4 z-10">
            <p style={tileTextStyleLight}>남성</p>
          </div>
          <div className="absolute top-0 left-0 p-3 md:p-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <p style={tileTextStyleLight}>
              <span className="hidden md:inline">남성 </span>&gt; 신상품
            </p>
          </div>
        </Link>
      </section>

      {/* Section 2: Campaign — logo still overlays */}
      <section>
        <Link href="/collections" className="group relative block overflow-hidden" style={{ aspectRatio: "16/9" }}>
          <Image
            src="/images/campaign/hero.jpg"
            alt="캠페인"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            sizes="100vw"
          />
          <div className="absolute top-0 left-0 p-3 md:p-4 z-10">
            <p style={tileTextStyleLight}>캠페인 더 보기</p>
          </div>
          <div className="absolute top-0 left-0 p-3 md:p-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <p style={tileTextStyleLight}>
              <span className="hidden md:inline">캠페인 더 보기 </span>&gt; 2026 봄/여름 캠페인
            </p>
          </div>
        </Link>
      </section>

      {/* Section 3: Full-width editorial */}
      <section>
        <Link href="/collections" className="group relative block overflow-hidden" style={{ aspectRatio: "16/9" }}>
          <Image
            src="/images/home/runway.jpg"
            alt="2026 가을/겨울 런웨이"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            sizes="100vw"
          />
          <div className="absolute top-0 left-0 p-3 md:p-4 z-10">
            <p style={tileTextStyleLight}>2026 가을/겨울 런웨이</p>
          </div>
          <div className="absolute top-0 left-0 p-3 md:p-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <p style={tileTextStyleLight}>
              <span className="hidden md:inline">2026 가을/겨울 런웨이 </span>&gt; 여성 룩
            </p>
          </div>
        </Link>
      </section>

      {/* Section 4: Key Categories */}
      <section className="grid grid-cols-2 md:grid-cols-4">
        {[
          { name: "여성 진", nameHover: "더 보기", img: "/images/categories/jeans-women.jpg", href: "/women?cat=Bottoms", dark: false },
          { name: "백", nameHover: "더 보기", img: "/images/categories/bags.jpg", href: "/collections", dark: true },
          { name: "티셔츠", nameHover: "더 보기", img: "/images/categories/tshirts.jpg", href: "/women?cat=Tops", dark: false },
          { name: "남성 진", nameHover: "더 보기", img: "/images/categories/jeans-men.jpg", href: "/men?cat=Bottoms", dark: true },
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
              <p style={cat.dark ? tileTextStyleLight : tileTextStyle}>{cat.name}</p>
            </div>
            <div className="absolute top-0 left-0 p-3 md:p-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <p style={cat.dark ? tileTextStyleLight : tileTextStyle}>
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
