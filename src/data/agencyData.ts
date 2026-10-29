import { Service, CaseStudy, CareerPosition } from '../types';

export const AGENCY_STATS = [
  {
    id: 'purchases',
    numberValue: 9500,
    prefix: '',
    suffix: '+',
    formattedDisplay: '9,500+',
    label: 'Website Purchases Generated',
    description: 'Single Campaign Scale',
    growth: 'High Conversion Rate'
  },
  {
    id: 'sales22days',
    numberValue: 6084550,
    prefix: '₹',
    suffix: 'L+',
    formattedDisplay: '₹60.8L+',
    exactValue: '₹60,84,550',
    label: 'Sales Generated in 22 Days',
    description: '5.8x Average ROAS',
    growth: '+340% Growth'
  },
  {
    id: 'sales15days',
    numberValue: 2475626,
    prefix: '₹',
    suffix: 'L+',
    formattedDisplay: '₹24L+',
    exactValue: '₹24,75,626',
    label: 'Sales Generated in 15 Days',
    description: 'High-Growth Scaling',
    growth: '6.14x ROAS'
  },
  {
    id: 'flashorders',
    numberValue: 1600,
    prefix: '',
    suffix: '+',
    formattedDisplay: '1,600+',
    label: 'Orders in a Single Day',
    description: 'Flash Festive Blast',
    growth: '24-Hour Peak'
  },
  {
    id: 'lowcpl',
    numberValue: 45.9,
    prefix: '₹',
    suffix: '',
    formattedDisplay: '₹45.90',
    label: 'Low CPL Achieved',
    description: 'Qualified B2B & High-Intent Leads',
    growth: 'High Intent'
  }
];

export const CLIENT_LOGOS = [
  { name: 'JewelMyne', category: 'Luxury Fine Jewelry', growth: 'High-AOV Scale' },
  { name: 'Design Machine', category: 'Creative & Digital Agency', growth: 'UI/UX & Branding' },
  { name: 'Intense Focus', category: 'Performance Eyewear', growth: 'Precision Focus' },
  { name: 'UFFCO', category: 'Industrial & Enterprise', growth: 'Enterprise Growth' },
  { name: 'Feint Official', category: 'Streetwear & Apparel', growth: 'D2C Streetwear' },
  { name: 'Irvya', category: 'Botanical Skincare', growth: 'Clean Beauty' }
];

