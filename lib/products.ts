import { Product } from "./types";
import { sanityClient, urlFor, isSanityConfigured } from "./sanity";

// Mock data (fallback when Sanity is not configured)
export const mockProducts: Product[] = [
  // === WOMEN ===
  {
    id: "p001",
    name: "Oversized Wool Coat",
    price: 890,
    description: "A relaxed-fit wool coat crafted from a premium double-faced wool blend. Features a notched lapel collar, two front pockets, and a single-button closure.",
    category: "Outerwear",
    images: [
      "/images/product-1a.jpg",
      "/images/product-1b.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: true,
    collection: "SS2026",
    gender: "women",
  },
  {
    id: "p002",
    name: "Mohair Blend Scarf",
    price: 270,
    description: "Lightweight mohair-blend scarf with raw edges. A timeless accessory that elevates any look with understated luxury.",
    category: "Accessories",
    images: [
      "/images/product-2a.jpg",
      "/images/product-2b.jpg",
    ],
    sizes: ["ONE SIZE"],
    isNew: true,
    collection: "SS2026",
    gender: "unisex",
  },
  {
    id: "p003",
    name: "Tailored Wool Trousers",
    price: 410,
    description: "Slim-fit tailored trousers in a refined wool blend. A straight leg with a subtle taper, side pockets, and an invisible zip closure.",
    category: "Bottoms",
    images: [
      "/images/product-3a.jpg",
      "/images/product-3b.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: false,
    collection: "SS2026",
    gender: "women",
  },
  {
    id: "p004",
    name: "Relaxed Cotton Shirt",
    price: 240,
    description: "A relaxed-fit shirt in crisp organic cotton poplin. Features a classic collar, single chest pocket, and a slightly longer back hem.",
    category: "Tops",
    images: [
      "/images/product-4a.jpg",
      "/images/product-4b.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: false,
    collection: "SS2026",
    gender: "women",
  },
  {
    id: "p005",
    name: "Leather Tote Bag",
    price: 620,
    description: "A structured tote bag in smooth calf leather. Features an open top, inner zip pocket, and leather handles.",
    category: "Bags",
    images: [
      "/images/product-5a.jpg",
      "/images/product-5b.jpg",
    ],
    sizes: ["ONE SIZE"],
    isNew: true,
    collection: "SS2026",
    gender: "women",
  },
  {
    id: "p006",
    name: "Merino Knit Sweater",
    price: 340,
    description: "A fine-knit sweater in 100% merino wool. Features a crew neck, ribbed trims, and a slightly relaxed fit.",
    category: "Tops",
    images: [
      "/images/product-6a.jpg",
      "/images/product-6b.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: false,
    collection: "SS2026",
    gender: "women",
  },
  {
    id: "p007",
    name: "Chelsea Ankle Boots",
    price: 550,
    description: "Classic Chelsea boots in polished calf leather. Features an elastic side panel, a rounded toe, and a stacked leather heel.",
    category: "Footwear",
    images: [
      "/images/product-7a.jpg",
      "/images/product-7b.jpg",
    ],
    sizes: ["36", "37", "38", "39", "40", "41", "42"],
    isNew: true,
    collection: "SS2026",
    gender: "unisex",
  },
  {
    id: "p008",
    name: "Straight Leg Denim",
    price: 310,
    description: "High-waisted straight-leg jeans in rigid indigo denim. Features a five-pocket construction and a zip fly.",
    category: "Bottoms",
    images: [
      "/images/product-8a.jpg",
      "/images/product-8b.jpg",
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
    price: 820,
    description: "Single-breasted suit jacket in a soft wool-blend. Relaxed shoulders and a longer length for a contemporary silhouette.",
    category: "Outerwear",
    images: [
      "/images/product-9a.jpg",
      "/images/product-9b.jpg",
    ],
    sizes: ["44", "46", "48", "50", "52"],
    isNew: true,
    collection: "SS2026",
    gender: "men",
  },
  {
    id: "p010",
    name: "Oversized Cotton Tee",
    price: 200,
    description: "Boxy-fit T-shirt in heavyweight organic cotton. Features a ribbed crew neck and a relaxed drop shoulder.",
    category: "Tops",
    images: [
      "/images/product-10a.jpg",
      "/images/product-10b.jpg",
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
    price: 360,
    description: "Wide-leg chinos in brushed cotton twill. Features a high waist with belt loops and a straight leg.",
    category: "Bottoms",
    images: [
      "/images/product-11a.jpg",
      "/images/product-11b.jpg",
    ],
    sizes: ["28", "30", "32", "34", "36"],
    isNew: false,
    collection: "SS2026",
    gender: "men",
  },
  {
    id: "p012",
    name: "Leather Crossbody Bag",
    price: 480,
    description: "Compact crossbody bag in grained leather. Features an adjustable strap, zip closure, and interior card slots.",
    category: "Bags",
    images: [
      "/images/product-12a.jpg",
      "/images/product-12b.jpg",
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
  return `$${String(price).padStart(5, "0")}`;
}

export { urlFor }
