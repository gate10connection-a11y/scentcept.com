import { Product } from "./types";

export const products: Product[] = [
  {
    id: "p001",
    name: "Oversized Wool Coat",
    price: 1290000,
    description:
      "A relaxed-fit wool coat crafted from a premium double-faced wool blend. Features a notched lapel collar, two front pockets, and a single-button closure. The oversized silhouette is a cornerstone of our minimalist approach to outerwear.",
    category: "Outerwear",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: true,
    collection: "FW2024",
  },
  {
    id: "p002",
    name: "Face Logo Scarf",
    price: 390000,
    description:
      "Our iconic face logo scarf in a soft wool-blend. Featuring our signature embroidered face motif and fringe detail at both ends. A timeless accessory that elevates any look.",
    category: "Accessories",
    images: [
      "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&q=80",
      "https://images.unsplash.com/photo-1601924638867-3a6de6b7a500?w=800&q=80",
    ],
    sizes: ["ONE SIZE"],
    isNew: true,
    collection: "FW2024",
  },
  {
    id: "p003",
    name: "Slim Tailored Trousers",
    price: 590000,
    description:
      "Slim-fit tailored trousers in a refined wool blend. A straight leg with a subtle taper, side pockets, and an invisible zip closure. The perfect foundation for a polished, minimal wardrobe.",
    category: "Bottoms",
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4b4d8f?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: false,
    collection: "FW2024",
  },
  {
    id: "p004",
    name: "Relaxed Cotton Shirt",
    price: 350000,
    description:
      "A relaxed-fit shirt in crisp organic cotton poplin. Features a classic collar, single chest pocket, and a slightly longer back hem. An everyday essential reimagined.",
    category: "Tops",
    images: [
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=800&q=80",
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: false,
    collection: "SS2024",
  },
  {
    id: "p005",
    name: "Leather Tote Bag",
    price: 890000,
    description:
      "A structured tote bag in smooth calf leather. Features an open top, inner zip pocket, and leather handles. Spacious enough for everyday essentials while maintaining a refined silhouette.",
    category: "Bags",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
    ],
    sizes: ["ONE SIZE"],
    isNew: true,
    collection: "FW2024",
  },
  {
    id: "p006",
    name: "Merino Knit Sweater",
    price: 490000,
    description:
      "A fine-knit sweater in 100% merino wool. Features a crew neck, ribbed trims, and a slightly relaxed fit. An essential knitwear piece that transitions effortlessly from season to season.",
    category: "Tops",
    images: [
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: false,
    collection: "FW2024",
  },
  {
    id: "p007",
    name: "Chelsea Ankle Boots",
    price: 790000,
    description:
      "Classic Chelsea boots in polished calf leather. Features an elastic side panel, a rounded toe, and a stacked leather heel. A versatile footwear staple that pairs with everything.",
    category: "Footwear",
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80",
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&q=80",
    ],
    sizes: ["36", "37", "38", "39", "40", "41", "42"],
    isNew: true,
    collection: "FW2024",
  },
  {
    id: "p008",
    name: "High-Waist Denim Jeans",
    price: 450000,
    description:
      "High-waisted straight-leg jeans in rigid indigo denim. Features a five-pocket construction and a zip fly. A wardrobe cornerstone crafted with an unwavering commitment to quality.",
    category: "Bottoms",
    images: [
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80",
    ],
    sizes: ["24", "25", "26", "27", "28", "29", "30"],
    isNew: false,
    collection: "SS2024",
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getNewProducts(): Product[] {
  return products.filter((p) => p.isNew);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  }).format(price);
}
