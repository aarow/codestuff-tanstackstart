export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon: 'github' | 'linkedin' | 'twitter' | 'email';
}
