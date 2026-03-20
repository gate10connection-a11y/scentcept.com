import Image from "next/image";

export default function AboutPage() {
  return (
    <div>
      <div className="flex items-center px-6 md:px-10 h-[44px] ab-b">
        <span style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" }}>About</span>
      </div>

      <section className="relative w-full aspect-[21/9] overflow-hidden ab-b">
        <Image src="/images/pages/about-hero.jpg" alt="About" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-black/20" />
      </section>

      <div className="grid md:grid-cols-2">
        <div className="p-8 md:p-16 ab-r ab-b">
          <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", marginBottom: "16px" }}>Our Story</p>
          <h1 style={{ fontFamily: "var(--font-primary)", fontSize: "24px", fontWeight: 500, marginBottom: "24px" }}>Scentcept</h1>
          <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.8 }}>
            Founded with the belief that fashion should be both intentional and accessible. We create pieces that transcend seasons, designed for the modern individual who values quality, simplicity, and self-expression.
          </p>
        </div>
        <div className="p-8 md:p-16 ab-b">
          <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", marginBottom: "16px" }}>Philosophy</p>
          <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.8, marginBottom: "20px" }}>
            Every piece in our collection is designed with a singular purpose — to be worn, to last, and to become part of your story. Premium materials, considered construction, minimal waste.
          </p>
          <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.8 }}>
            We believe in the power of restraint. By focusing on fewer, better things, we create garments that are as relevant today as they will be in years to come.
          </p>
        </div>
      </div>
    </div>
  );
}
