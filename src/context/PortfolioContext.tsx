'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Project, Experience, Skill } from '@/types';
const defaultSkills: Skill[] = [
  { id: 'sk-1', name: 'HTML5', category: 'frontend', level: 90 },
  { id: 'sk-2', name: 'CSS3 / Tailwind CSS', category: 'frontend', level: 90 },
  { id: 'sk-3', name: 'JavaScript (ES6+)', category: 'frontend', level: 88 },
  { id: 'sk-4', name: 'TypeScript', category: 'frontend', level: 85 },
  { id: 'sk-5', name: 'React.js', category: 'frontend', level: 92 },
  { id: 'sk-6', name: 'Next.js', category: 'frontend', level: 88 },
  { id: 'sk-7', name: 'Node.js', category: 'backend', level: 85 },
  { id: 'sk-8', name: 'Express.js', category: 'backend', level: 88 },
  { id: 'sk-9', name: 'REST APIs', category: 'backend', level: 90 },
  { id: 'sk-10', name: 'MongoDB', category: 'database', level: 86 },
  { id: 'sk-11', name: 'Mongoose', category: 'database', level: 88 },
  { id: 'sk-12', name: 'Git & GitHub', category: 'other', level: 85 },
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

interface PortfolioContextType {
  projects: Project[];
  experiences: Experience[];
  skills: Skill[];
  projectsLoading: boolean;
  experiencesLoading: boolean;
  skillsLoading: boolean;
  isInitialLoaded: boolean;
  refetchProjects: () => Promise<void>;
  refetchExperiences: () => Promise<void>;
  refetchSkills: () => Promise<void>;
  refetchAll: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType>({
  projects: defaultProjects,
  experiences: defaultExperiences,
  skills: defaultSkills,
  projectsLoading: false,
  experiencesLoading: false,
  skillsLoading: false,
  isInitialLoaded: true,
  refetchProjects: async () => { },
  refetchExperiences: async () => { },
  refetchSkills: async () => { },
  refetchAll: async () => { },
});

const CACHE_KEY = 'portfolio_data_cache';

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [experiences, setExperiences] = useState<Experience[]>(defaultExperiences);
  const [skills, setSkills] = useState<Skill[]>(defaultSkills);

  const [projectsLoading, setProjectsLoading] = useState(false);
  const [experiencesLoading, setExperiencesLoading] = useState(false);
  const [skillsLoading, setSkillsLoading] = useState(false);
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

  const refetchAll = useCallback(async () => {
    const [pData, eData, sData] = await Promise.all([
      fetchProjects(),
      fetchExperiences(),
      fetchSkills(),
    ]);

    if (pData || eData || sData) {
      try {
        const cacheObj = {
          projects: pData || defaultProjects,
          experiences: eData || defaultExperiences,
          skills: sData || defaultSkills,
          timestamp: Date.now(),
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheObj));
      } catch (e) {
        console.error('Error saving portfolio cache:', e);
      }
    }
  }, [fetchProjects, fetchExperiences, fetchSkills]);

  useEffect(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.projects && parsed.projects.length > 0) setProjects(parsed.projects);
        if (parsed.experiences && parsed.experiences.length > 0) setExperiences(parsed.experiences);
        if (parsed.skills && parsed.skills.length > 0) setSkills(parsed.skills);
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
        projectsLoading,
        experiencesLoading,
        skillsLoading,
        isInitialLoaded,
        refetchProjects: fetchProjects,
        refetchExperiences: fetchExperiences,
        refetchSkills: fetchSkills,
        refetchAll,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);
