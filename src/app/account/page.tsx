'use client';

import { useState, useEffect, Suspense, type FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import styles from './account.module.css';
import { useAuth } from '@/context/AuthContext';
import { fetchUserOrders } from '@/lib/services/orders';
import type { Order } from '@/types/database';

function AccountContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'profile';

  const { user, profile, updateProfile, signOut, isLoading, isConfigured } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'security'>(
    (initialTab as any) || 'profile'
  );

  // Profile Form state
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const [orders, setOrders] = useState<Order[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [alertMessage, setAlertMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  // Sync state with profile once loaded
  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setPhone(profile.phone || '');
      if (profile.shipping_address) {
        setStreet(profile.shipping_address.street || '');
        setCity(profile.shipping_address.city || '');
        setStateName(profile.shipping_address.state || '');
        setPostalCode(profile.shipping_address.postal_code || '');
        setCountry(profile.shipping_address.country || '');
      }
    } else if (user) {
      setFullName(user.user_metadata?.full_name || '');
      setPhone(user.user_metadata?.phone || '');
    }
  }, [profile, user]);

  // Load orders if on orders tab
  useEffect(() => {
    if (user?.id && activeTab === 'orders') {
      fetchUserOrders(user.id).then(setOrders);
    }
  }, [user?.id, activeTab]);

  // Redirect if not logged in once done loading
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/signin?redirect=/account');
    }
  }, [isLoading, user, router]);

  const handleProfileSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setAlertMessage(null);

    const { error } = await updateProfile({
      full_name: fullName,
      phone: phone,
      shipping_address: {
        street,
        city,
        state: stateName,
        postal_code: postalCode,
        country,
      },
    });

    setIsSaving(false);

    if (error) {
      setAlertMessage({ type: 'error', text: error });
    } else {
      setAlertMessage({ type: 'success', text: 'Profile updated successfully!' });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <p style={{ textAlign: 'center', padding: '4rem 0' }}>Loading account details...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const displayName = fullName || user.email?.split('@')[0] || 'User';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.headerTitle}>Account Overview</h1>
          <p className={styles.headerSubtitle}>
            Manage your personal details, shipping information, and orders.
          </p>
        </div>
        <button type="button" className={styles.signOutTopBtn} onClick={handleSignOut}>
          Sign Out
        </button>
      </header>

      {/* Tabs */}
      <nav className={styles.tabs} aria-label="Account navigation tabs">
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'profile' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile & Address
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'orders' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders History
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'security' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('security')}
        >
          Security
        </button>
      </nav>

      {/* Main Grid */}
      <div className={styles.grid}>
        {/* Left Column: User Summary Card */}
        <aside className={styles.profileCard}>
          <div className={styles.avatarContainer}>
            <div className={styles.largeAvatar}>{initial}</div>
          </div>
          {profile?.role && <span className={styles.roleBadge}>{profile.role}</span>}
          <h2 className={styles.userName}>{displayName}</h2>
          <p className={styles.userEmail}>{user.email}</p>

          <div className={styles.cardDivider} />

          <div className={styles.metaList}>
            <div className={styles.metaRow}>
              <span>Account ID</span>
              <span className={styles.metaValue} style={{ fontSize: '0.75rem' }}>
                {user.id.slice(0, 8)}...
              </span>
            </div>
            <div className={styles.metaRow}>
              <span>Status</span>
              <span className={styles.metaValue} style={{ color: '#16a34a' }}>
                Verified
              </span>
            </div>
            <div className={styles.metaRow}>
              <span>Member Since</span>
              <span className={styles.metaValue}>
                {user.created_at ? new Date(user.created_at).toLocaleDateString() : '2026'}
              </span>
            </div>
          </div>
        </aside>

        {/* Right Column: Tab Content */}
        <main className={styles.contentCard}>
          {activeTab === 'profile' && (
            <div>
              <h2 className={styles.sectionHeading}>Personal & Delivery Details</h2>
              <p className={styles.sectionDesc}>
                Update your contact details and default shipping destination.
              </p>

              {alertMessage && (
                <div
                  className={`${styles.alert} ${
                    alertMessage.type === 'error' ? styles.errorAlert : styles.successAlert
                  }`}
                >
                  {alertMessage.type === 'error' ? '⚠️ ' : '✅ '}
                  {alertMessage.text}
                </div>
              )}

              <form className={styles.form} onSubmit={handleProfileSubmit}>
                <div className={styles.formRow}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="fullName" className={styles.label}>
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      className={styles.input}
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="email" className={styles.label}>
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      className={styles.input}
                      value={user.email || ''}
                      disabled
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="phone" className={styles.label}>
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      className={styles.input}
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="street" className={styles.label}>
                      Street Address
                    </label>
                    <input
                      id="street"
                      type="text"
                      className={styles.input}
                      value={street}
                      onChange={e => setStreet(e.target.value)}
                      placeholder="123 Neon Avenue, Suite 4B"
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="city" className={styles.label}>
                      City
                    </label>
                    <input
                      id="city"
                      type="text"
                      className={styles.input}
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      placeholder="Metropolis"
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="state" className={styles.label}>
                      State / Province
                    </label>
                    <input
                      id="state"
                      type="text"
                      className={styles.input}
                      value={stateName}
                      onChange={e => setStateName(e.target.value)}
                      placeholder="California"
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="postalCode" className={styles.label}>
                      Postal / ZIP Code
                    </label>
                    <input
                      id="postalCode"
                      type="text"
                      className={styles.input}
                      value={postalCode}
                      onChange={e => setPostalCode(e.target.value)}
                      placeholder="90210"
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="country" className={styles.label}>
                      Country
                    </label>
                    <input
                      id="country"
                      type="text"
                      className={styles.input}
                      value={country}
                      onChange={e => setCountry(e.target.value)}
                      placeholder="United States"
                    />
                  </div>
                </div>

                <button type="submit" className={styles.submitBtn} disabled={isSaving}>
                  {isSaving ? 'Saving Changes...' : 'Save Profile Changes'}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h2 className={styles.sectionHeading}>Your Orders</h2>
              <p className={styles.sectionDesc}>View past marketplace transactions and tracking.</p>

              {orders.length === 0 ? (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}>📦</div>
                  <h3>No orders yet</h3>
                  <p>When you purchase items from Nexus, your order details will appear here.</p>
                  <Link href="/categories" className={styles.submitBtn} style={{ textDecoration: 'none', display: 'inline-block', marginTop: '1rem' }}>
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className={styles.ordersList}>
                  {orders.map(order => (
                    <div key={order.id} className={styles.orderCard}>
                      <div className={styles.orderHeader}>
                        <span className={styles.orderNumber}>Order #{order.order_number}</span>
                        <span
                          className={`${styles.orderStatus} ${
                            order.status === 'delivered'
                              ? styles.statusCompleted
                              : order.status === 'shipped'
                              ? styles.statusShipped
                              : styles.statusPending
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className={styles.orderDetails}>
                        <span>Placed on {new Date(order.created_at).toLocaleDateString()}</span>
                        <strong>${order.total_amount.toFixed(2)}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'security' && (
            <div>
              <h2 className={styles.sectionHeading}>Security Settings</h2>
              <p className={styles.sectionDesc}>Manage your authentication credentials.</p>

              <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                  Need to change your account password? You can request a secure reset link.
                </p>
                <Link
                  href="/forgot-password"
                  className={styles.submitBtn}
                  style={{ textDecoration: 'none', display: 'inline-block' }}
                >
                  Request Password Reset
                </Link>

                <div className={styles.cardDivider} />

                <div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#dc2626' }}>
                    Sign Out
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                    End your active session on this device.
                  </p>
                  <button type="button" className={styles.signOutTopBtn} onClick={handleSignOut}>
                    Sign Out Now
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense fallback={<div className={styles.container}>Loading account...</div>}>
      <AccountContent />
    </Suspense>
  );
}