export const SERVICES: Service[] = [
  {
    id: 'ecommerce',
    number: '01',
    title: 'E-COMMERCE GROWTH',
    description: 'Complete sales generation, e-commerce store management, CRO, and exponential revenue scaling.',
    longDescription: 'We take complete end-to-end ownership of your e-commerce storefront. From catalog architecture and conversion rate optimization (CRO) to retention marketing and checkout speed engineering, we transform casual visitors into high-LTV repeat buyers.',
    deliverables: [
      'Full-Funnel CRO & Checkout Optimization',
      'Inventory & Revenue Velocity Tracking',
      'Retention Marketing & Automated Flow Setup',
      'Multi-Channel Marketplace Synergy'
    ],
    icon: 'ShoppingBag',
    metricsHighlight: 'Average +180% Revenue Growth within 90 days'
  },
  {
    id: 'ads',
    number: '02',
    title: 'ADS MANAGEMENT',
    description: 'High-ROAS Google Ads, Meta Ads (Instagram/Facebook), and LinkedIn Ads engineered for profit.',
    longDescription: 'Stop burning budget on vanity clicks. We deploy algorithm-tested campaign structures, dynamic creative testing (DCT), AI-driven audience bidding, and deep attribution modeling across Meta, Google Shopping, YouTube, and LinkedIn.',
    deliverables: [
      'Meta Performance Max & Dynamic Catalog Ads',
      'Google Shopping & High-Intent Search Bidding',
      'Creative Fatigue Management & Rapid Testing',
      'First-Party Pixel & CAPI Attribution Setup'
    ],
    icon: 'TrendingUp',
    metricsHighlight: '4.5x Average Blended ROAS across portfolios'
  },
  {
    id: 'leads',
    number: '03',
    title: 'LEAD GENERATION',
    description: 'High-intent lead acquisition through hyper-targeted advertising, landing pages, and automated funneling.',
    longDescription: 'Fill your sales pipeline with qualified decision-makers, not spam. We build high-converting landing pages, interactive lead magnets, and automated WhatsApp/CRM integrations that validate lead quality in real-time.',
    deliverables: [
      'High-Converting Landing Page Design',
      'Instant Lead Validation & CRM Integration',
      'Multi-Channel Omnipresence Campaigns',
      'Automated WhatsApp & Email Nurturing'
    ],
    icon: 'Users',
    metricsHighlight: '10,000s+ Verified Leads Delivered'
  },
  {
    id: 'development',
    number: '04',
    title: 'E-COMMERCE DEVELOPMENT',
    description: 'Sub-second loading, high-performance online stores built on Shopify, Next.js, and custom headless tech.',
    longDescription: 'A slow store is a dead store. We architect bespoke digital storefronts designed for maximum mobile responsiveness, micro-interactions, seamless payment gateway integration, and frictionless guest checkout.',
    deliverables: [
      'Shopify Plus & Headless Store Construction',
      'Sub-Second Page Load Optimization',
      'Custom Product Builders & 3D Previews',
      'Seamless Payment & Logistics API Integrations'
    ],
    icon: 'Code',
    metricsHighlight: '< 1.2s Average Page Load Speed'
  },
  {
    id: 'social',
    number: '05',
    title: 'SOCIAL MEDIA MANAGEMENT',
    description: 'Instagram, Facebook, LinkedIn, and YouTube viral content strategies that turn followers into brand advocates.',
    longDescription: 'Build an organic brand moat that amplifies your paid advertising. We produce scroll-stopping short-form video (Reels/Shorts), editorial aesthetic feeds, influencer co-creations, and active community management.',
    deliverables: [
      'Editorial Content Strategy & Reel Production',
      'Creator & Influencer Seeding Campaigns',
      'Brand Voice Alignment & Visual Direction',
      'Community Engagement & DM Funnels'
    ],
    icon: 'Share2',
    metricsHighlight: '15M+ Aggregate Organic Video Impressions'
  },
  {
    id: 'branding',
    number: '06',
    title: 'BRANDING & MARKETING',
    description: 'Brand research, visual positioning, audits, and strategic market entry that commands premium pricing.',
    longDescription: 'Stand out in crowded markets. We craft iconic brand identities, typography systems, tone-of-voice frameworks, and positioning strategies that elevate your brand from price-competing product to aspirational market leader.',
    deliverables: [
      'Comprehensive Brand Audit & Positioning',
      'Visual Identity & Editorial Design Systems',
      'Packaging & Unboxing Experience Design',
      'Go-To-Market (GTM) Launch Blueprints'
    ],
    icon: 'Layers',
    metricsHighlight: 'Built to Command 30-50% Premium Pricing'
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  // --- CLOTHING & APPAREL ---
  {
    id: 'case-clothing-1',
    niche: 'clothing',
    title: '₹60,84,550 Sales Generated in 22 Days',
    client: 'Ethnic Fashion & D2C Apparel',
    industry: 'Clothing & Apparel',
    service: 'Performance Ads & UGC Strategy',
    keyResult: '₹60,84,550 Generated',
    roas: '5.82X',
    revenue: '₹60.84L',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop',
    summary: 'Scaled a regional ethnic wear brand ahead of festive season using video UGC hooks, dynamic catalog ads, and targeted broad lookalikes.',
    strategy: [
      'Executed high-engagement video UGC hooks targeting festive apparel shoppers',
      'Deployed Advantage+ ASC shopping catalogs with dynamic offer overlays',
      'Scaled broad audience targeting while keeping CPA under control'
    ],
    resultsBreakdown: [
      { label: 'Total Sales (22 Days)', value: '₹60,84,550' },
      { label: 'Campaign ROAS', value: '5.82x' },
      { label: 'Total Orders', value: '4,210+' },
      { label: 'Sales Growth', value: '+340%' }
    ],
    featured: true
  },
  {
    id: 'case-clothing-2',
    niche: 'clothing',
    title: '₹6.54L Sales in 24-Hour Streetwear Flash Drop',
    client: 'Streetwear & Urban Apparel',
    industry: 'Clothing & Apparel',
    service: 'VIP Launch & Countdown Funnels',
    keyResult: '₹6,54,120 in 24 Hours',
    roas: '8.40X',
    revenue: '₹6.54L',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop',
    summary: 'Executed a VIP early-access launch campaign using Instagram countdown teasers and automated SMS alerts.',
    strategy: [
      'Generated 12,000+ pre-launch VIP registrations via countdown teasers',
      'Executed instant SMS and WhatsApp broadcast upon launch drop',
      'Captured peak FOMO demand within 24 hours'
    ],
    resultsBreakdown: [
      { label: 'Flash Revenue (24h)', value: '₹6,54,120' },
      { label: 'Flash ROAS', value: '8.40x' },
      { label: 'Flash Orders', value: '1,120' },
      { label: 'Timeframe', value: '1 Day (24 Hours)' }
    ],
    featured: false
  },
  {
    id: 'case-clothing-3',
    niche: 'clothing',
    title: '₹42,30,000 Revenue for Indo-Western Couture',
    client: 'Indo-Western Couture & Designer Wear',
    industry: 'Clothing & Apparel',
    service: 'High-AOV Meta Scaling & Lookalikes',
    keyResult: '₹42,30,000 Generated',
    roas: '5.10X',
    revenue: '₹42.30L',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
    summary: 'Positioned premium hand-embellished couture to high-net-worth shoppers using video lookbooks and VIP consultation funnels.',
    strategy: [
      'Built cinematic 4K video lookbook creatives for Instagram Feed & Reels',
      'Targeted high-income pincodes across Tier-1 metro hubs',
      'Integrated instant concierge booking for custom sizing queries'
    ],
    resultsBreakdown: [
      { label: 'Total Revenue', value: '₹42,30,000' },
      { label: 'Campaign ROAS', value: '5.10x' },
      { label: 'Average Order Value', value: '₹18,500' },
      { label: 'High-Net-Worth Reach', value: '850K+' }
    ],
    featured: false
  },

  // --- JEWELLERY & ACCESSORIES ---
  {
    id: 'case-jewellery-1',
    niche: 'jewellery',
    title: '₹24,75,626 Sales Generated in 15 Days',
    client: 'Luxury Jewellery & Heritage Collections',
    industry: 'Jewellery & Accessories',
    service: 'Meta Carousel Ads & Gifting Funnels',
    keyResult: '₹24,75,626 Generated',
    roas: '6.14X',
    revenue: '₹24.75L',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200&auto=format&fit=crop',
    summary: 'Built a high-converting gifting campaign targeting premium Metro buyers with carousel lifestyle ads.',
    strategy: [
      'Created high-AOV gift combo bundles with premium unboxing messaging',
      'Targeted affluent Metro pin codes across Tier 1 cities with lifestyle carousel ads',
      'Setup automated WhatsApp cart recovery flows for abandoned checkouts'
    ],
    resultsBreakdown: [
      { label: 'Total Sales (15 Days)', value: '₹24,75,626' },
      { label: 'Blended ROAS', value: '6.14x' },
      { label: 'Total Orders', value: '2,890' },
      { label: 'Target Market', value: 'Metro Pin Codes' }
    ],
    featured: true
  },
  {
    id: 'case-jewellery-2',
    niche: 'jewellery',
    title: '₹19,80,000 Sales for 925 Silver Jewellery',
    client: 'Minimalist 925 Silver Jewellery',
    industry: 'Jewellery & Accessories',
    service: 'UGC Styling Reels & ASC Catalogs',
    keyResult: '2,410 Silver Orders',
    roas: '6.85X',
    revenue: '₹19.80L',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop',
    summary: 'Engineered daily-wear silver jewellery campaign using influencer try-on reels and anti-tarnish guarantee messaging.',
    strategy: [
      'Partnered with 20+ micro-creators for relatable daily-wear styling reels',
      'Highlighted 925 authenticity certification and anti-tarnish warranty',
      'Automated dynamic catalog retargeting on Facebook & Instagram'
    ],
    resultsBreakdown: [
      { label: 'Total Revenue', value: '₹19,80,000' },
      { label: 'Campaign ROAS', value: '6.85x' },
      { label: 'Orders Shipped', value: '2,410' },
      { label: 'Return Customer Rate', value: '28%' }
    ],
    featured: false
  },
  {
    id: 'case-jewellery-3',
    niche: 'jewellery',
    title: '₹15,60,000 Valentine Gifting Campaign',
    client: 'Custom Fashion & Couple Jewellery',
    industry: 'Jewellery & Accessories',
    service: 'Personalized Gifting Funnel',
    keyResult: '₹15,60,000 Generated',
    roas: '5.90X',
    revenue: '₹15.60L',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop',
    summary: 'Captured high-intent relationship gifting demand through personalized initial and magnetic couple bracelet bundles.',
    strategy: [
      'Built a custom engravable product preview tool directly on product pages',
      'Ran high-emotion video ads featuring unboxing reactions',
      'Implemented express 48-hour delivery options for late gifters'
    ],
    resultsBreakdown: [
      { label: 'Gifting Revenue', value: '₹15,60,000' },
      { label: 'Campaign ROAS', value: '5.90x' },
      { label: 'Units Sold', value: '3,150' },
      { label: 'Checkout Conversion', value: '4.2%' }
    ],
    featured: false
  },

  // --- SKINCARE & BEAUTY ---
  {
    id: 'case-skincare-1',
    niche: 'skincare',
    title: '9,574 Website Purchases Scaling Campaign',
    client: 'Clean Organic Skincare & Serums',
    industry: 'Skincare & Beauty',
    service: 'Full-Funnel Scale & CRO',
    keyResult: '9,574 Purchases',
    roas: '4.85X',
    revenue: '₹48.20L+',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop',
    summary: 'Aggressive scale campaign for a botanical skincare line achieving nearly 10k orders in under 7 weeks.',
    strategy: [
      'Built a custom 1-click checkout flow reducing bounce rates by 35%',
      'Scaled Meta Advantage+ ads and Google Shopping simultaneously',
      'Launched routine-based bundle offers driving higher Average Order Value'
    ],
    resultsBreakdown: [
      { label: 'Total Revenue', value: '₹48,20,000+' },
      { label: 'Campaign ROAS', value: '4.85x' },
      { label: 'Website Purchases', value: '9,574' },
      { label: 'Timeframe', value: '45 Days' }
    ],
    featured: true
  },
  {
    id: 'case-skincare-2',
    niche: 'skincare',
    title: '12,400+ Units Sold in 40 Days',
    client: 'Ayurvedic Haircare & Herbal Oils',
    industry: 'Skincare & Beauty',
    service: 'Problem-Solution Video Ads & WhatsApp Nurture',
    keyResult: '12,400+ Haircare Kits',
    roas: '5.30X',
    revenue: '₹36.80L',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop',
    summary: 'Scaled a direct-to-consumer Ayurvedic hair fall reduction oil using clinical proof hooks and routine subscription offers.',
    strategy: [
      'Ran before/after clinical result video testimonials on Meta & YouTube',
      'Built a 30-day hair assessment quiz driving targeted product recommendations',
      'Automated WhatsApp follow-up sequences for hair wellness tips'
    ],
    resultsBreakdown: [
      { label: 'Total Revenue', value: '₹36,80,000' },
      { label: 'Blended ROAS', value: '5.30x' },
      { label: 'Kits Delivered', value: '12,400+' },
      { label: 'Quiz Completion Rate', value: '68%' }
    ],
    featured: false
  },
  {
    id: 'case-skincare-3',
    niche: 'skincare',
    title: '₹28,40,000 Summer Sunscreen Scale',
    client: 'Dermatologist-Tested Sunscreens',
    industry: 'Skincare & Beauty',
    service: 'Google Search & Meta ASC Scale',
    keyResult: '₹28,40,000 Sales',
    roas: '5.12X',
    revenue: '₹28.40L',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1200&auto=format&fit=crop',
    summary: 'Captured peak summer SPF demand with zero-white-cast messaging and dermatologist video endorsements.',
    strategy: [
      'Dominated high-intent Google Search terms for lightweight SPF 50 sunscreens',
      'Created UV camera test demonstration videos for social channels',
      'Offered dual-pack summer bundles with complimentary travel sizes'
    ],
    resultsBreakdown: [
      { label: 'Total Revenue', value: '₹28,40,000' },
      { label: 'Campaign ROAS', value: '5.12x' },
      { label: 'Sunscreen Tubes Sold', value: '7,100' },
      { label: 'Repeat Orders', value: '31%' }
    ],
    featured: false
  },

  // --- DIGITAL PRODUCTS ---
  {
    id: 'case-digital-1',
    niche: 'digital',
    title: '₹18,90,000 Revenue in 30 Days (8.9x ROAS)',
    client: 'Digital Products & SaaS Tools',
    industry: 'Digital Products',
    service: 'Automated VSL & High-Ticket Funnel',
    keyResult: '₹18,90,000 Revenue',
    roas: '8.90X',
    revenue: '₹18.90L',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
    summary: 'Scaled digital courses, e-books, and SaaS templates using instant automated delivery and low-friction checkout.',
    strategy: [
      'Built high-converting VSL (Video Sales Letter) landing page with instant download delivery',
      'Implemented dynamic retargeting for cart abandoners with social proof testimonials',
      'Leveraged Google Search and Meta lookalike audiences targeting high-intent creators'
    ],
    resultsBreakdown: [
      { label: 'Total Revenue', value: '₹18,90,000' },
      { label: 'Campaign ROAS', value: '8.90x' },
      { label: 'Digital Units Sold', value: '3,120' },
      { label: 'Fulfillment Cost', value: '₹0 (Digital Delivery)' }
    ],
    featured: true
  },
  {
    id: 'case-digital-2',
    niche: 'digital',
    title: '₹22,10,000 Sales via Webinar Funnel',
    client: 'Creator Masterclasses & EdTech Courses',
    industry: 'Digital Products',
    service: 'Automated Webinar & Email Sequence',
    keyResult: '1,850 Course Enrollees',
    roas: '7.60X',
    revenue: '₹22.10L',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop',
    summary: 'Executed an automated evergreen webinar funnel converting cold traffic into paid masterclass enrolments.',
    strategy: [
      'Designed a high-converting 60-minute automated masterclass training',
      'Ran Meta lead gen ads collecting verified phone and email leads',
      'Nurtured non-buyers with 5-part urgency email and WhatsApp broadcasts'
    ],
    resultsBreakdown: [
      { label: 'Total Revenue', value: '₹22,10,000' },
      { label: 'Campaign ROAS', value: '7.60x' },
      { label: 'Enrolled Students', value: '1,850' },
      { label: 'Cost Per Acquisition', value: '₹1,190' }
    ],
    featured: false
  },
  {
    id: 'case-digital-3',
    niche: 'digital',
    title: '₹14,80,000 AI Prompt & Template Bundles',
    client: 'AI Productivity Tools & Bundles',
    industry: 'Digital Products',
    service: 'Low-Ticket Tripwire Funnel',
    keyResult: '4,200 Digital Downloads',
    roas: '9.20X',
    revenue: '₹14.80L',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    summary: 'Built a viral ₹299 tripwire funnel that upsold high-value ₹2,499 automation templates instantly upon checkout.',
    strategy: [
      'Ran screen-recording video ads demonstrating 10x time savings with AI tools',
      'Implemented instant 1-click upsell offers on checkout thank-you pages',
      'Leveraged zero shipping cost advantage for maximum net profit margins'
    ],
    resultsBreakdown: [
      { label: 'Total Revenue', value: '₹14,80,000' },
      { label: 'Campaign ROAS', value: '9.20x' },
      { label: 'Templates Downloaded', value: '4,200' },
      { label: 'Upsell Take Rate', value: '34%' }
    ],
    featured: false
  },

  // --- EYEWEAR ---
  {
    id: 'case-eyewear-1',
    niche: 'eyewear',
    title: '₹32,40,000 Revenue via Virtual Try-On Ads',
    client: 'Designer Eyewear & Sunglasses',
    industry: 'Eyewear & Accessories',
    service: 'AR Try-On Ads & Meta ASC',
    keyResult: '₹32,40,000 Sales',
    roas: '5.45X',
    revenue: '₹32.40L',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1200&auto=format&fit=crop',
    summary: 'Integrated AR try-on technology into Meta ads, allowing customers to try glasses on their phone before ordering.',
    strategy: [
      'Created custom Instagram/Facebook AR filter ads for virtual frame try-on',
      'Targeted young fashion-conscious demographics across Tier 1 & Tier 2 cities',
      'Implemented automated lens-prescription upload flow at checkout'
    ],
    resultsBreakdown: [
      { label: 'Total Revenue', value: '₹32,40,000' },
      { label: 'Campaign ROAS', value: '5.45x' },
      { label: 'Frames Sold', value: '3,450' },
      { label: 'Conversion Lift', value: '+42%' }
    ],
    featured: true
  },
  {
    id: 'case-eyewear-2',
    niche: 'eyewear',
    title: '₹16,20,000 Anti-Blue Light Glasses Campaign',
    client: 'Anti-Blue Light Work & Gaming Eyewear',
    industry: 'Eyewear & Accessories',
    service: 'Creator UGC & Tech Worker Targeting',
    keyResult: '2,890 Eyewear Units',
    roas: '6.30X',
    revenue: '₹16.20L',
    image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?q=80&w=1200&auto=format&fit=crop',
    summary: 'Positioned blue-light glasses for remote IT workers and gamers suffering from screen fatigue.',
    strategy: [
      'Targeted software engineers, gamers, and remote professionals on LinkedIn & Instagram',
      'Produced side-by-side blue laser beam test demo video ads',
      'Offered Buy-1-Get-1-Free computer glasses bundles'
    ],
    resultsBreakdown: [
      { label: 'Total Sales', value: '₹16,20,000' },
      { label: 'Campaign ROAS', value: '6.30x' },
      { label: 'Glasses Delivered', value: '2,890' },
      { label: 'BOGO Bundle Rate', value: '58%' }
    ],
    featured: false
  },
  {
    id: 'case-eyewear-3',
    niche: 'eyewear',
    title: '₹27,50,000 Metro Prescription Frames',
    client: 'Luxury Prescription Lenses & Frames',
    industry: 'Eyewear & Accessories',
    service: 'High-AOV Retargeting & Try-At-Home',
    keyResult: '₹27,50,000 Revenue',
    roas: '4.95X',
    revenue: '₹27.50L',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1200&auto=format&fit=crop',
    summary: 'Built a high-converting home try-on prescription frame experience with progressive lens add-ons.',
    strategy: [
      'Launched 3-frame home try-on trial box funnel',
      'Targeted corporate executives with titanium and acetate premium frames',
      'Integrated optical prescription verification via WhatsApp photo uploads'
    ],
    resultsBreakdown: [
      { label: 'Total Revenue', value: '₹27,50,000' },
      { label: 'Campaign ROAS', value: '4.95x' },
      { label: 'Average Order Value', value: '₹5,400' },
      { label: 'Home Trial Conversion', value: '74%' }
    ],
    featured: false
  },

  // --- SUPPLEMENTS ---
  {
    id: 'case-supplements-1',
    niche: 'supplements',
    title: '4,820 Monthly Subscriptions & ₹38.50L Sales',
    client: 'Wellness & Active Supplements',
    industry: 'Supplements & Health',
    service: 'Subscription Funnels & Meta Scale',
    keyResult: '4,820 Active Subscribers',
    roas: '4.90X',
    revenue: '₹38.50L',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1200&auto=format&fit=crop',
    summary: 'Built repeat-purchase subscription funnels for plant protein and daily wellness gummies.',
    strategy: [
      'Launched 30-day recurring subscription discount offers driving high LTV',
      'Ran doctor & nutritionist recommendation UGC video creatives on Meta & YouTube',
      'Automated email/SMS re-order reminders prior to product replenishment'
    ],
    resultsBreakdown: [
      { label: 'Total Monthly Sales', value: '₹38,50,000' },
      { label: 'Active Subscribers', value: '4,820' },
      { label: 'Blended ROAS', value: '4.90x' },
      { label: 'Customer LTV Increase', value: '+180%' }
    ],
    featured: true
  },
  {
    id: 'case-supplements-2',
    niche: 'supplements',
    title: '₹35,60,000 Plant Protein Gym Scale',
    client: 'Plant-Based Protein & Fitness Nutrition',
    industry: 'Supplements & Health',
    service: 'Athlete Endorsements & Meta Scale',
    keyResult: '₹35,60,000 Sales',
    roas: '5.25X',
    revenue: '₹35.60L',
    image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?q=80&w=1200&auto=format&fit=crop',
    summary: 'Scaled a clean plant protein brand among gym goers and vegan fitness enthusiasts.',
    strategy: [
      'Leveraged fitness influencer workout reels showcasing easy mixability and zero bloating',
      'Built custom shaker bottle bundle offers for first-time buyers',
      'Optimized Google Search ads for isolate protein keywords'
    ],
    resultsBreakdown: [
      { label: 'Total Revenue', value: '₹35,60,000' },
      { label: 'Campaign ROAS', value: '5.25x' },
      { label: 'Tubs Delivered', value: '11,800' },
      { label: 'Re-order Rate', value: '41%' }
    ],
    featured: false
  },
  {
    id: 'case-supplements-3',
    niche: 'supplements',
    title: '3,900+ Recurring Sleep & Focus Gummy Orders',
    client: 'Herbal Nootropics & Sleep Gummies',
    industry: 'Supplements & Health',
    service: 'Tik-Tok/Instagram Hook Creatives',
    keyResult: '3,900+ Gummy Tins Sold',
    roas: '6.10X',
    revenue: '₹21.40L',
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=1200&auto=format&fit=crop',
    summary: 'Captured high-stress professional market with melatonin-free sleep and focus gummies.',
    strategy: [
      'Created relatable viral "night routine" unboxing reels on Instagram',
      'Promoted non-habit-forming natural Ashwagandha & L-Theanine formulations',
      'Set up 3-month supply value packs with 25% automatic discounts'
    ],
    resultsBreakdown: [
      { label: 'Total Revenue', value: '₹21,40,000' },
      { label: 'Campaign ROAS', value: '6.10x' },
      { label: 'Tins Shipped', value: '3,900+' },
      { label: 'Multi-Pack Conversion', value: '52%' }
    ],
    featured: false
  }
];

export const TIMELINE_MILESTONES = [
  {
    year: '2021',
    title: 'The Foundation in Kolkata',
    subtitle: 'Born from a Passion for Pure Performance',
    description: 'WINGS was launched with a clear mandate: eradicate wasteful agency retainers and deliver transparent, profit-driven digital growth. Started in Kolkata with 3 core clients.'
  },
  {
    year: '2022',
    title: 'E-Commerce Acceleration',
    subtitle: 'Crossed ₹100M+ Generated Revenue',
    description: 'Expanded specialized capabilities in Shopify development, Meta Performance Max, and conversion engineering. Scaled over 25 D2C brands nationwide.'
  },
  {
    year: '2023',
    title: 'Breaking Industry Benchmarks',
    subtitle: 'The Historic ₹4.34M+ 15-Day Campaign',
    description: 'Achieved legendary status by generating ₹4,344,567 in online sales for a single brand within 15 days, featured prominently across national media including Dailyhunt.'
  },
  {
    year: '2024 - TODAY',
    title: 'Full Growth Ecosystem & National Reach',
    subtitle: '₹1 Billion+ Total E-Commerce Turnover',
    description: 'Today, WINGS stands as a premier performance marketing and e-commerce growth partner, scaling ambitious D2C brands, retail giants, and B2B leaders across India and internationally.'
  }
];

export const DAILYHUNT_FEATURE = {
  publication: 'Dailyhunt News',
  tagline: 'SPECIAL COVERAGE • DIGITAL MARKETING EMPIRE',
  title: 'Young, Bold, Ambitious: How Saujash Maulik Built A Digital Marketing Empire Starting At 20',
  excerpt: 'A featured national profile on Saujash Maulik and WINGS Marketing, detailing how visionary strategy, creative excellence, and high-ROI conversion engineering built a premier digital marketing agency scaling leading D2C brands across India.',
  date: 'Verified Media Coverage',
  quote: '"We don\'t measure success in likes or impressions. We measure it in net revenue and ROI generated for our partner brands."',
  founderName: 'Saujash Maulik',
  linkUrl: 'https://m.dailyhunt.in/news/india/english/interviewer+pr-epaper-dh19a6fc39d6994c1bb64ccb09bae66a51/young+bold+ambitious+how+saujash+maulik+built+a+digital+marketing+empire+starting+at+20-newsid-dh19a6fc39d6994c1bb64ccb09bae66a51_919b1ee036dd11f0bbdfe10175b49353?sm=Y'
};

export const CAREER_POSITIONS: CareerPosition[] = [
  {
    id: 'perf-marketer',
    title: 'Senior Performance Marketing Specialist',
    department: 'Performance Media',
    location: 'Kolkata, WB (Hybrid / Remote)',
    type: 'Full-Time',
    experience: '3+ Years',
    description: 'Lead million-rupee ad spend budgets across Meta Ads and Google Ads with a focus on high ROAS, creative scaling, and advanced attribution.',
    requirements: [
      'Proven track record managing ₹5M+ monthly ad spend with 4x+ ROAS',
      'Mastery over Meta Advantage+, CAPI, Google Performance Max & Analytics 4',
      'Deep experience in D2C e-commerce, A/B testing, and landing page CRO'
    ]
  },
  {
    id: 'ecom-cro',
    title: 'E-Commerce Growth Manager & CRO Lead',
    department: 'E-Commerce Strategy',
    location: 'Kolkata, WB (On-Site / Hybrid)',
    type: 'Full-Time',
    experience: '4+ Years',
    description: 'Own the revenue growth blueprint for top-tier D2C brands. Manage storefront optimization, checkout flows, AOV strategies, and customer retention.',
    requirements: [
      'Expertise in Shopify Plus ecosystem, Klaviyo, and UX analytics tools (Hotjar, Microsoft Clarity)',
      'Strong analytical mindset with ability to dissect funnels and identify revenue drop-offs',
      'Experience coordinating creative, media, and tech teams towards monthly revenue goals'
    ]
  },
  {
    id: 'creative-strategist',
    title: 'Creative Strategist / Short-Form Video Producer',
    department: 'Creative & Content',
    location: 'Kolkata, WB',
    type: 'Full-Time',
    experience: '2+ Years',
    description: 'Script, direct, and produce viral direct-response video ad concepts, Instagram Reels, and high-converting ad hooks.',
    requirements: [
      'Deep understanding of social media psychology, viral hooks, and ad psychology',
      'Proficiency in Premiere Pro / CapCut / After Effects for high-velocity ad testing',
      'Portfolio of performance video ads that drove measurable conversions'
    ]
  }
];
