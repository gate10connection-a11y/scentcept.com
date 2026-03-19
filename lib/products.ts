import { Product } from "./types";
import { sanityClient, urlFor, isSanityConfigured } from "./sanity";

// Mock data (fallback when Sanity is not configured)
export const mockProducts: Product[] = [
  // === WOMEN ===
  {
    id: "p001",
    name: "Oversized Wool Coat",
    price: 1290000,
    description: "A relaxed-fit wool coat crafted from a premium double-faced wool blend. Features a notched lapel collar, two front pockets, and a single-button closure.",
    category: "Outerwear",
    images: [
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: true,
    collection: "SS2026",
    gender: "women",
  },
  {
    id: "p002",
    name: "Mohair Blend Scarf",
    price: 390000,
    description: "Lightweight mohair-blend scarf with raw edges. A timeless accessory that elevates any look with understated luxury.",
    category: "Accessories",
    images: [
      "https://images.unsplash.com/photo-1601924638867-3a6de6b7a500?w=800&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80",
    ],
    sizes: ["ONE SIZE"],
    isNew: true,
    collection: "SS2026",
    gender: "unisex",
  },
  {
    id: "p003",
    name: "Tailored Wool Trousers",
    price: 590000,
    description: "Slim-fit tailored trousers in a refined wool blend. A straight leg with a subtle taper, side pockets, and an invisible zip closure.",
    category: "Bottoms",
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80",
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: false,
    collection: "SS2026",
    gender: "women",
  },
  {
    id: "p004",
    name: "Relaxed Cotton Shirt",
    price: 350000,
    description: "A relaxed-fit shirt in crisp organic cotton poplin. Features a classic collar, single chest pocket, and a slightly longer back hem.",
    category: "Tops",
    images: [
      "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: false,
    collection: "SS2026",
    gender: "women",
  },
  {
    id: "p005",
    name: "Leather Tote Bag",
    price: 890000,
    description: "A structured tote bag in smooth calf leather. Features an open top, inner zip pocket, and leather handles.",
    category: "Bags",
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    ],
    sizes: ["ONE SIZE"],
    isNew: true,
    collection: "SS2026",
    gender: "women",
  },
  {
    id: "p006",
    name: "Merino Knit Sweater",
    price: 490000,
    description: "A fine-knit sweater in 100% merino wool. Features a crew neck, ribbed trims, and a slightly relaxed fit.",
    category: "Tops",
    images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cda3a40?w=800&q=80",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: false,
    collection: "SS2026",
    gender: "women",
  },
  {
    id: "p007",
    name: "Chelsea Ankle Boots",
    price: 790000,
    description: "Classic Chelsea boots in polished calf leather. Features an elastic side panel, a rounded toe, and a stacked leather heel.",
    category: "Footwear",
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80",
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&q=80",
    ],
    sizes: ["36", "37", "38", "39", "40", "41", "42"],
    isNew: true,
    collection: "SS2026",
    gender: "unisex",
  },
  {
    id: "p008",
    name: "Straight Leg Denim",
    price: 450000,
    description: "High-waisted straight-leg jeans in rigid indigo denim. Features a five-pocket construction and a zip fly.",
    category: "Bottoms",
    images: [
      "https://images.unsplash.com/photo-1475178626620-a4d074967f8c?w=800&q=80",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80",
    ],
    sizes: ["24", "25", "26", "27", "28", "29", "30"],
    isNew: false,
    isSale: true,
    collection: "SS2026",
    gender: "women",
  },
  // === MEN ===
  {
    id: "p009",
    name: "Relaxed Suit Jacket",
    price: 1190000,
    description: "Single-breasted suit jacket in a soft wool-blend. Relaxed shoulders and a longer length for a contemporary silhouette.",
    category: "Outerwear",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&q=80",
    ],
    sizes: ["44", "46", "48", "50", "52"],
    isNew: true,
    collection: "SS2026",
    gender: "men",
  },
  {
    id: "p010",
    name: "Oversized Cotton Tee",
    price: 290000,
    description: "Boxy-fit T-shirt in heavyweight organic cotton. Features a ribbed crew neck and a relaxed drop shoulder.",
    category: "Tops",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: false,
    isSale: true,
    collection: "SS2026",
    gender: "men",
  },
  {
    id: "p011",
    name: "Wide Leg Chinos",
    price: 520000,
    description: "Wide-leg chinos in brushed cotton twill. Features a high waist with belt loops and a straight leg.",
    category: "Bottoms",
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80",
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80",
    ],
    sizes: ["28", "30", "32", "34", "36"],
    isNew: false,
    collection: "SS2026",
    gender: "men",
  },
  {
    id: "p012",
    name: "Leather Crossbody Bag",
    price: 690000,
    description: "Compact crossbody bag in grained leather. Features an adjustable strap, zip closure, and interior card slots.",
    category: "Bags",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
    ],
    sizes: ["ONE SIZE"],
    isNew: true,
    collection: "SS2026",
    gender: "men",
  },
];

// Sanity GROQ query for products
const PRODUCTS_QUERY = `*[_type == "product"] | order(_createdAt desc) {
  "id": _id, name, price, description, category,
  "images": images[].asset->url,
  sizes, isNew, collection, "slug": slug.current
}`

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformSanityProduct(item: any): Product {
  return {
    id: item.id, name: item.name, price: item.price,
    description: item.description || '', category: item.category || '',
    images: item.images || [], sizes: item.sizes || [],
    isNew: item.isNew || false, collection: item.collection || '',
    gender: item.gender || 'unisex',
  }
}

export async function getProducts(): Promise<Product[]> {
  if (!isSanityConfigured()) return mockProducts;
  try {
    const data = await sanityClient.fetch<unknown[]>(PRODUCTS_QUERY);
    if (data && Array.isArray(data) && data.length > 0) return data.map(transformSanityProduct);
    return mockProducts;
  } catch (error) {
    console.error('Failed to fetch products from Sanity:', error);
    return mockProducts;
  }
}

export const products: Product[] = mockProducts;

export function getProductById(id: string): Product | undefined {
  return mockProducts.find((p) => p.id === id);
}

export async function getProductByIdAsync(id: string): Promise<Product | undefined> {
  if (!isSanityConfigured()) return mockProducts.find((p) => p.id === id);
  try {
    const query = `*[_type == "product" && _id == $id][0] { "id": _id, name, price, description, category, "images": images[].asset->url, sizes, isNew, collection }`;
    const data = await sanityClient.fetch(query, { id });
    if (data) return transformSanityProduct(data);
    return mockProducts.find((p) => p.id === id);
  } catch { return mockProducts.find((p) => p.id === id); }
}

export function getNewProducts(): Product[] {
  return mockProducts.filter((p) => p.isNew);
}

export function getProductsByGender(gender: string): Product[] {
  return mockProducts.filter((p) => p.gender === gender || p.gender === "unisex");
}

export function getSaleProducts(): Product[] {
  return mockProducts.filter((p) => p.isSale);
}

export async function getNewProductsAsync(): Promise<Product[]> {
  const all = await getProducts();
  return all.filter((p) => p.isNew);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(price);
}

export { urlFor }
