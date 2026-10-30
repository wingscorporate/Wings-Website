import React, { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  FileText,
  Loader2,
  Upload,
  User,
  X,
} from 'lucide-react';
import { CareerPosition } from '../types';

interface CareersApplicationModalProps {
  isOpen: boolean;
  job: CareerPosition | null;
  onClose: () => void;
}

type FormState = Record<string, string | boolean>;
type Step = 0 | 1 | 2 | 3;

const initialForm: FormState = {
  fullName: '', email: '', mobile: '', whatsapp: '', cityState: '',
  experience: '', currentTitle: '', currentCompany: '', currentCtc: '', expectedCtc: '',
  noticePeriod: '', qualification: '', relevantSkills: '', portfolioUrl: '', linkedinUrl: '', githubUrl: '',
  webTechnologies: '', webPlatformExperience: '', webProjects: '',
  bdSalesExperience: '', bdLeadGen: '', bdTargets: '',
  metaAdsExperience: '', googleAdsExperience: '', monthlyBudgetManaged: '', trackingExperience: '', optimizationExperience: '',
  coverLetter: '', joiningDate: '', heardFrom: '', consent: false,
};

const stepNames = ['Personal Details', 'Professional Experience', 'Role Questions', 'Resume & Submit'];
const inputClass = 'w-full min-h-12 rounded-xl border border-[#2B3958] bg-[#101A30] px-4 py-3 text-sm text-[#F1F5FF] outline-none transition-colors placeholder:text-[#8290AD] hover:border-[#465A80] focus:border-[#7EA1FF] focus:ring-2 focus:ring-[#4F7CFF]/25 aria-[invalid=true]:border-rose-400';

