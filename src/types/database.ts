export interface UserProfile {
  id: string;
  email: string | null;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  role: 'customer' | 'seller' | 'admin';
  shipping_address?: {
    street?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
  } | null;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug?: string;
  description: string | null;
  price: number;
  original_price?: number | null;
  category: string;
  image_url: string | null;
  rating: number;
  reviews_count: number;
  stock: number;
  is_featured: boolean;
  created_at: string;
}

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  product?: Product;
}

export interface Order {
  id: string;
  user_id: string;
  order_number: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total_amount: number;
  shipping_address: {
    fullName?: string;
    street?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
  };
  payment_status?: string;
  created_at: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string | null;
  product_name: string;
  product_image?: string | null;
  quantity: number;
  price: number;
  created_at: string;
}
