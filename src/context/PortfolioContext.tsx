'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Project, Experience, Skill, Certificate } from '@/types';
export const defaultSkills: Skill[] = [
  { id: 'sk-1', name: 'HTML5', category: 'frontend', level: 90 },
  { id: 'sk-2', name: 'CSS3 / Tailwind CSS', category: 'frontend', level: 90 },
  { id: 'sk-3', name: 'JavaScript (ES6+)', category: 'frontend', level: 88 },
  { id: 'sk-4', name: 'TypeScript', category: 'frontend', level: 85 },
  { id: 'sk-5', name: 'React.js', category: 'frontend', level: 92 },
  { id: 'sk-6', name: 'Next.js', category: 'frontend', level: 88 },
  { id: 'sk-7', name: 'Node.js / Express.js', category: 'backend', level: 88 },
  { id: 'sk-8', name: 'Python', category: 'backend', level: 82 },
  { id: 'sk-9', name: 'FastAPI', category: 'backend', level: 85 },
  { id: 'sk-10', name: 'REST APIs & GraphQL', category: 'backend', level: 90 },
  { id: 'sk-11', name: 'MongoDB / Mongoose', category: 'database', level: 88 },
  { id: 'sk-12', name: 'SQL / PostgreSQL', category: 'database', level: 85 },
  { id: 'sk-13', name: 'Playwright', category: 'testing', level: 82 },
  { id: 'sk-14', name: 'Selenium', category: 'testing', level: 80 },
  { id: 'sk-15', name: 'Git & GitHub', category: 'other', level: 85 },
];

const defaultProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'Full-Stack MERN E-Commerce Store',
    description:
      'A production-ready e-commerce platform with real-time inventory management, payment integration, user authentication, and admin dashboard.',
    category: 'Full Stack',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
    github: 'https://github.com',
    link: 'https://example.com',
  },
  {
    id: 'proj-2',
    title: 'Dynamic Portfolio & Admin CMS',
    description:
      'Interactive personal portfolio built with Next.js App Router, JWT authorization, MongoDB backend, and secure administrative controls.',
    category: 'Next.js',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MongoDB', 'JWT'],
    github: 'https://github.com',
    link: 'https://example.com',
  },
  {
    id: 'proj-3',
    title: 'Real-Time Analytics & Messaging System',
    description:
      'High-performance backend API with MongoDB indexing, automated validation schemas, and real-time message handling.',
    category: 'Backend',
    tech: ['Node.js', 'Express.js', 'MongoDB', 'REST API'],
    github: 'https://github.com',
  },
];

const defaultExperiences: Experience[] = [
  {
    id: 'exp-1',
    role: 'Full Stack MERN Developer',
    company: 'Independent / Freelance',
    duration: '2023 - Present',
    description:
      'Architecting modern web applications using MongoDB, Express, React, and Node.js. Designing REST APIs, database schemas, and responsive UI components.',
  },
  {
    id: 'exp-2',
    role: 'Frontend Developer',
    company: 'Web Solutions',
    duration: '2022 - 2023',
    description:
      'Built interactive client dashboards and web applications using React, Next.js, and Tailwind CSS with focus on performance optimization and UI accessibility.',
  },
];

const defaultCertificates: Certificate[] = [];

interface PortfolioContextType {
  projects: Project[];
  experiences: Experience[];
  skills: Skill[];
  certificates: Certificate[];
  projectsLoading: boolean;
  experiencesLoading: boolean;
  skillsLoading: boolean;
  certificatesLoading: boolean;
  isInitialLoaded: boolean;
  refetchProjects: () => Promise<void>;
  refetchExperiences: () => Promise<void>;
  refetchSkills: () => Promise<void>;
  refetchCertificates: () => Promise<void>;
  refetchAll: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType>({
  projects: defaultProjects,
  experiences: defaultExperiences,
  skills: defaultSkills,
  certificates: defaultCertificates,
  projectsLoading: false,
  experiencesLoading: false,
  skillsLoading: false,
  certificatesLoading: false,
  isInitialLoaded: true,
  refetchProjects: async () => { },
  refetchExperiences: async () => { },
  refetchSkills: async () => { },
  refetchCertificates: async () => { },
  refetchAll: async () => { },
});

const CACHE_KEY = 'portfolio_data_cache';

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [experiences, setExperiences] = useState<Experience[]>(defaultExperiences);
  const [skills, setSkills] = useState<Skill[]>(defaultSkills);
  const [certificates, setCertificates] = useState<Certificate[]>(defaultCertificates);