export const CareersApplicationModal: React.FC<CareersApplicationModalProps> = ({ isOpen, job, onClose }) => {
  const [form, setForm] = useState<FormState>(initialForm);
  const [resume, setResume] = useState<File | null>(null);
  const [step, setStep] = useState<Step>(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState('');
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const formScrollRef = useRef<HTMLDivElement>(null);
  const previousJobId = useRef<string | null>(null);
  const careersApiUrl = (import.meta.env.VITE_CAREERS_API_URL as string | undefined)?.trim() || '';

  const isWeb = job?.title === 'Web Developer';
  const isPerformance = job?.title === 'Performance Marketer';
  const isBusiness = job?.department === 'Business Development';

  useEffect(() => {
    if (!isOpen) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0);
    if (job?.id !== previousJobId.current) {
      setStep(0);
      setErrors({});
      setSubmitState('idle');
      setSubmitError('');
      previousJobId.current = job?.id ?? null;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'Tab') {
        const controls = Array.from<HTMLElement>(dialogRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href]') ?? []);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      previousFocus?.focus();
    };
  }, [isOpen, job?.id, onClose]);

  useEffect(() => {
    formScrollRef.current?.scrollTo({ top: 0 });
    if (isOpen) {
      formScrollRef.current?.querySelector<HTMLElement>('input:not([readonly]), select, textarea')?.focus({ preventScroll: true });
    }
  }, [step, isOpen]);

  useEffect(() => {
    if (submitState === 'success') dialogRef.current?.querySelector<HTMLButtonElement>('button')?.focus();
  }, [submitState]);

  const setValue = (key: string, value: string | boolean) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: '' }));
  };

  const validateUrl = (value: string) => {
    if (!value) return true;
    try {
      const url = new URL(value);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const validateStep = (stepToValidate: Step) => {
    const nextErrors: Record<string, string> = {};
    const required = (key: string, label: string) => {
      if (!String(form[key] ?? '').trim()) nextErrors[key] = `${label} is required.`;
    };

    if (stepToValidate === 0) {
      required('fullName', 'Full name');
      required('email', 'Email address');
      required('mobile', 'Mobile number');
      required('cityState', 'Current city and state');
      if (form.email && !/^\S+@\S+\.\S+$/.test(String(form.email))) nextErrors.email = 'Enter a valid email address.';
      if (form.mobile && !/^(?:\+91[\s-]?)?[6-9]\d{9}$/.test(String(form.mobile).replace(/[()]/g, ''))) nextErrors.mobile = 'Enter a valid Indian mobile number.';
    }
    if (stepToValidate === 1) {
      required('experience', 'Total work experience');
      required('noticePeriod', 'Notice period');
      required('qualification', 'Highest qualification');
      required('relevantSkills', 'Relevant skills');
      ['portfolioUrl', 'linkedinUrl', 'githubUrl'].forEach((key) => {
        if (form[key] && !validateUrl(String(form[key]))) nextErrors[key] = 'Enter a complete URL starting with https://.';
      });
    }
    if (stepToValidate === 2) {
      if (isWeb) {
        required('webTechnologies', 'Technologies and frameworks');
        required('webPlatformExperience', 'Website platform experience');
        required('webProjects', 'Previous project links');
      } else if (isBusiness) {
        required('bdSalesExperience', 'Sales or business development experience');
        required('bdLeadGen', 'Lead generation and CRM experience');
        required('bdTargets', 'Monthly sales target experience');
      } else if (isPerformance) {
        required('metaAdsExperience', 'Meta Ads experience');
        required('googleAdsExperience', 'Google Ads experience');
        required('trackingExperience', 'Analytics and tracking experience');
        required('optimizationExperience', 'Campaign optimization experience');
      }
    }
    if (stepToValidate === 3) {
      if (!resume) nextErrors.resume = 'Resume is required.';
      if (resume && (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(resume.type) || resume.size > 5 * 1024 * 1024)) {
        nextErrors.resume = 'Upload a PDF, DOC, or DOCX file up to 5 MB.';
      }
      if (!form.consent) nextErrors.consent = 'Consent is required to submit your application.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setResume(file);
    setErrors((current) => ({ ...current, resume: '' }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!validateStep(3) || !job || submitState === 'submitting') return;
    if (!careersApiUrl) {
      setSubmitState('error');
      setSubmitError('Applications are not connected yet. Please configure VITE_CAREERS_API_URL with the secure upload endpoint before enabling production submissions.');
      return;
    }
    setSubmitState('submitting');
    setSubmitError('');
    try {
      const payload = new FormData();
      payload.append('jobId', job.id);
      payload.append('jobRole', job.title);
      payload.append('department', job.department);
      Object.entries(form).forEach(([key, value]) => payload.append(key, String(value)));
      if (resume) payload.append('resume', resume);
      const response = await fetch(careersApiUrl, { method: 'POST', body: payload });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.success !== true) throw new Error(result.message || 'The application could not be submitted.');
      setSubmitState('success');
    } catch (error) {
      setSubmitState('error');
      setSubmitError(error instanceof Error ? error.message : 'The application could not be submitted. Please try again.');
    }
  };

  const roleQuestions = useMemo(() => {
    if (isWeb) return [
      ['webTechnologies', 'Technologies and frameworks known', 'textarea'],
      ['webPlatformExperience', 'Experience with Shopify, WordPress, React, or custom websites', 'textarea'],
      ['webProjects', 'Links to previous projects', 'textarea'],
    ];
    if (isBusiness) return [
      ['bdSalesExperience', 'Sales or business development experience', 'textarea'],
      ['bdLeadGen', 'Experience with lead generation and CRM tools', 'textarea'],
      ['bdTargets', 'Experience working with monthly sales targets', 'textarea'],
    ];
    return [
      ['metaAdsExperience', 'Meta Ads experience', 'textarea'],
      ['googleAdsExperience', 'Google Ads experience', 'textarea'],
      ['monthlyBudgetManaged', 'Approximate monthly advertising budget managed', 'input'],
      ['trackingExperience', 'Experience with GA4, Pixel, GTM, and conversion tracking', 'textarea'],
      ['optimizationExperience', 'Experience with campaign optimization and ROAS', 'textarea'],
    ];
  }, [isBusiness, isPerformance, isWeb]);

  if (!isOpen || !job) return null;

  if (submitState === 'success') {
    return <div ref={dialogRef} className="career-application fixed inset-0 z-[90] grid place-items-center bg-[#050816]/90 p-4 backdrop-blur-xl" role="dialog" aria-modal="true" aria-label="Application submitted">
      <div className="w-full max-w-lg rounded-3xl border border-[#4F7CFF]/30 bg-[#0A1024] p-8 text-center shadow-2xl shadow-blue-950/40">
        <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-400" />
        <h2 className="mt-5 text-2xl font-display font-bold text-white">Application Submitted Successfully!</h2>
        <p className="mt-3 text-sm leading-7 text-[#B8C5DF]">Thank you for applying to WINGS Marketing. Our recruitment team will review your application and contact shortlisted candidates.</p>
        <p className="mt-4 text-sm font-semibold text-[#7EA1FF]">{job.title}</p>
        <button type="button" onClick={onClose} className="mt-7 rounded-xl bg-[#4F7CFF] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#5B8CFF]">Back to Careers</button>
      </div>
    </div>;
  }

  const field = (key: string, label: string, options?: { type?: string; required?: boolean; placeholder?: string }) => (
    <label className="block space-y-2" key={key}>
      <span className="text-xs font-semibold text-[#D9E2F7]">{label}{options?.required ? ' *' : ''}</span>
      <input id={key} type={options?.type || 'text'} value={String(form[key] ?? '')} onChange={(event) => setValue(key, event.target.value)} placeholder={options?.placeholder} className={inputClass} aria-invalid={Boolean(errors[key])} />
      {errors[key] && <span className="flex items-center gap-1 text-xs text-rose-300"><AlertCircle className="h-3.5 w-3.5" />{errors[key]}</span>}
    </label>
  );
  const select = (key: string, label: string, options: string[], required = false) => (
    <label className="block space-y-2" key={key}>
      <span className="text-xs font-semibold text-[#D9E2F7]">{label}{required ? ' *' : ''}</span>
      <span className="relative block">
        <select id={key} value={String(form[key] ?? '')}
          onChange={(event) => setValue(key, event.target.value)}
          aria-required={required} aria-invalid={Boolean(errors[key])}
          aria-describedby={errors[key] ? `${key}-error` : undefined}
          style={{ colorScheme: 'dark' }}
          className={`${inputClass} appearance-none cursor-pointer pr-11 ${form[key] ? '' : 'text-[#AAB8D1]'}`}>
          <option value="">Select an option</option>
          {options.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9EB7EF]" aria-hidden="true" />
      </span>
      {errors[key] && <span id={`${key}-error`} className="text-xs text-rose-300">{errors[key]}</span>}
    </label>
  );
  const textarea = (key: string, label: string, required = false) => <label className="block space-y-2 md:col-span-2" key={key}><span className="text-xs font-semibold text-[#D9E2F7]">{label}{required ? ' *' : ''}</span><textarea id={key} rows={4} value={String(form[key] ?? '')} onChange={(event) => setValue(key, event.target.value)} className={`${inputClass} resize-y`} aria-invalid={Boolean(errors[key])} />{errors[key] && <span className="text-xs text-rose-300">{errors[key]}</span>}</label>;

  return <div ref={dialogRef} className="career-application fixed inset-0 z-[90] flex items-center justify-center bg-[#050816]/90 p-3 backdrop-blur-xl sm:p-6" role="dialog" aria-modal="true" aria-labelledby="career-application-title" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="flex max-h-[calc(100dvh-1.5rem)] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0A1024] shadow-2xl shadow-black/50 sm:max-h-[calc(100dvh-3rem)]">
      <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-5 sm:px-8">
        <div><p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#7EA1FF]">WINGS CAREERS · STEP {step + 1} OF 4</p><h2 id="career-application-title" className="mt-2 text-xl font-display font-bold text-white sm:text-2xl">Apply for {job.title}</h2><p className="mt-2 text-xs leading-relaxed text-[#AAB8D1]">{job.location} · {job.salaryRange}</p></div>
        <button ref={closeButtonRef} type="button" onClick={onClose} className="rounded-xl p-2 text-[#A9B8D4] transition-colors hover:bg-white/10 hover:text-white" aria-label="Close application form"><X className="h-5 w-5" /></button>
      </div>
      <div className="border-b border-white/10 px-5 py-4 sm:px-8"><div className="grid grid-cols-4 gap-2">{stepNames.map((name, index) => <button type="button" key={name} onClick={() => index < step && setStep(index as Step)} className={`text-left text-[10px] font-bold uppercase tracking-wider ${index === step ? 'text-[#7EA1FF]' : index < step ? 'text-white' : 'text-[#687596]'}`}><span className={`mr-1 inline-grid h-5 w-5 place-items-center rounded-full border ${index <= step ? 'border-[#4F7CFF] bg-[#4F7CFF]/20' : 'border-white/15'}`}>{index + 1}</span><span className="hidden sm:inline">{name}</span></button>)}</div><div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-[#4F7CFF] transition-all" style={{ width: `${((step + 1) / 4) * 100}%` }} /></div></div>
      <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
        <div ref={formScrollRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-8">
          <div className="mb-6 flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-[#4F7CFF]/15 text-[#7EA1FF]">{step === 0 ? <User className="h-5 w-5" /> : step === 3 ? <FileText className="h-5 w-5" /> : <BriefcaseBusiness className="h-5 w-5" />}</div><div><h3 className="font-display font-bold text-white">{stepNames[step]}</h3><p className="text-xs text-[#8B9AC0]">Fields marked with * are required.</p></div></div>
          {step === 0 && <div className="grid gap-5 md:grid-cols-2">{field('fullName', 'Full Name', { required: true })}{field('email', 'Email Address', { type: 'email', required: true })}{field('mobile', 'Mobile Number', { type: 'tel', required: true })}{field('whatsapp', 'WhatsApp Number', { type: 'tel' })}{field('cityState', 'Current City and State', { required: true })}<label className="block space-y-2"><span className="text-xs font-semibold text-[#D9E2F7]">Applying For *</span><input value={job.title} readOnly className={`${inputClass} cursor-not-allowed opacity-70`} /></label></div>}
          {step === 1 && <div className="grid gap-5 md:grid-cols-2">{select('experience', 'Total Work Experience', ['Fresher', '0–1 years', '1–2 years', '2–3 years', '3–5 years', '5+ years'], true)}{select('noticePeriod', 'Notice Period', ['Immediately', '15 Days', '30 Days', '60 Days', '90 Days'], true)}{field('currentTitle', 'Current Job Title')}{field('currentCompany', 'Current Company')}{field('currentCtc', 'Current Annual CTC')}{field('expectedCtc', 'Expected Annual CTC')}{field('qualification', 'Highest Qualification', { required: true })}{textarea('relevantSkills', 'Relevant Skills', true)}{field('portfolioUrl', 'Portfolio / Website URL', { type: 'url' })}{field('linkedinUrl', 'LinkedIn Profile URL', { type: 'url' })}{field('githubUrl', 'GitHub Profile URL', { type: 'url' })}</div>}
          {step === 2 && <div className="grid gap-5 md:grid-cols-2">{roleQuestions.map(([key, label, type]) => type === 'textarea' ? textarea(key, label, true) : field(key, label))}</div>}
          {step === 3 && <div className="grid gap-5 md:grid-cols-2"> <label className="block space-y-2 md:col-span-2"><span className="text-xs font-semibold text-[#D9E2F7]">Resume Upload *</span><div className="rounded-2xl border border-dashed border-[#4F7CFF]/50 bg-[#4F7CFF]/5 p-5"><input id="resume" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={handleFileChange} className="block w-full text-xs text-[#A9B8D4] file:mr-4 file:rounded-lg file:border-0 file:bg-[#4F7CFF] file:px-4 file:py-2 file:font-semibold file:text-white" /><p className="mt-2 flex items-center gap-2 text-xs text-[#8B9AC0]"><Upload className="h-3.5 w-3.5" />PDF, DOC, or DOCX up to 5 MB{resume ? ` · ${resume.name}` : ''}</p></div>{errors.resume && <span className="text-xs text-rose-300">{errors.resume}</span>}</label>{textarea('coverLetter', 'Cover Letter / Why Should We Hire You?')}{field('joiningDate', 'Earliest Available Joining Date', { type: 'date' })}{select('heardFrom', 'How Did You Hear About Us?', ['LinkedIn', 'Instagram', 'Website', 'Referral', 'Job Portal', 'Other'])}<label className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 md:col-span-2"><input type="checkbox" checked={Boolean(form.consent)} onChange={(event) => setValue('consent', event.target.checked)} className="mt-1 h-4 w-4 accent-[#4F7CFF]" /> <span className="text-xs leading-6 text-[#B8C5DF]">I consent to WINGS Marketing processing my application information for recruitment purposes. *</span></label>{errors.consent && <span className="text-xs text-rose-300 md:col-span-2">{errors.consent}</span>} {!careersApiUrl && <div className="flex items-start gap-2 rounded-xl border border-amber-400/20 bg-amber-400/5 p-4 text-xs leading-6 text-amber-100 md:col-span-2"><AlertCircle className="mt-1 h-4 w-4 shrink-0" />Application submission is awaiting secure backend setup. The form will not claim success until VITE_CAREERS_API_URL is configured.</div>}</div>}
          {submitState === 'error' && submitError && <div className="mt-5 flex items-start gap-2 rounded-xl border border-rose-400/20 bg-rose-400/5 p-4 text-xs leading-6 text-rose-100"><AlertCircle className="mt-1 h-4 w-4 shrink-0" />{submitError}</div>}
        </div>
        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-white/10 bg-[#0A1024]/95 px-5 py-4 sm:px-8"><button type="button" disabled={step === 0 || submitState === 'submitting'} onClick={() => setStep((step - 1) as Step)} className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-xs font-bold text-white transition-colors hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"><ArrowLeft className="h-4 w-4" />Back</button>{step < 3 ? <button type="button" onClick={() => { if (validateStep(step)) setStep((step + 1) as Step); }} className="inline-flex items-center gap-2 rounded-xl bg-[#4F7CFF] px-5 py-3 text-xs font-bold text-white transition-colors hover:bg-[#5B8CFF]">Continue<ArrowRight className="h-4 w-4" /></button> : <button type="submit" disabled={submitState === 'submitting' || !careersApiUrl} className="inline-flex items-center gap-2 rounded-xl bg-[#4F7CFF] px-5 py-3 text-xs font-bold text-white transition-colors hover:bg-[#5B8CFF] disabled:cursor-not-allowed disabled:opacity-50">{submitState === 'submitting' ? <><Loader2 className="h-4 w-4 animate-spin" />Submitting…</> : <>Submit Application<CheckCircle2 className="h-4 w-4" /></>}</button>}</div>
      </form>
    </div>
  </div>;
};

