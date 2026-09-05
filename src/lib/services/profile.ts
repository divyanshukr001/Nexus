import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import type { UserProfile } from '@/types/database';

export async function fetchUserProfile(userId: string): Promise<UserProfile | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.warn('Error fetching profile:', error.message);
      return null;
    }

    return data as UserProfile;
  } catch (err) {
    console.error('Unexpected error fetching user profile:', err);
    return null;
  }
}

export async function updateUserProfile(
  userId: string,
  updates: Partial<UserProfile>
): Promise<{ data: UserProfile | null; error: string | null }> {
  if (!isSupabaseConfigured()) {
    return { data: null, error: 'Supabase is not configured yet. Please check .env.local' };
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: data as UserProfile, error: null };
  } catch (err: any) {
    return { data: null, error: err?.message || 'Failed to update profile' };
  }
}
