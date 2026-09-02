
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';
import { Button } from '@/components/ui/Button/Button';

export const Navbar = () => {
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
          <button className={styles.searchButton}>
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
            <Button variant="glow" size="sm">Sign In</Button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
