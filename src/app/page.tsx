'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import ProjectsSection from '@/components/ProjectsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ContactForm from '@/components/ContactForm';
import Login from '@/components/Login';
import Dashboard from '@/components/Dashboard';
import { Project, Experience, Skill } from '@/types';
import { Loader2, Heart } from 'lucide-react';

export default function HomePage() {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [mounted, setMounted] = useState(false);

  const [activeSection, setActiveSection] = useState('hero');
  const [showDashboard, setShowDashboard] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // Database states
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize client state safely on mount
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme');

    // Agar pehle se explicitly 'light' saved nahi hai, toh default TRUE (Dark Mode) rakhein
    if (saved === 'light') {
      setDarkMode(false);
    } else {
      setDarkMode(true);
    }

    setToken(localStorage.getItem('adminToken'));
  }, []);

  // 2. Apply dark mode theme to HTML element
  useEffect(() => {
    if (!mounted) return;
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode, mounted]);

  // Load public portfolio data
  const loadPortfolioData = async () => {
    try {
      const [projRes, expRes, skillRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/experiences'),
        fetch('/api/skills'),
      ]);

      const parseData = async (res: Response) => {
        if (!res.ok) return [];
        const json = await res.json();
        if (Array.isArray(json)) return json;
        if (json && json.success && Array.isArray(json.data)) return json.data;
        return [];
      };

      const [pData, eData, sData] = await Promise.all([
        parseData(projRes),
        parseData(expRes),
        parseData(skillRes),
      ]);

      setProjects(pData);
      setExperiences(eData);
      setSkills(sData);
    } catch (err) {
      console.error('Error loading portfolio data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPortfolioData();
  }, []);

  // Handle successful login
  const handleLoginSuccess = (newToken: string, newUsername: string) => {
    setToken(newToken);
    localStorage.setItem('adminToken', newToken);
    localStorage.setItem('adminUsername', newUsername);
  };

  // Handle logout
  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
    setShowDashboard(false);
  };

  // Handle JWT token refresh
  const handleTokenRefresh = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('adminToken', newToken);
  };

  const scrollToSection = (id: string) => {
    setShowDashboard(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-100 flex flex-col justify-between">
      <div>
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          token={token}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          onShowDashboard={() => setShowDashboard(!showDashboard)}
          onCloseDashboard={() => setShowDashboard(false)}
          showDashboard={showDashboard}
        />

        {loading ? (
          <div className="flex h-[calc(100vh-4rem)] items-center justify-center bg-white dark:bg-zinc-950">
            <div className="text-center space-y-4">
              <Loader2 className="h-10 w-10 animate-spin text-zinc-900 dark:text-zinc-50 mx-auto" />
              <p className="text-sm font-semibold tracking-wide text-zinc-500">Loading Portfolio...</p>
            </div>
          </div>
        ) : showDashboard ? (
          /* Secure Dashboard View */
          token ? (
            <Dashboard
              token={token}
              onLogout={handleLogout}
              onTokenRefresh={handleTokenRefresh}
            />
          ) : (
            <Login onLoginSuccess={handleLoginSuccess} />
          )
        ) : (
          /* Public Portfolio View */
          <div>
            <Hero
              onContactClick={() => scrollToSection('contact')}
              onProjectsClick={() => scrollToSection('projects')}
            />
            <About skills={skills} />
            <ProjectsSection projects={projects} />
            <ExperienceSection experiences={experiences} />
            <ContactForm />
          </div>
        )}
      </div>

      {/* Footer Area */}
      <footer className="w-full border-t border-zinc-200 bg-white py-10 transition-colors duration-300 dark:border-zinc-900 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm font-semibold text-zinc-500">
            © {new Date().getFullYear()} MERN Developer. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-sm font-semibold text-zinc-400">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
            <span>by</span>
            <button
              onClick={() => {
                setShowDashboard(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-zinc-800 hover:text-zinc-950 dark:text-zinc-200 dark:hover:text-white underline font-bold cursor-pointer"
            >
              Ehtisham
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
