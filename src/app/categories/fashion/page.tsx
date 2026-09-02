import Link from 'next/link';
import styles from './fashion.module.css';

// MOCK DATA

const EXCLUSIVE_SHOES = [
  { id: 1, name: 'Air Neo Launch', action: 'Shop now', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80' },
  { id: 2, name: 'Urban Steppers', action: 'Shop now', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&q=80' },
  { id: 3, name: 'Classic Retro', action: 'Shop now', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80' },
  { id: 4, name: 'Runner Pro v2', action: 'Shop now', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&q=80' },
  { id: 5, name: 'Velvet Slip-ons', action: 'Shop now', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614c3a?w=500&q=80' },
  { id: 6, name: 'Hype Beast', action: 'Shop now', image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500&q=80' },
];

const MICRO_CATEGORIES = [
  { name: 'Kurtas', image: 'https://images.unsplash.com/photo-1583391733958-d25e07fac662?w=150&q=80' },
  { name: 'Shirts', image: 'https://images.unsplash.com/photo-1596755094514-f87e32f85e23?w=150&q=80' },
  { name: 'Jeans', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=150&q=80' },
  { name: 'Watches', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=150&q=80' },
  { name: 'Kids clothing', image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=150&q=80' },
  { name: 'Luggage', image: 'https://images.unsplash.com/photo-1556015048-4a572a1e5d36?w=150&q=80' },
  { name: 'Jackets', image: 'https://images.unsplash.com/photo-1551028719-0c144079860b?w=150&q=80' },
  { name: 'Tshirts', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150&q=80' },
  { name: 'Activewear', image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=150&q=80' },
  { name: 'Ethnic', image: 'https://images.unsplash.com/photo-1583391733958-d25e07fac662?w=150&q=80' },
];

const SHOP_BY_AUDIENCE = [
  { id: 1, name: 'Men', image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600&q=80' },
  { id: 2, name: 'Women', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80' },
  { id: 3, name: 'Gen Z drips', image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80' },
];

const FIRST_TIME_DISCOUNT = [
  { id: 1, title: 'Min. 60% Off', brand: 'Offlimit & more', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&q=80' },
  { id: 2, title: 'Min. 80% Off', brand: 'Sassafras', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80' },
  { id: 3, title: 'Min. 84% Off', brand: 'Red Tape', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&q=80' },
  { id: 4, title: 'Min. 70% Off', brand: 'PUMA & more', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&q=80' },
  { id: 5, title: 'Min. 70% Off', brand: 'French Connection', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&q=80' },
  { id: 6, title: 'Under ₹699', brand: 'Killer', image: 'https://images.unsplash.com/photo-1596755094514-f87e32f85e23?w=400&q=80' },
];

const UNMISSABLE_DEALS = [
  { id: 1, title: 'Under ₹499', subtitle: "Kids' Jeans", image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400&q=80' },
  { id: 2, title: 'Under ₹399', subtitle: 'Women wedges', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&q=80' },
  { id: 3, title: 'Under ₹599', subtitle: 'Backpack', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80' },
  { id: 4, title: 'Under ₹499', subtitle: 'Garment cover', image: 'https://images.unsplash.com/photo-1556015048-4a572a1e5d36?w=400&q=80' },
  { id: 5, title: 'Under ₹199', subtitle: "Kids' combosets", image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&q=80' },
  { id: 6, title: 'Under ₹299', subtitle: "Kids' Shorts", image: 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=400&q=80' },
];

export default function FashionCategory() {
  return (
    <div className={styles.container}>
      
      {/* 1. Main Hero Banner */}
      <Link href="/product/signature" className={styles.heroLink}>
        <section className={styles.heroBanner}>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>⚡ New Collection Drop</span>
            <h1>SEAM XVIII<br />SIGNATURE</h1>
            <p>LIVE NOW</p>
            <button className={styles.heroButton}>Only on Nexus</button>
          </div>
        </section>
      </Link>

      {/* 2. Own the Look (Shoes + Timer) */}
      <section className={styles.curatedDropSection}>
        <div className={styles.dropHeader}>
          <h2>Own the Nexus look</h2>
          <div className={styles.timer}>
            <span>00d</span> : <span>01h</span> : <span>27m</span> : <span>01s</span>
          </div>
        </div>
        
        <div className={styles.horizontalScroll}>
          {EXCLUSIVE_SHOES.map((shoe) => (
            <Link href={`/product/${shoe.id}`} key={shoe.id} className={styles.shoeCardLink}>
              <div className={styles.shoeCard}>
                <div className={styles.shoeImageWrapper}>
                  <img src={shoe.image} alt={shoe.name} className={styles.shoeImage} />
                </div>
                <div className={styles.shoeFooter}>
                  <strong>{shoe.name}</strong>
                  <span>{shoe.action}</span>
                </div>
              </div>
            </Link>
          ))}
          
          <button className={styles.nextArrow}>→</button>
        </div>
      </section>

      {/* 3. Promo Split Banners */}
      <section className={styles.splitBanners}>
        <Link href="/sale/fashion" className={styles.splitBannerLink}>
          <div className={`${styles.promoBanner} ${styles.promo1}`}>
            <div className={styles.promoText}>
              <h3>New fashion favourites!</h3>
              <p>Up to 80% Off</p>
            </div>
          </div>
        </Link>
        <Link href="/sale/shoes" className={styles.splitBannerLink}>
          <div className={`${styles.promoBanner} ${styles.promo2}`}>
            <div className={styles.promoText}>
              <h3>Men's shoes, sandals...</h3>
              <p>Min. 65% Off</p>
            </div>
          </div>
        </Link>
      </section>

      {/* 4. Micro Categories Carousel */}
      <section className={styles.microCategories}>
        {MICRO_CATEGORIES.map((cat, idx) => (
          <Link href={`/categories/fashion/${cat.name.toLowerCase()}`} key={idx} className={styles.microLink}>
            <div className={styles.microCard}>
              <div className={styles.microImageWrapper}>
                <img src={cat.image} alt={cat.name} />
              </div>
              <span>{cat.name}</span>
            </div>
          </Link>
        ))}
      </section>

      {/* 5. Shop for Loved Ones */}
      <section className={styles.audienceSection}>
        <h2 className={styles.sectionTitle}>Shop for loved ones</h2>
        <div className={styles.audienceGrid}>
          {SHOP_BY_AUDIENCE.map((audience) => (
            <Link href={`/categories/fashion/${audience.name.toLowerCase()}`} key={audience.id} className={styles.audienceLink}>
              <div className={styles.audienceCard}>
                <img src={audience.image} alt={audience.name} />
                <h3>{audience.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. First time on discount */}
      <section className={`${styles.dealsContainer} ${styles.darkDealsBg}`}>
        <h2 className={styles.dealsTitleWhite}>First time on discount</h2>
        <div className={styles.dealsGrid}>
          {FIRST_TIME_DISCOUNT.map((deal) => (
            <Link href={`/brand/${deal.brand}`} key={deal.id} className={styles.dealLink}>
              <div className={styles.dealCard}>
                <div className={styles.dealImageWrapper}>
                  <img src={deal.image} alt={deal.brand} />
                </div>
                <div className={styles.dealFooter}>
                  <strong>{deal.title}</strong>
                  <span>{deal.brand}</span>
                </div>
              </div>
            </Link>
          ))}
          <button className={styles.dealsNextArrow}>→</button>
        </div>
      </section>

      {/* 7. Unmissable deals */}
      <section className={`${styles.dealsContainer} ${styles.lightDealsBg}`}>
        <h2 className={styles.dealsTitleDark}>Unmissable deals</h2>
        <div className={styles.dealsGrid}>
          {UNMISSABLE_DEALS.map((deal) => (
            <Link href={`/product/${deal.id}`} key={deal.id} className={styles.dealLink}>
              <div className={styles.dealCard}>
                <div className={styles.dealImageWrapper}>
                  <img src={deal.image} alt={deal.subtitle} />
                </div>
                <div className={styles.dealFooterLight}>
                  <strong>{deal.title}</strong>
                  <span>{deal.subtitle}</span>
                </div>
              </div>
            </Link>
          ))}
          <button className={styles.dealsNextArrow}>→</button>
        </div>
      </section>

      {/* 8. Footer Promo Banner */}
      <Link href="/product/classic" className={styles.heroLink}>
        <section className={`${styles.heroBanner} ${styles.footerBanner}`}>
          <div className={styles.heroContent}>
            <h1>NEXUS CLASSIC</h1>
            <p>Designed with Vision</p>
            <button className={styles.heroButton}>SHOP NOW</button>
          </div>
        </section>
      </Link>

    </div>
  );
}
