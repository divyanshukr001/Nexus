import Link from 'next/link';
import styles from './page.module.css';

// --- MOCK DATA ---

const CATEGORIES = [
  { id: 1, name: 'For You', icon: '✨', link: '#' },
  { id: 2, name: 'Cyberware', icon: '🦾', link: '#' },
  { id: 3, name: 'Mobiles', icon: '📱', link: '#' },
  { id: 4, name: 'Electronics', icon: '💻', link: '#' },
  { id: 5, name: 'Fashion', icon: '🧥', link: '/categories/fashion' },
  { id: 6, name: 'Home AI', icon: '🏠', link: '#' },
  { id: 7, name: 'Appliances', icon: '📺', link: '#' },
  { id: 8, name: 'Toys & Drones', icon: '🚁', link: '#' },
  { id: 9, name: 'Nutrition', icon: '💊', link: '#' },
  { id: 10, name: 'Vehicles', icon: '🛸', link: '#' },
];

const SPOTLIGHT_PRODUCTS = [
  { id: 1, name: 'Neuro-Link Earbuds', tag: 'Min 50% Off', image: "url('https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80') center/cover" },
  { id: 2, name: 'Chronos Smartwatch', tag: 'From $199', image: "url('https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80') center/cover" },
  { id: 3, name: 'Bio-Enhance Spray', tag: 'Upto 70% Off', image: "url('https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&q=80') center/cover" },
  { id: 4, name: 'Off-Road Rover RC', tag: 'Min 40% Off', image: "url('https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=500&q=80') center/cover" },
];

const TRENDS = [
  { id: 1, name: 'Neon Jackets', image: "url('https://images.unsplash.com/photo-1551028719-0c144079860b?w=500&q=80') center/cover" },
  { id: 2, name: 'Holo-Dresses', image: "url('https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=500&q=80') center/cover" },
  { id: 3, name: 'Gravity Sneakers', image: "url('https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80') center/cover" },
  { id: 4, name: 'Smart Visors', image: "url('https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80') center/cover" },
];

const VALUE_DEALS = [
  { id: 1, name: 'Quantum Purifier', price: 'Just $299', image: "url('https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&q=80') center/cover" },
  { id: 2, name: 'Synth-Cotton Shirts', price: 'Under $25', image: "url('https://images.unsplash.com/photo-1596755094514-f87e32f85e23?w=500&q=80') center/cover" },
  { id: 3, name: 'Auto-Faucets', price: 'Just $49', image: "url('https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&q=80') center/cover" },
];

const BRANDS_SPOTLIGHT = [
  { id: 1, name: 'Skin Synth Care', desc: 'Min 60% Off', image: "url('https://images.unsplash.com/photo-1615397323287-3d1bce2b8347?w=500&q=80') center/cover" },
  { id: 2, name: 'Nano Trimmers', desc: 'Min 30% Off', image: "url('https://images.unsplash.com/photo-1621607512214-68297480165e?w=500&q=80') center/cover" },
  { id: 3, name: 'Smart Blenders', desc: 'Min 50% Off', image: "url('https://images.unsplash.com/photo-1585237832873-19bd6a3cc46f?w=500&q=80') center/cover" },
  { id: 4, name: 'Security Drones', desc: 'Min 40% Off', image: "url('https://images.unsplash.com/photo-1557862921-37829c790f19?w=500&q=80') center/cover" },
];

export default function Home() {
  return (
    <div className={styles.main}>
      {/* Category Navigation Row */}
      <div className={styles.categoryNav}>
        <div className={styles.categoryContainer}>
          {CATEGORIES.map((cat) => (
            <Link href={cat.link} key={cat.id} style={{ textDecoration: 'none' }}>
              <div className={styles.categoryItem}>
                <div className={styles.categoryIcon}>{cat.icon}</div>
                <span className={styles.categoryName}>{cat.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className={styles.contentWrapper}>

        {/* Hero Banners */}
        <section className={styles.heroGrid}>
          <div className={`${styles.heroMain} glass`}>
            <div className={styles.heroText}>
              <span className={styles.badge}>Sale is live</span>
              <h2>X-PRO Cyber Deck</h2>
              <p>Next-gen neural interface</p>
            </div>
          </div>
          <div className={`${styles.heroSub1} glass`}>
            <h3>IFB Quantum Wash</h3>
            <p>Deep sonic cleaning</p>
          </div>
          <div className={`${styles.heroSub2} glass`}>
            <h3>LAVA V1 Pro</h3>
            <p>Holo-display from $199</p>
          </div>
        </section>

        {/* Sub Banners Row */}
        <section className={styles.subBannerRow}>
          {[1, 2, 3, 4].map(i => (
            <div key={i} className={`${styles.subBanner} glass glow-hover`}>
              Special Offer #{i}
            </div>
          ))}
        </section>

        {/* Spotlight's On Section */}
        <section className={`${styles.curatedSection} ${styles.spotlightBg}`}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Spotlight&apos;s On</h2>
          </div>
          <div className={styles.productGrid4}>
            {SPOTLIGHT_PRODUCTS.map(product => (
              <div key={product.id} className={styles.productCard}>
                <div className={styles.productImage} style={{ background: product.image }}></div>
                <div className={styles.productInfo}>
                  <h4>{product.name}</h4>
                  <p className={styles.highlightText}>{product.tag}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Flash Sale Banner */}
        <section className={styles.flashBanner}>
          <div className={styles.flashContent}>
            <h2>FLASH SALE</h2>
            <p>Flat 15% Off on Orbital Flights</p>
            <div className={styles.flashTimers}>
              <span>2-3 PM</span> | <span>8-9 PM</span>
            </div>
          </div>
        </section>

        {/* Trends You May Like */}
        <section className={`${styles.curatedSection} ${styles.trendsBg}`}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Trends you may like</h2>
          </div>
          <div className={styles.productGrid4}>
            {TRENDS.map(product => (
              <div key={product.id} className={styles.productCard}>
                <div className={styles.productImageTall} style={{ background: product.image }}></div>
                <div className={styles.productInfo}>
                  <h4>{product.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Top Value Deals */}
        <section className={`${styles.curatedSection} ${styles.valueBg}`}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Top Value Deals</h2>
          </div>
          <div className={styles.productGrid3}>
            {VALUE_DEALS.map(product => (
              <div key={product.id} className={styles.largeProductCard}>
                <div className={styles.largeProductImage} style={{ background: product.image }}></div>
                <div className={styles.largeProductInfo}>
                  <h3>{product.name}</h3>
                  <p className={styles.hugePrice}>{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Brands in Spotlight */}
        <section className={styles.curatedSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Brands in Spotlight</h2>
          </div>
          <div className={styles.productGrid4}>
            {BRANDS_SPOTLIGHT.map(product => (
              <div key={product.id} className={styles.productCard}>
                <div className={styles.productImage} style={{ background: product.image }}></div>
                <div className={styles.productInfo}>
                  <h4>{product.name}</h4>
                  <p className={styles.highlightText}>{product.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
