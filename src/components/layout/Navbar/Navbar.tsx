'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';
import { Button } from '@/components/ui/Button/Button';
import { useAuth } from '@/context/AuthContext';

export const Navbar = () => {
  const { user, profile, signOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const displayName = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink}>
            <Image
              src="/logo.png"
              alt="Nexus Logo"
              width={42}
              height={42}
              className={styles.logoImage}
              priority
            />
            <span>ANKU</span>
          </Link>
        </div>

        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search extraordinary products..."
            className={styles.searchInput}
          />
          <button className={styles.searchButton} aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>

        <ul className={styles.navLinks}>
          <li><Link href="/categories">Categories</Link></li>
          <li><Link href="/sellers">Top Sellers</Link></li>
          <li><Link href="/cart">Cart (0)</Link></li>
          <li>
            {user ? (
              <div className={styles.userMenuContainer} ref={dropdownRef}>
                <button
                  type="button"
                  className={styles.userBadge}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  aria-expanded={dropdownOpen}
                >
                  <div className={styles.avatarCircle}>{initial}</div>
                  <span className={styles.userName}>{displayName}</span>
                  <svg
                    className={`${styles.chevron} ${dropdownOpen ? styles.chevronOpen : ''}`}
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className={styles.dropdown}>
                    <div className={styles.dropdownHeader}>
                      <span className={styles.dropdownUserName}>{displayName}</span>
                      <span className={styles.dropdownUserEmail}>{user.email}</span>
                      {profile?.role && (
                        <span className={styles.roleTag}>{profile.role}</span>
                      )}
                    </div>
                    <div className={styles.dropdownList}>
                      <Link
                        href="/account"
                        className={styles.dropdownItem}
                        onClick={() => setDropdownOpen(false)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        My Account
                      </Link>
                      <Link
                        href="/account?tab=orders"
                        className={styles.dropdownItem}
                        onClick={() => setDropdownOpen(false)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="21 8 21 21 3 21 3 8"></polyline>
                          <rect x="1" y="3" width="22" height="5"></rect>
                          <line x1="10" y1="12" x2="14" y2="12"></line>
                        </svg>
                        My Orders
                      </Link>
                      <div className={styles.dropdownDivider} />
                      <button
                        type="button"
                        className={`${styles.dropdownItem} ${styles.signOutBtn}`}
                        onClick={async () => {
                          setDropdownOpen(false);
                          await signOut();
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                          <polyline points="16 17 21 12 16 7"></polyline>
                          <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/signin" tabIndex={-1}>
                <Button variant="glow" size="sm">Sign In</Button>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};
