import { Product } from "./types";
import { sanityClient, urlFor, isSanityConfigured } from "./sanity";

// Mock data (fallback when Sanity is not configured)
export const mockProducts: Product[] = [
  {
    id: "p001",
    name: "Oversized Wool Coat",
    price: 1290000,
    description:
      "A relaxed-fit wool coat crafted from a premium double-faced wool blend. Features a notched lapel collar, two front pockets, and a single-button closure. The oversized silhouette is a cornerstone of our minimalist approach to outerwear.",
    category: "Outerwear",
    images: [
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: true,
    collection: "SS2026",
  },
  {
    id: "p002",
    name: "Mohair Blend Scarf",
    price: 390000,
    description:
      "Lightweight mohair-blend scarf with raw edges. A timeless accessory that elevates any look with understated luxury.",
    category: "Accessories",
    images: [
      "https://images.unsplash.com/photo-1601924638867-3a6de6b7a500?w=800&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80",
    ],
    sizes: ["ONE SIZE"],
    isNew: true,
    collection: "SS2026",
  },
  {
    id: "p003",
    name: "Tailored Wool Trousers",
    price: 590000,
    description:
      "Slim-fit tailored trousers in a refined wool blend. A straight leg with a subtle taper, side pockets, and an invisible zip closure.",
    category: "Bottoms",
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80",
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: false,
    collection: "SS2026",
  },
  {
    id: "p004",
    name: "Relaxed Cotton Shirt",
    price: 350000,
    description:
      "A relaxed-fit shirt in crisp organic cotton poplin. Features a classic collar, single chest pocket, and a slightly longer back hem.",
    category: "Tops",
    images: [
      "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: false,
    collection: "SS2026",
  },
  {
    id: "p005",
    name: "Leather Tote Bag",
    price: 890000,
    description:
      "A structured tote bag in smooth calf leather. Features an open top, inner zip pocket, and leather handles.",
    category: "Bags",
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    ],
    sizes: ["ONE SIZE"],
    isNew: true,
    collection: "SS2026",
  },
  {
    id: "p006",
    name: "Merino Knit Sweater",
    price: 490000,
    description:
      "A fine-knit sweater in 100% merino wool. Features a crew neck, ribbed trims, and a slightly relaxed fit.",
    category: "Tops",
    images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cda3a40?w=800&q=80",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: false,
    collection: "SS2026",
  },
  {
    id: "p007",
    name: "Chelsea Ankle Boots",
    price: 790000,
    description:
      "Classic Chelsea boots in polished calf leather. Features an elastic side panel, a rounded toe, and a stacked leather heel.",
    category: "Footwear",
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80",
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&q=80",
    ],
    sizes: ["36", "37", "38", "39", "40", "41", "42"],
    isNew: true,
    collection: "SS2026",
  },
  {
    id: "p008",
    name: "Straight Leg Denim",
    price: 450000,
    description:
      "High-waisted straight-leg jeans in rigid indigo denim. Features a five-pocket construction and a zip fly.",
    category: "Bottoms",
    images: [
      "https://images.unsplash.com/photo-1475178626620-a4d074967f8c?w=800&q=80",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80",
    ],
    sizes: ["24", "25", "26", "27", "28", "29", "30"],
    isNew: false,
    collection: "SS2026",
  },
];

// Sanity GROQ query for products
const PRODUCTS_QUERY = `*[_type == "product"] | order(_createdAt desc) {
  "id": _id,
  name,
  price,
  description,
  category,
  "images": images[].asset->url,
  sizes,
  isNew,
  collection,
  "slug": slug.current
}`

// Transform Sanity product to our Product type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformSanityProduct(item: any): Product {
  return {
    id: item.id,
    name: item.name,
    price: item.price,
    description: item.description || '',
    category: item.category || '',
    images: item.images || [],
    sizes: item.sizes || [],
    isNew: item.isNew || false,
    collection: item.collection || '',
  }
}

// Fetch all products (Sanity if configured, otherwise mock data)
export async function getProducts(): Promise<Product[]> {
  if (!isSanityConfigured()) {
    return mockProducts
  }
  try {
    const data = await sanityClient.fetch<unknown[]>(PRODUCTS_QUERY)
    if (data && Array.isArray(data) && data.length > 0) {
      return data.map(transformSanityProduct)
    }
    // Fallback to mock data if Sanity returns empty
    return mockProducts
  } catch (error) {
    console.error('Failed to fetch products from Sanity:', error)
    return mockProducts
  }
}

// Sync export for backward compatibility (uses mock data)
export const products: Product[] = mockProducts

export function getProductById(id: string): Product | undefined {
  return mockProducts.find((p) => p.id === id);
}

export async function getProductByIdAsync(id: string): Promise<Product | undefined> {
  if (!isSanityConfigured()) {
    return mockProducts.find((p) => p.id === id)
  }
  try {
    const query = `*[_type == "product" && _id == $id][0] {
      "id": _id,
      name,
      price,
      description,
      category,
      "images": images[].asset->url,
      sizes,
      isNew,
      collection
    }`
    const data = await sanityClient.fetch(query, { id })
    if (data) return transformSanityProduct(data)
    return mockProducts.find((p) => p.id === id)
  } catch {
    return mockProducts.find((p) => p.id === id)
  }
}

export function getNewProducts(): Product[] {
  return mockProducts.filter((p) => p.isNew);
}

export async function getNewProductsAsync(): Promise<Product[]> {
  const all = await getProducts()
  return all.filter((p) => p.isNew)
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  }).format(price);
}

// Re-export urlFor for image URL generation from Sanity
export { urlFor }
