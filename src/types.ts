export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  longDescription: string;
  deliverables: string[];
  icon: string;
  metricsHighlight: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  service: string;
  keyResult: string;
  roas: string;
  revenue: string;
  image: string;
  summary: string;
  strategy: string[];
  resultsBreakdown: { label: string; value: string }[];
  featured?: boolean;
  niche?: string;
}

export interface CareerPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
}

export type ActiveTab = 'home' | 'about' | 'services' | 'work' | 'results' | 'careers' | 'privacy' | 'terms' | 'strategy-call';
