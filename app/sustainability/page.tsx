import Image from "next/image";

export default function SustainabilityPage() {
  return (
    <div>
      <div className="flex items-center px-6 md:px-10 h-[44px] ab-b">
        <span style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" }}>Sustainability</span>
      </div>

      <section className="relative w-full aspect-[21/9] overflow-hidden ab-b">
        <Image src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1600&q=85" alt="Sustainability" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-black/20" />
      </section>

      <div className="grid md:grid-cols-2">
        <div className="p-8 md:p-16 ab-r ab-b">
          <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", marginBottom: "16px" }}>Our Commitment</p>
          <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.8 }}>
            At Scentcept, sustainability is not a trend — it is a responsibility. We are committed to reducing our environmental impact through every step of our production process, from sourcing raw materials to final delivery.
          </p>
        </div>
        <div className="p-8 md:p-16 ab-b">
          <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", marginBottom: "16px" }}>Materials</p>
          <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.8 }}>
            We prioritise natural, organic, and recycled materials. Our cotton is 100% organic, our wool is responsibly sourced, and our packaging is made from recycled and recyclable materials.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3">
        <div className="p-8 md:p-12 ab-r ab-b">
          <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", marginBottom: "12px" }}>Production</p>
          <p style={{ fontSize: "12px", color: "#666", lineHeight: 1.8 }}>We work exclusively with certified factories that uphold fair labour practices and environmentally responsible manufacturing.</p>
        </div>
        <div className="p-8 md:p-12 ab-r ab-b">
          <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", marginBottom: "12px" }}>Packaging</p>
          <p style={{ fontSize: "12px", color: "#666", lineHeight: 1.8 }}>All packaging is plastic-free and made from FSC-certified recycled materials. We are working towards fully compostable packaging by 2027.</p>
        </div>
        <div className="p-8 md:p-12 ab-b">
          <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", marginBottom: "12px" }}>Transparency</p>
          <p style={{ fontSize: "12px", color: "#666", lineHeight: 1.8 }}>We believe in full transparency. Every product page includes information about its materials, origin, and environmental footprint.</p>
        </div>
      </div>
    </div>
  );
}
