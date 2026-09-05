-- ==============================================================================
-- NEXUS MARKETPLACE - SEED DATA
-- Run this in Supabase SQL Editor after running schema.sql
-- ==============================================================================

INSERT INTO public.products (name, slug, description, price, original_price, category, image_url, rating, reviews_count, stock, is_featured)
VALUES
  (
    'X-PRO Cyber Deck Neural Terminal',
    'x-pro-cyber-deck',
    'Next-gen neural interface tuned for low latency mental inputs, dual haptic triggers and ultra-dense OLED status indicators.',
    899.00,
    1199.00,
    'Cyberware',
    'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80',
    4.9,
    142,
    25,
    true
  ),
  (
    'Chronos Holographic Smartwatch',
    'chronos-holo-smartwatch',
    'Titanium bezel with volumetric floating projection and biometric health tracking.',
    199.00,
    299.00,
    'Cyberware',
    'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80',
    4.8,
    98,
    40,
    true
  ),
  (
    'Neuro-Link Pro Earbuds',
    'neuro-link-earbuds',
    'Lossless spatial audio with active sensory isolation and direct neural audio transmission.',
    149.00,
    249.00,
    'Electronics',
    'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80',
    4.7,
    312,
    75,
    true
  ),
  (
    'Air Neo Launch Sneakers',
    'air-neo-launch-sneakers',
    'Adaptive cushioned gravity soles with neon electro-luminescent accents.',
    189.00,
    240.00,
    'Fashion',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    4.9,
    215,
    30,
    true
  ),
  (
    'Urban Steppers Cyber High-Top',
    'urban-steppers-high-top',
    'Weatherproof nanotech fiber upper with impact dispersion cushioning.',
    165.00,
    210.00,
    'Fashion',
    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80',
    4.6,
    88,
    45,
    false
  ),
  (
    'Classic Retro Synth Runner',
    'classic-retro-runner',
    'Vintage silhouette fused with carbon-reinforced sole plate.',
    135.00,
    170.00,
    'Fashion',
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80',
    4.7,
    74,
    50,
    false
  ),
  (
    'Quantum Air Purifier & Ionizer',
    'quantum-air-purifier',
    'Continuous molecular sterilization and particulate capture with ambient status halo.',
    299.00,
    399.00,
    'Appliances',
    'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80',
    4.8,
    64,
    18,
    false
  ),
  (
    'Synth-Cotton Minimalist Overshirt',
    'synth-cotton-overshirt',
    'Breathable self-ironing polymer cotton blend with hidden magnet closures.',
    65.00,
    95.00,
    'Fashion',
    'https://images.unsplash.com/photo-1596755094514-f87e32f85e23?w=800&q=80',
    4.5,
    53,
    60,
    false
  ),
  (
    'Bio-Enhance Cellular Hydration Mist',
    'bio-enhance-hydration-mist',
    'Nanopeptide skin barrier revitalization spray for extreme climates.',
    45.00,
    75.00,
    'Nutrition',
    'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80',
    4.8,
    129,
    100,
    false
  ),
  (
    'Autonomous Sentinel Drone v4',
    'sentinel-drone-v4',
    'AI obstacle pathfinding with 4K HDR thermal optical sensor.',
    420.00,
    550.00,
    'Toys & Drones',
    'https://images.unsplash.com/photo-1557862921-37829c790f19?w=800&q=80',
    4.9,
    81,
    12,
    true
  )
ON CONFLICT (slug) DO NOTHING;
