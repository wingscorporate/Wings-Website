import React from 'react';
import { ArrowRight, BriefcaseBusiness, Code2, Target, TrendingUp } from 'lucide-react';

const jobs = [
  { title: 'Web Developer', department: 'Development', salary: '₹1.2–3 LPA', icon: Code2, description: 'Build, maintain and optimize responsive, high-performing websites and digital experiences.', skills: ['HTML, CSS & JavaScript', 'React / WordPress / Shopify', 'Responsive design & performance optimization'] },
  { title: 'Business Development Associate', department: 'Business Development', salary: '₹1.5–3.5 LPA', icon: BriefcaseBusiness, description: 'Identify prospects, start conversations and help build meaningful client relationships.', skills: ['Lead generation & prospect research', 'Client outreach & communication', 'CRM and sales follow-up'] },
  { title: 'Business Development Executive', department: 'Business Development', salary: '₹1.5–3.5 LPA', icon: BriefcaseBusiness, description: 'Manage opportunities, understand client needs and turn qualified leads into partnerships.', skills: ['Client meetings & presentations', 'Proposal coordination', 'Pipeline management & closing'] },
  { title: 'Business Development Manager', department: 'Business Development', salary: '₹1.5–3.5 LPA', icon: TrendingUp, description: 'Drive revenue opportunities, strengthen partnerships and guide business growth initiatives.', skills: ['Business growth strategy', 'Relationship management', 'Sales targets & team coordination'] },
  { title: 'Performance Marketer', department: 'Digital Marketing', salary: '₹1.2–3.5 LPA', icon: Target, description: 'Plan, launch and optimize performance campaigns that deliver measurable business results.', skills: ['Meta Ads & Google Ads', 'Conversion tracking and reporting', 'Campaign analysis and ROAS optimization'] },
];

export const CareersPage: React.FC = () => (
  <main id="careers-section" className="relative min-h-screen overflow-hidden bg-[#050816] pt-36 pb-24 sm:pt-44">
    <div className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-blue-700/10 blur-[150px]" />
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <header className="mx-auto mb-14 max-w-3xl text-center sm:mb-20">
        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#4F7CFF]/30 bg-[#4F7CFF]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#93AEFF]">
          <span className="h-2 w-2 rounded-full bg-emerald-400" /> We're Hiring
        </span>
        <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">Build your career. <span className="text-[#7C9BFF]">Grow with WINGS.</span></h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#AAB2C8] sm:text-lg">Join a team building impactful digital experiences, ambitious brands and measurable growth. Explore our current opportunities below.</p>
      </header>
      <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div><p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#7C9BFF]">Open Positions</p><h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Find your next opportunity</h2></div>
        <p className="text-sm text-[#AAB2C8]">5 roles · Annual salary ranges (CTC)</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {jobs.map((job) => {
          const Icon = job.icon;
          const subject = encodeURIComponent(`Application for ${job.title} | WINGS Marketing`);
          const body = encodeURIComponent(`Hello WINGS Marketing Team,\n\nI would like to apply for the ${job.title} position.\n\nName:\nPhone:\nPortfolio/LinkedIn:\n\nI will attach my resume to this email.\n`);
          return <article key={job.title} className="group flex h-full flex-col rounded-3xl border border-white/10 bg-[#0A1024]/85 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#4F7CFF]/50 hover:shadow-[0_20px_70px_rgba(44,82,193,0.15)] sm:p-8">
            <div className="mb-6 flex items-start justify-between gap-3"><span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#4F7CFF]/30 bg-[#4F7CFF]/10 text-[#8DA9FF]"><Icon className="h-6 w-6" aria-hidden="true" /></span><span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-300">Open</span></div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#8DA9FF]">{job.department}</p>
            <h3 className="font-display text-xl font-bold text-white sm:text-2xl">{job.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#AAB2C8]">{job.description}</p>
            <p className="mt-5 text-xl font-bold text-white">{job.salary} <span className="text-xs font-normal text-[#AAB2C8]">annual CTC</span></p>
            <ul className="my-6 space-y-2 text-sm text-neutral-300">{job.skills.map(skill => <li key={skill} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7C9BFF]" />{skill}</li>)}</ul>
            <a href={`mailto:retail@wings-marketing.com?subject=${subject}&body=${body}`} className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#4F7CFF] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#638AFF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#93AEFF]">Apply Now <ArrowRight className="h-4 w-4" /></a>
          </article>;
        })}
      </div>
      <p className="mt-10 text-center text-sm text-[#AAB2C8]">Questions about a role? Email <a className="text-[#93AEFF] hover:underline" href="mailto:retail@wings-marketing.com">retail@wings-marketing.com</a>.</p>
    </div>
  </main>
);
