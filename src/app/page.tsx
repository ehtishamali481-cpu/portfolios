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
import { Heart } from 'lucide-react';
import { PortfolioProvider, usePortfolio } from '@/context/PortfolioContext';

function PortfolioContent() {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [mounted, setMounted] = useState(false);

  const [activeSection, setActiveSection] = useState('hero');
  const [showDashboard, setShowDashboard] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const { projects, experiences, skills, refetchAll } = usePortfolio();

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme');

    if (saved === 'light') {
      setDarkMode(false);
    } else {
      setDarkMode(true);
    }

    setToken(localStorage.getItem('adminToken'));
  }, []);

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

  const handleLoginSuccess = (newToken: string, newUsername: string) => {
    setToken(newToken);
    localStorage.setItem('adminToken', newToken);
    localStorage.setItem('adminUsername', newUsername);
    refetchAll();
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
    setShowDashboard(false);
  };

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

        {showDashboard ? (
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
          /* Public Portfolio View - Zero Blocking Instant Render */
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

export default function HomePage() {
  return (
    <PortfolioProvider>
      <PortfolioContent />
    </PortfolioProvider>
  );
}

