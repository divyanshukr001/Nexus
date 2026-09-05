'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import type { UserProfile } from '@/types/database';
import { fetchUserProfile, updateUserProfile } from '@/lib/services/profile';

interface SignUpOptions {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
}

interface SignInOptions {
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  isLoading: boolean;
  isConfigured: boolean;
  signUp: (options: SignUpOptions) => Promise<{ error: string | null; needsEmailConfirmation?: boolean }>;
  signIn: (options: SignInOptions) => Promise<{ error: string | null }>;
  signInWithGoogle: () => Promise<{ error: string | null }>;
  signOut: () => Promise<{ error: string | null }>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: string | null }>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isConfigured = isSupabaseConfigured();

  const loadProfile = useCallback(async (userId: string) => {
    try {
      const userProfile = await fetchUserProfile(userId);
      setProfile(userProfile);
    } catch (err) {
      console.error('Error loading profile:', err);
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user?.id) {
      await loadProfile(user.id);
    }
  }, [user?.id, loadProfile]);

  useEffect(() => {
    if (!isConfigured) {
      // Local demo session restoration
      try {
        const storedUser = localStorage.getItem('nexus_auth_user');
        const storedProfile = localStorage.getItem('nexus_auth_profile');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        if (storedProfile) {
          setProfile(JSON.parse(storedProfile));
        }
      } catch (e) {
        console.warn('Error reading local session:', e);
      }
      setIsLoading(false);
      return;
    }

    const supabase = createClient();

    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user?.id) {
        loadProfile(session.user.id);
      }
      setIsLoading(false);
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);

      if (newSession?.user?.id) {
        await loadProfile(newSession.user.id);
      } else {
        setProfile(null);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [isConfigured, loadProfile]);

  const signUp = async ({
    email,
    password,
    fullName,
    phone,
  }: SignUpOptions): Promise<{ error: string | null; needsEmailConfirmation?: boolean }> => {
    if (!isConfigured) {
      // Local mode fallback
      const localUser: any = {
        id: 'usr_' + Math.random().toString(36).substring(2, 9),
        email,
        user_metadata: { full_name: fullName, phone: phone || '' },
        created_at: new Date().toISOString(),
      };
      const localProfile: UserProfile = {
        id: localUser.id,
        email,
        full_name: fullName,
        phone: phone || null,
        avatar_url: null,
        role: 'customer',
        shipping_address: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      try {
        localStorage.setItem('nexus_auth_user', JSON.stringify(localUser));
        localStorage.setItem('nexus_auth_profile', JSON.stringify(localProfile));
      } catch {}

      setUser(localUser);
      setProfile(localProfile);
      return { error: null, needsEmailConfirmation: false };
    }

    try {
      const supabase = createClient();
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone: phone || '',
          },
          emailRedirectTo: `${origin}/auth/callback`,
        },
      });

      if (error) {
        return { error: error.message };
      }

      // Check if session was created or confirmation is needed
      const needsEmailConfirmation = !data.session;
      if (data.user && !needsEmailConfirmation) {
        setUser(data.user);
        await loadProfile(data.user.id);
      }

      return { error: null, needsEmailConfirmation };
    } catch (err: any) {
      return { error: err?.message || 'Failed to sign up' };
    }
  };

  const signIn = async ({
    email,
    password,
  }: SignInOptions): Promise<{ error: string | null }> => {
    if (!isConfigured) {
      // Local mode fallback
      let localUser: any = null;
      let localProfile: UserProfile | null = null;
      try {
        const storedUser = localStorage.getItem('nexus_auth_user');
        const storedProfile = localStorage.getItem('nexus_auth_profile');
        if (storedUser) localUser = JSON.parse(storedUser);
        if (storedProfile) localProfile = JSON.parse(storedProfile);
      } catch {}

      if (!localUser || localUser.email !== email) {
        const name = email.split('@')[0];
        localUser = {
          id: 'usr_' + Math.random().toString(36).substring(2, 9),
          email,
          user_metadata: { full_name: name },
          created_at: new Date().toISOString(),
        };
        localProfile = {
          id: localUser.id,
          email,
          full_name: name,
          phone: null,
          avatar_url: null,
          role: 'customer',
          shipping_address: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
      }

      try {
        localStorage.setItem('nexus_auth_user', JSON.stringify(localUser));
        if (localProfile) {
          localStorage.setItem('nexus_auth_profile', JSON.stringify(localProfile));
        }
      } catch {}

      setUser(localUser);
      setProfile(localProfile);
      return { error: null };
    }

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error: error.message };
      }

      if (data.user) {
        setUser(data.user);
        setSession(data.session);
        await loadProfile(data.user.id);
      }

      return { error: null };
    } catch (err: any) {
      return { error: err?.message || 'Failed to sign in' };
    }
  };

  const signInWithGoogle = async (): Promise<{ error: string | null }> => {
    if (!isConfigured) {
      // Demo Google Sign In
      const googleUser: any = {
        id: 'usr_google_demo',
        email: 'google.user@example.com',
        user_metadata: { full_name: 'Nexus Explorer' },
        created_at: new Date().toISOString(),
      };
      const googleProfile: UserProfile = {
        id: googleUser.id,
        email: 'google.user@example.com',
        full_name: 'Nexus Explorer',
        phone: null,
        avatar_url: null,
        role: 'customer',
        shipping_address: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      try {
        localStorage.setItem('nexus_auth_user', JSON.stringify(googleUser));
        localStorage.setItem('nexus_auth_profile', JSON.stringify(googleProfile));
      } catch {}
      setUser(googleUser);
      setProfile(googleProfile);
      return { error: null };
    }

    try {
      const supabase = createClient();
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${origin}/auth/callback`,
        },
      });

      if (error) {
        return { error: error.message };
      }

      return { error: null };
    } catch (err: any) {
      return { error: err?.message || 'Failed to initialize Google Sign In' };
    }
  };

  const signOut = async (): Promise<{ error: string | null }> => {
    if (!isConfigured) {
      try {
        localStorage.removeItem('nexus_auth_user');
      } catch {}
      setUser(null);
      setProfile(null);
      setSession(null);
      return { error: null };
    }

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
      setSession(null);

      if (error) {
        return { error: error.message };
      }

      return { error: null };
    } catch (err: any) {
      return { error: err?.message || 'Failed to sign out' };
    }
  };

  const updateProfile = async (
    updates: Partial<UserProfile>
  ): Promise<{ error: string | null }> => {
    if (!user) {
      return { error: 'No user is logged in' };
    }

    if (!isConfigured) {
      const updated = {
        ...(profile || {
          id: user.id,
          email: user.email || null,
          full_name: null,
          phone: null,
          avatar_url: null,
          role: 'customer' as const,
          created_at: new Date().toISOString(),
        }),
        ...updates,
        updated_at: new Date().toISOString(),
      };
      setProfile(updated);
      try {
        localStorage.setItem('nexus_auth_profile', JSON.stringify(updated));
      } catch {}
      return { error: null };
    }

    const { data, error } = await updateUserProfile(user.id, updates);
    if (error) {
      return { error };
    }

    if (data) {
      setProfile(data);
    }
    return { error: null };
  };

  const resetPassword = async (email: string): Promise<{ error: string | null }> => {
    if (!isConfigured) {
      return { error: null };
    }

    try {
      const supabase = createClient();
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/reset-password`,
      });

      if (error) {
        return { error: error.message };
      }

      return { error: null };
    } catch (err: any) {
      return { error: err?.message || 'Failed to send password reset email' };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        isLoading,
        isConfigured,
        signUp,
        signIn,
        signInWithGoogle,
        signOut,
        updateProfile,
        resetPassword,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
