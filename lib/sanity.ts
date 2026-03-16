import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

export function isSanityConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
}

// Lazily create the client only when Sanity is configured
let _client: ReturnType<typeof createClient> | null = null

export function getSanityClient() {
  if (!isSanityConfigured()) {
    throw new Error('Sanity project ID is not configured')
  }
  if (!_client) {
    _client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  }
  return _client
}

// For convenience: a proxy-like export that is only used when configured
export const sanityClient = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetch: async <T = unknown>(query: string, params?: any): Promise<T> => {
    if (params !== undefined) {
      return getSanityClient().fetch<T>(query, params)
    }
    return getSanityClient().fetch<T>(query)
  },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return imageUrlBuilder(getSanityClient()).image(source)
}
