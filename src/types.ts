
export interface Certificate {
  id: string;
  _id?: string;
  title: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Project {
  id: string;
  _id?: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  tech: string[];
  github?: string;
  link?: string;
  testCasesLink?: string;
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Experience {
  id: string;
  _id?: string;
  role: string;
  company: string;
  duration: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Skill {
  id: string;
  _id?: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'other' | 'testing';
  level: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Message {
  id: string;
  _id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read?: boolean;
  isRead?: boolean;
}

export interface AdminData {
  username: string;
  passwordHash: string;
}

export interface DatabaseSchema {
  messages: Message[];
  projects: Project[];
  experiences: Experience[];
  skills: Skill[];
  admin: AdminData;
}

export interface PageViewItem {
  id?: string;
  _id?: string;
  deviceId?: string;
  ip?: string;
  device: 'Mobile' | 'Desktop' | 'Tablet' | 'Other';
  browser: string;
  os: string;
  country: string;
  countryCode?: string;
  city: string;
  path: string;
  referrer?: string;
  screenResolution?: string;
  visitCount?: number;
  lastVisitedAt?: string;
  createdAt: string;
}

export interface AnalyticsSummary {
  totalViews: number;
  uniqueVisitors: number;
  viewsToday: number;
  devices: { name: string; count: number; percentage: number }[];
  locations: { country: string; city: string; countryCode?: string; count: number; percentage: number }[];
  browsers: { name: string; count: number; percentage: number }[];
  os: { name: string; count: number; percentage: number }[];
  recentVisits: PageViewItem[];
}

