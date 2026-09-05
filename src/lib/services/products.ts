import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import type { Product } from '@/types/database';

export const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'X-PRO Cyber Deck Neural Terminal',
    slug: 'x-pro-cyber-deck',
    description: 'Next-gen neural interface tuned for low latency mental inputs, dual haptic triggers and ultra-dense OLED status indicators.',
    price: 899.00,
    original_price: 1199.00,
    category: 'Cyberware',
    image_url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80',
    rating: 4.9,
    reviews_count: 142,
    stock: 25,
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'prod-2',
    name: 'Chronos Holographic Smartwatch',
    slug: 'chronos-holo-smartwatch',
    description: 'Titanium bezel with volumetric floating projection and biometric health tracking.',
    price: 199.00,
    original_price: 299.00,
    category: 'Cyberware',
    image_url: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80',
    rating: 4.8,
    reviews_count: 98,
    stock: 40,
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'prod-3',
    name: 'Neuro-Link Pro Earbuds',
    slug: 'neuro-link-earbuds',
    description: 'Lossless spatial audio with active sensory isolation and direct neural audio transmission.',
    price: 149.00,
    original_price: 249.00,
    category: 'Electronics',
    image_url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80',
    rating: 4.7,
    reviews_count: 312,
    stock: 75,
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'prod-4',
    name: 'Air Neo Launch Sneakers',
    slug: 'air-neo-launch-sneakers',
    description: 'Adaptive cushioned gravity soles with neon electro-luminescent accents.',
    price: 189.00,
    original_price: 240.00,
    category: 'Fashion',
    image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    rating: 4.9,
    reviews_count: 215,
    stock: 30,
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'prod-5',
    name: 'Urban Steppers Cyber High-Top',
    slug: 'urban-steppers-high-top',
    description: 'Weatherproof nanotech fiber upper with impact dispersion cushioning.',
    price: 165.00,
    original_price: 210.00,
    category: 'Fashion',
    image_url: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80',
    rating: 4.6,
    reviews_count: 88,
    stock: 45,
    is_featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 'prod-6',
    name: 'Quantum Air Purifier & Ionizer',
    slug: 'quantum-air-purifier',
    description: 'Continuous molecular sterilization and particulate capture with ambient status halo.',
    price: 299.00,
    original_price: 399.00,
    category: 'Appliances',
    image_url: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80',
    rating: 4.8,
    reviews_count: 64,
    stock: 18,
    is_featured: false,
    created_at: new Date().toISOString(),
  },
];

export async function fetchProducts(options?: {
  category?: string;
  featured?: boolean;
  limit?: number;
}): Promise<Product[]> {
  if (!isSupabaseConfigured()) {
    let list = [...FALLBACK_PRODUCTS];
    if (options?.category) {
      list = list.filter(p => p.category.toLowerCase() === options.category?.toLowerCase());
    }
    if (options?.featured !== undefined) {
      list = list.filter(p => p.is_featured === options.featured);
    }
    if (options?.limit) {
      list = list.slice(0, options.limit);
    }
    return list;
  }

  try {
    const supabase = createClient();
    let query = supabase.from('products').select('*').order('created_at', { ascending: false });

    if (options?.category) {
      query = query.ilike('category', options.category);
    }
    if (options?.featured !== undefined) {
      query = query.eq('is_featured', options.featured);
    }
    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      // Fallback if table is not yet seeded
      let list = [...FALLBACK_PRODUCTS];
      if (options?.category) {
        list = list.filter(p => p.category.toLowerCase() === options.category?.toLowerCase());
      }
      if (options?.featured !== undefined) {
        list = list.filter(p => p.is_featured === options.featured);
      }
      if (options?.limit) {
        list = list.slice(0, options.limit);
      }
      return list;
    }

    return data as Product[];
  } catch (err) {
    console.error('Error fetching products from Supabase:', err);
    return FALLBACK_PRODUCTS;
  }
}