  const [projectsLoading, setProjectsLoading] = useState(false);
  const [experiencesLoading, setExperiencesLoading] = useState(false);
  const [skillsLoading, setSkillsLoading] = useState(false);
  const [certificatesLoading, setCertificatesLoading] = useState(false);
  const [isInitialLoaded, setIsInitialLoaded] = useState(false);

  const parseResponse = async (res: Response) => {
    if (!res.ok) return null;
    const json = await res.json();
    if (Array.isArray(json)) return json;
    if (json && json.success && Array.isArray(json.data)) return json.data;
    if (json && Array.isArray(json.projects)) return json.projects;
    return null;
  };

  const fetchProjects = useCallback(async () => {
    setProjectsLoading(true);
    try {
      const res = await fetch('/api/projects');
      const data = await parseResponse(res);
      if (data && data.length > 0) {
        setProjects(data);
        return data;
      }
    } catch (err) {
      console.warn('Using cached/default projects due to network delay');
    } finally {
      setProjectsLoading(false);
    }
    return null;
  }, []);

  const fetchExperiences = useCallback(async () => {
    setExperiencesLoading(true);
    try {
      const res = await fetch('/api/experiences');
      const data = await parseResponse(res);
      if (data && data.length > 0) {
        setExperiences(data);
        return data;
      }
    } catch (err) {
      console.warn('Using cached/default experiences due to network delay');
    } finally {
      setExperiencesLoading(false);
    }
    return null;
  }, []);

  const fetchSkills = useCallback(async () => {
    setSkillsLoading(true);
    try {
      const res = await fetch('/api/skills');
      const data = await parseResponse(res);
      if (data && data.length > 0) {
        setSkills(data);
        return data;
      }
    } catch (err) {
      console.warn('Using cached/default skills due to network delay');
    } finally {
      setSkillsLoading(false);
    }
    return null;
  }, []);

  const fetchCertificates = useCallback(async () => {
    setCertificatesLoading(true);
    try {
      const res = await fetch('/api/certificates');
      const data = await parseResponse(res);
      if (data !== null) {
        setCertificates(data || []);
        return data || [];
      }
    } catch (err) {
      console.warn('Using cached/default certificates due to network delay');
    } finally {
      setCertificatesLoading(false);
    }
    return null;
  }, []);

  const refetchAll = useCallback(async () => {
    const [pData, eData, sData, cData] = await Promise.all([
      fetchProjects(),
      fetchExperiences(),
      fetchSkills(),
      fetchCertificates(),
    ]);

    if (pData || eData || sData || cData) {
      try {
        const cacheObj = {
          projects: pData || defaultProjects,
          experiences: eData || defaultExperiences,
          skills: sData || defaultSkills,
          certificates: cData || defaultCertificates,
          timestamp: Date.now(),
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheObj));
      } catch (e) {
        console.error('Error saving portfolio cache:', e);
      }
    }
  }, [fetchProjects, fetchExperiences, fetchSkills, fetchCertificates]);

  useEffect(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.projects && parsed.projects.length > 0) setProjects(parsed.projects);
        if (parsed.experiences && parsed.experiences.length > 0) setExperiences(parsed.experiences);
        if (parsed.skills && parsed.skills.length > 0) setSkills(parsed.skills);
        if (parsed.certificates) setCertificates(parsed.certificates);
      }
    } catch (err) {
      console.error('Error reading initial cache:', err);
    }

    setIsInitialLoaded(true);

    refetchAll();
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        projects,
        experiences,
        skills,
        certificates,
        projectsLoading,
        experiencesLoading,
        skillsLoading,
        certificatesLoading,
        isInitialLoaded,
        refetchProjects: fetchProjects,
        refetchExperiences: fetchExperiences,
        refetchSkills: fetchSkills,
        refetchCertificates: fetchCertificates,
        refetchAll,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);
