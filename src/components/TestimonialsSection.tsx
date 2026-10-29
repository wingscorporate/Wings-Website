import React from 'react';
import { Star, Quote, Sparkles, CheckCircle2 } from 'lucide-react';
import { InboxScreenshotsSlider } from './TestimonialScreenshots';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      id: '1',
      name: 'Vikram Malhotra',
      role: 'Founder & CEO',
      company: 'Ethnic Trends D2C',
      rating: 5,
      content: 'Wings Marketing completely transformed our online sales. We were struggling to breach 2x ROAS on Meta ads. Within 3 weeks, our ROAS jumped to 5.8x and creative testing became seamless.'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      role: 'Co-Founder',
      company: 'Aura Botanical Beauty',
      rating: 5,
      content: 'Finding an agency that understands both conversion rate optimization and aggressive paid ad media buying is rare. Wings operates like our dedicated in-house growth unit.'
    },
    {
      id: '3',
      name: 'Anand Roy',
      role: 'Managing Director',
      company: 'Urban Spaces Interiors',
      rating: 5,
      content: 'Our interior firm needed high-intent leads in Delhi NCR and Mumbai. Wings set up high-converting funnels and Google Ads that scaled our monthly consultations by 4x.'
    },
    {
      id: '4',
      name: 'Kavita Reddy',
      role: 'Brand Lead',
      company: 'JewelMyne Luxury',
      rating: 5,
      content: 'The ROAS stability and scale Wings delivered for our fine jewelry brand was unbelievable. Their video ad hooks doubled our click-through rates within 10 days.'
    },
    {
      id: '5',
      name: 'Rohan Deshmukh',
      role: 'Head of D2C',
      company: 'Design Machine Apparel',
      rating: 5,
      content: "Wings scaled our apparel brand's catalog ads effortlessly during the festive season. Their team is data-obsessed, highly proactive, and quick on execution."
    },
    {
      id: '6',
      name: 'Sneha Gupta',
      role: 'Founder',
      company: 'UFFCO Fragrances',
      rating: 5,
      content: 'Our perfume store saw immediate ROAS improvements after Wings revamped our ad creatives and Meta campaign structures. Highly recommended performance partners!'
    },
    {
      id: '7',
      name: 'Siddharth Mehta',
      role: 'Co-Founder',
      company: 'Intense Focus Eyewear',
      rating: 5,
      content: 'From landing page CRO to full-funnel scaling on Google and Meta, Wings transformed our customer acquisition funnel. Exceptional team and transparent reporting.'
    },
    {
      id: '8',
      name: 'Ananya Verma',
      role: 'Founder',
      company: 'Irvya Crystals & Gems',
      rating: 5,
      content: 'Scaling a niche crystal jewelry brand isn’t easy, but Wings crafted high-converting video angles that brought in thousands of repeat buyers consistently.'
    },
    {
      id: '9',
      name: 'Tarun Bhatia',
      role: 'Founder',
      company: '360 Love Supplements',
      rating: 5,
      content: 'Wings helped us scale our Ayurvedic supplement brand seamlessly. Their expertise in retention, retargeting, and performance creatives is unmatched in India.'
    },
    {
      id: '10',
      name: 'Meera Nambiar',
      role: 'D2C Growth Director',
      company: 'Veda Luxe Skincare',
      rating: 5,
      content: 'Wings brought predictability to our customer acquisition cost. Their creative iterations and weekly sprint meetings keep us ahead of competitors.'
    },
    {
      id: '11',
      name: 'Devraj Kapoor',
      role: 'Founder',
      company: 'Feint Official Streetwear',
      rating: 5,
      content: 'Streetwear audience targeting requires precise aesthetic sense and messaging. Wings nailed our brand voice and boosted our average order value.'
    },
    {
      id: '12',
      name: 'Radhika Sen',
      role: 'Marketing Lead',
      company: 'Artisan Craft Home',
      rating: 5,
      content: 'The ROI on our ad spend went up significantly within the first month. Wings team is deeply committed to profitability, not just vanity metrics.'
    },
    {
      id: '13',
      name: 'Kabir Joshi',
      role: 'Co-Founder',
      company: 'VoltAudio Tech',
      rating: 5,
      content: 'For audio hardware, CPA can spike fast. Wings restructured our Meta and Google Search campaigns, driving steady high-margin volume month after month.'
    },
    {
      id: '14',
      name: 'Shruti Goel',
      role: 'Founder',
      company: 'Organic Bloom Essentials',
      rating: 5,
      content: 'Working with Wings felt like gaining a full-suite growth department overnight. Their ad copywriting and design team produce stunning work.'
    },
    {
      id: '15',
      name: 'Aman Singhania',
      role: 'Director',
      company: 'Crown & Step Footwear',
      rating: 5,
      content: 'Wings systematically solved our drop-off rates and lowered our cost per acquisition while doubling our daily shipping volumes!'
    }
  ];

  return (
    <section id="testimonials-section" className="py-16 sm:py-24 bg-[#050816] relative overflow-hidden border-t border-white/10 select-none">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#4F7CFF]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-12">

        {/* Compact Section Header */}
        <div className="text-center space-y-2.5 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#4F7CFF]/10 text-[#5B8CFF] text-[10px] font-bold tracking-widest uppercase border border-[#4F7CFF]/20 shadow-sm">
            <Sparkles className="w-3 h-3" />
            <span>CLIENT REVIEWS & VERDICT</span>
          </div>

          <h2 className="font-display font-black text-xl sm:text-3xl lg:text-4xl text-white tracking-tight">
            Trusted by Scaling Brands.
          </h2>

          <p className="text-[#AAB2C8] text-xs sm:text-sm leading-relaxed">
            Real feedback from brand founders and marketing executives who partnered with Wings Marketing to scale their revenues.
          </p>
        </div>

        {/* Single Marquee Reviews Container with Fade Mask */}
        <div
          className="relative w-full overflow-hidden py-2"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)'
          }}
        >
          {/* Edge Gradient Mask Overlays */}
          <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-[#050816] via-[#050816]/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-[#050816] via-[#050816]/80 to-transparent z-10 pointer-events-none" />

          {/* Marquee Row (Scrolling Left) */}
          <div className="flex animate-marquee gap-3 sm:gap-4 w-max">
            {[...testimonials, ...testimonials].map((t, idx) => (
              <div
                key={`t-${t.id}-${idx}`}
                className="group relative w-[280px] sm:w-[330px] shrink-0 p-4 sm:p-5 rounded-xl bg-[#0A1024]/80 backdrop-blur-md border border-white/10 hover:border-[#4F7CFF]/50 hover:bg-[#0F1738] hover:shadow-[0_0_20px_rgba(79,124,255,0.18)] transition-all duration-300 flex flex-col justify-between space-y-3 cursor-default"
              >
                {/* Ambient Top Glow */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-[#4F7CFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div className="space-y-2 relative z-10">
                  {/* Top Rating Stars (5 Stars Only) */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-[#22C55E] font-semibold bg-[#22C55E]/10 px-2 py-0.5 rounded-full border border-[#22C55E]/20">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      <span>Verified Client</span>
                    </div>
                  </div>

                  {/* Review Quote Text */}
                  <p className="text-xs sm:text-[13px] text-slate-200 leading-relaxed font-normal italic">
                    "{t.content}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-2.5 border-t border-white/10 flex items-center justify-between relative z-10">
                  <div>
                    <div className="font-display font-bold text-xs sm:text-sm text-white group-hover:text-[#5B8CFF] transition-colors">
                      {t.name}
                    </div>
                    <div className="text-[10.5px] text-[#AAB2C8]">
                      {t.role} • <span className="text-slate-300 font-medium">{t.company}</span>
                    </div>
                  </div>

                  <Quote className="w-5 h-5 text-white/10 group-hover:text-[#4F7CFF]/30 transition-colors" />
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Client Shared Screenshots (vertical slider) */}
        <InboxScreenshotsSlider />

      </div>
    </section>
  );
};
