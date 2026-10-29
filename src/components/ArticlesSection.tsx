import React from 'react';
import { ArrowUpRight, BookOpen, Clock, Newspaper } from 'lucide-react';

type Article = {
  id: string;
  publication: string;
  category: string;
  title: string;
  excerpt: string;
  readTime?: string;
  linkUrl: string;
  featured?: boolean;
};

export const ARTICLES: Article[] = [
  {
    id: 'dailyhunt-empire',
    publication: 'Dailyhunt',
    category: 'Founder Profile',
    title: 'Young, Bold, Ambitious: How Saujash Maulik Built A Digital Marketing Empire Starting At 20',
    excerpt: 'A national profile on Saujash Maulik and WINGS Marketing — how a 20-year-old from Kolkata built a performance agency scaling leading D2C brands across India.',
    readTime: '6 min read',
    featured: true,
    linkUrl: 'http://m.dailyhunt.in/news/india/english/interviewer+pr-epaper-dh19a6fc39d6994c1bb64ccb09bae66a51/young+bold+ambitious+how+saujash+maulik+built+a+digital+marketing+empire+starting+at+20-newsid-dh19a6fc39d6994c1bb64ccb09bae66a51_919b1ee036dd11f0bbdfe10175b49353?sm=Y'
  },
  {
    id: 'ohkolkata-expansion',
    publication: 'Oh Kolkata',
    category: 'WINGS Marketing · Company News',
    title: "Saujash Maulik's WINGS Marketing Breaks Silence, Unveils Nationwide Expansion",
    excerpt: 'Explore the published coverage about WINGS Marketing and its nationwide expansion.',
    linkUrl: 'https://ohkolkata.com/saujash-mauliks-wings-marketing-breaks-silence-unveils-nationwide-expansion/'
  },
  {
    id: 'hello-entrepreneurs-expansion',
    publication: 'Hello Entrepreneurs',
    category: 'Brand Saga',
    title: "Saujash Maulik's WINGS Marketing Breaks Silence, Unveils Nationwide Expansion",
    excerpt: 'Entrepreneurial coverage of WINGS Marketing, its founder, and its expansion journey.',
    linkUrl: 'https://helloentrepreneurs.com/brand-saga/saujash-mauliks-wings-marketing-breaks-silence-unveils-nationwide-expansion-57977/'
  },
  {
    id: 'bhaskar-expansion',
    publication: 'Bhaskar Live',
    category: 'Business Growth',
    title: 'WINGS Marketing Soars Higher, Expands to 120 Members, Opens Three New Branches and Embarks on a Mission Beyond Business',
    excerpt: "Read the published report on WINGS Marketing's team expansion, new branches, and wider business mission.",
    linkUrl: 'https://bhaskarlive.in/wings-marketing-soars-higher-expands-to-120-members-opens-three-new-branches-and-embarks-on-a-mission-beyond-business/'
  },
];

export const ArticlesSection: React.FC = () => {
  return (
    <section id="articles" className="relative overflow-hidden border-t border-white/10 bg-[#050816] py-16 sm:py-24">
      <div className="relative z-10 mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8 sm:space-y-10">
        <header className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8EACFF]">
              <Newspaper className="h-3.5 w-3.5" aria-hidden="true" />
              <span>ARTICLES ABOUT SAUJASH</span>
            </div>
            <h2 className="font-display text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
              Write-Ups, Interviews &amp; Playbooks.
            </h2>
            <p className="text-sm leading-relaxed text-[#AAB2C8]">
              Insights on performance marketing, e-commerce scaling and D2C profitability from WINGS founder Saujash Maulik — plus national media coverage.
            </p>
          </div>

          <p className="flex shrink-0 items-center gap-2 text-xs text-[#AAB2C8]" aria-live="polite">
            <BookOpen className="h-4 w-4 text-[#8EACFF]" aria-hidden="true" />
            <span>{ARTICLES.length} published articles</span>
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 sm:gap-5">
          {ARTICLES.map((article) => {
            const isFeatured = article.featured;
            const card = (
              <article className={`flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0A1024] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#8EACFF]/50 group-hover:bg-[#0D1530] group-focus-visible:border-[#8EACFF] group-focus-visible:outline-none group-focus-visible:ring-2 group-focus-visible:ring-[#8EACFF] ${isFeatured ? 'min-h-64' : 'min-h-56'}`}>
                {isFeatured && <div className="h-1 w-full bg-gradient-to-r from-[#8EACFF] via-[#54C7B5] to-transparent" />}
                <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] font-bold text-white">{article.publication}</span>
                    <span className="rounded-full border border-white/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-[#AAB2C8]">
                      {article.category}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className={`font-display font-bold leading-snug text-white transition-colors group-hover:text-[#C9D7FF] ${isFeatured ? 'text-xl sm:text-2xl' : 'text-base'}`}>
                      {article.title}
                    </h3>
                    <p className={`leading-relaxed text-[#AAB2C8] ${isFeatured ? 'text-sm' : 'text-xs'}`}>
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                    <div className="flex items-center gap-3 text-[10px] text-[#AAB2C8]">
                      <span>{article.featured ? 'Verified Media Coverage' : 'Media coverage'}</span>
                      {article.readTime && (
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3 w-3" aria-hidden="true" /> {article.readTime}
                        </span>
                      )}
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C9D7FF]">
                      Read Article <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </article>
            );

            return (
              <a
                key={article.id}
                href={article.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Read ${article.title} on ${article.publication} (opens in a new tab)`}
                className={`group block h-full rounded-xl focus-visible:outline-none ${isFeatured ? 'md:col-span-2' : ''}`}
              >
                {card}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
