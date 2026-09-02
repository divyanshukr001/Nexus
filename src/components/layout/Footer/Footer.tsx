
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brandSection}>
            <div className={styles.footerLogoRow}>
              <Image
                src="/logo.png"
                alt="Nexus Logo"
                width={48}
                height={48}
                style={{ objectFit: 'contain', borderRadius: '6px' }}
              />
              <h2 className={styles.logo}>NEXUS</h2>
            </div>
            <p className={styles.description}>
              The premium futuristic marketplace. Discover extraordinary products across multiple categories.
            </p>
          </div>
          
          <div className={styles.linksSection}>
            <h3 className={styles.title}>Shop</h3>
            <ul className={styles.links}>
              <li><Link href="/categories/electronics">Electronics</Link></li>
              <li><Link href="/categories/fashion">Fashion</Link></li>
              <li><Link href="/categories/digital">Digital Products</Link></li>
              <li><Link href="/categories/lifestyle">Lifestyle</Link></li>
            </ul>
          </div>

          <div className={styles.linksSection}>
            <h3 className={styles.title}>Support</h3>
            <ul className={styles.links}>
              <li><Link href="/help">Help Center</Link></li>
              <li><Link href="/track">Track Order</Link></li>
              <li><Link href="/returns">Returns</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className={styles.linksSection}>
            <h3 className={styles.title}>Legal</h3>
            <ul className={styles.links}>
              <li><Link href="/terms">Terms of Service</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/seller-terms">Seller Agreement</Link></li>
            </ul>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p>&copy; 2024 Nexus Marketplace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
