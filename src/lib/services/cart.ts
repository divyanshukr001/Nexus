import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import type { CartItem } from '@/types/database';

export async function fetchUserCart(userId: string): Promise<CartItem[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('cart_items')
      .select('*, product:products(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Error fetching cart:', error.message);
      return [];
    }

    return (data || []) as CartItem[];
  } catch (err) {
    console.error('Error fetching cart from Supabase:', err);
    return [];
  }
}

export async function addToUserCart(
  userId: string,
  productId: string,
  quantity = 1
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase is not configured' };
  }

  try {
    const supabase = createClient();
    // Check if item exists
    const { data: existing } = await supabase
      .from('cart_items')
      .select('id, quantity')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .maybeSingle();

    if (existing) {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity: existing.quantity + quantity })
        .eq('id', existing.id);

      if (error) return { success: false, error: error.message };
    } else {
      const { error } = await supabase.from('cart_items').insert({
        user_id: userId,
        product_id: productId,
        quantity,
      });

      if (error) return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to add item to cart' };
  }
}
