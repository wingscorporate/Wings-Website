import React, { useState } from 'react';
import { CAREER_POSITIONS } from '../data/agencyData';
import { CareerPosition } from '../types';
import { Briefcase, MapPin, Clock, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

interface CareersSectionProps {
  onApplyJob: (job: CareerPosition) => void;
}

export const CareersSection: React.FC<CareersSectionProps> = ({ onApplyJob }) => {
  return (
    <section id="careers-section" className="py-28 bg-[#080808] relative overflow-hidden border-t border-white/5">
      {/* Background Lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest text-purple-400 uppercase mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>JOIN THE TEAM</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            Build The Future Of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-purple-500">
              E-Commerce Performance.
            </span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-4">
            We are looking for elite media buyers, conversion engineers, and creative strategists who thrive on pure data and high-velocity execution.
          </p>
        </div>

        {/* Job Openings Grid */}
        <div className="space-y-6">
          {CAREER_POSITIONS.map((job) => (
            <div
              key={job.id}
              className="p-8 rounded-2xl bg-[#0D0D14] border border-white/10 hover:border-purple-500/40 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-8 group"
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
                </div>

                <h3 className="font-display font-bold text-2xl text-white group-hover:text-purple-300 transition-colors">
                  {job.title}
                </h3>

                <p className="text-sm text-neutral-300 leading-relaxed">
                  {job.description}
                </p>

                <div className="pt-2 space-y-1">
                  {job.requirements.slice(0, 2).map((req, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-neutral-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="shrink-0">
                <button
                  onClick={() => onApplyJob(job)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-neutral-900 border border-white/20 hover:border-purple-500 hover:bg-purple-600 text-white font-display font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
