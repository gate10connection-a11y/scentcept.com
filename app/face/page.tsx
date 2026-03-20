import Image from "next/image";
import Link from "next/link";

export default function FacePage() {
  return (
    <div>
      <div className="flex items-center px-6 md:px-10 h-[44px] ab-b">
        <span style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" }}>Face</span>
      </div>

      <section className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden ab-b">
        <Image
          src="/images/pages/face-hero.jpg"
          alt="Face Collection"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-8 left-6 md:bottom-12 md:left-10">
          <p style={{ fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: "12px" }}>
            Skincare Collection
          </p>
          <p style={{ fontFamily: "var(--font-primary)", color: "#fff", fontSize: "20px", fontWeight: 300, marginBottom: "20px" }}>
            Essential care for every day
          </p>
          <Link
            href="/collections"
            style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#fff", borderBottom: "1px solid rgba(255,255,255,0.5)", paddingBottom: "2px" }}
          >
            Coming Soon
          </Link>
        </div>
      </section>

      <div className="grid md:grid-cols-3">
        {["Cleanser", "Moisturizer", "Serum"].map((item, i) => (
          <div key={item} className={`p-8 md:p-12 ${i < 2 ? "ab-r" : ""} ab-b`}>
            <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "12px" }}>{item}</p>
            <p style={{ fontSize: "12px", color: "#888", lineHeight: 1.6 }}>
              Our {item.toLowerCase()} is formulated with natural ingredients for gentle, effective skincare.
            </p>
            <p style={{ fontSize: "10px", color: "#ccc", marginTop: "16px", letterSpacing: "0.15em", textTransform: "uppercase" }}>Coming Soon</p>
          </div>
        ))}
      </div>
    </div>
  );
}
