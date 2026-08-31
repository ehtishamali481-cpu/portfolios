
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
  category: 'frontend' | 'backend' | 'database' | 'other';
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

