import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import type { Order } from '@/types/database';

export async function fetchUserOrders(userId: string): Promise<Order[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('orders')
      .select('*, items:order_items(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Error fetching orders:', error.message);
      return [];
    }

    return (data || []) as Order[];
  } catch (err) {
    console.error('Unexpected error fetching user orders:', err);
    return [];
  }
}
