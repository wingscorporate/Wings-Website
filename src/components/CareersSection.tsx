import React, { useState } from 'react';
import { CAREER_POSITIONS } from '../data/agencyData';
import { CareerPosition } from '../types';
import { Briefcase, MapPin, Clock, ArrowRight, CheckCircle2, Users, ChevronDown } from 'lucide-react';

interface CareersSectionProps {
  onApplyJob: (job: CareerPosition) => void;
}

export const CareersSection: React.FC<CareersSectionProps> = ({ onApplyJob }) => {
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  return (
    <section id="careers-section" className="pt-28 pb-20 sm:pt-36 bg-[#050816] relative overflow-hidden border-t border-white/5">
      {/* Background Lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest text-purple-400 uppercase mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>JOIN THE TEAM</span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            Build The Future Of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-purple-500">
              E-Commerce Performance.
            </span>
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base mt-4">
            Join our team in web development, business development, and performance marketing. All positions are on-site in Kolkata.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-xl border border-[#4F7CFF]/25 bg-[#4F7CFF]/10 px-4 py-3 text-sm font-semibold text-[#B7CBFF]">
              <Users className="h-4 w-4" aria-hidden="true" />
              {CAREER_POSITIONS.reduce((total, job) => total + job.vacancies, 0)} openings
            </span>
            <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-[#B8C5DF]">
              <Briefcase className="h-4 w-4" aria-hidden="true" />{CAREER_POSITIONS.length} roles
            </span>
            <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-[#B8C5DF]">
              <MapPin className="h-4 w-4" aria-hidden="true" />Kolkata · On-site only
            </span>
          </div>
        </div>

        {/* Job Openings Grid */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
          <h2 className="font-display text-xl font-bold text-white">Open positions</h2>
          <span className="text-xs text-[#AAB2C8]">Find your role. Build with us.</span>
        </div>
        <div className="grid items-start gap-5 lg:grid-cols-2">
          {CAREER_POSITIONS.map((job) => {
            const isExpanded = expandedJob === job.id;

            return (
            <article
              key={job.id}
              className="p-5 sm:p-7 rounded-2xl bg-gradient-to-br from-[#101A33] to-[#0A1024] border border-white/10 hover:border-[#4F7CFF]/40 transition-colors duration-300 flex h-full min-w-0 flex-col justify-between gap-6 group"
            >
              <div className="space-y-3 max-w-2xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-purple-950/80 text-purple-300 text-[10px] font-bold uppercase tracking-wider border border-purple-800/40">
                    {job.department}
                  </span>
                  <span className="text-xs text-neutral-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-purple-400" /> {job.location}
                  </span>
                  <span className="text-xs text-neutral-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-purple-400" /> {job.type} ({job.experience})
                  </span>
                  <span className="text-xs font-semibold text-[#7EA1FF]">{job.salaryRange}</span>
                </div>

                <h3 className="font-display font-bold text-xl sm:text-2xl text-white group-hover:text-[#B7CBFF] transition-colors">
                  {job.title}
                </h3>
                <span className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                  {job.vacancies} vacancies
                </span>

                <p className="text-sm text-neutral-300 leading-relaxed">
                  {job.description}
                </p>

                <div id={`requirements-${job.id}`} className="pt-3 space-y-3 border-t border-white/10">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#B7CBFF]">What you bring</h4>
                  {job.requirements.slice(0, isExpanded ? job.requirements.length : 2).map((req, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm leading-relaxed text-[#AAB2C8]">
                      <CheckCircle2 className="mt-1 w-3.5 h-3.5 text-[#7EA1FF] shrink-0" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row gap-3 border-t border-white/10 pt-5">
                <button
                  type="button"
                  onClick={() => setExpandedJob(isExpanded ? null : job.id)}
                  aria-expanded={isExpanded}
                  aria-controls={`requirements-${job.id}`}
                  aria-label={`${isExpanded ? 'Hide' : 'View'} requirements for ${job.title}`}
                  className="flex min-h-11 flex-1 items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/15 hover:border-[#4F7CFF]/60 hover:bg-white/5 text-white font-semibold text-xs transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8FB2FF]"
                >
                  {isExpanded ? 'Hide Details' : 'View Details'}
                  <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label={`Apply for ${job.title}`}
                  onClick={() => onApplyJob(job)}
                  className="min-h-11 flex-1 px-5 py-3 rounded-xl bg-[#4F7CFF] hover:bg-[#5B8CFF] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8FB2FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1024]"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
