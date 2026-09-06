'use client';

import { useState } from 'react';
import { Sun, Moon, Lock, Terminal, Menu, X, Download } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  token: string | null;
  activeSection: string;
  setActiveSection: (sec: string) => void;
  onShowDashboard: () => void;
  onCloseDashboard: () => void;
  showDashboard: boolean;
}

const Navbar = ({
  darkMode,
  setDarkMode,
  token,
  activeSection,
  setActiveSection,
  onShowDashboard,
  onCloseDashboard,
  showDashboard,
}: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    onCloseDashboard();
    setMobileMenuOpen(false);

    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-md transition-colors duration-300 dark:border-zinc-800/80 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <button
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-zinc-900 transition-opacity hover:opacity-90 dark:text-zinc-50 cursor-pointer"
          id="nav-logo"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-950">
            <Terminal className="h-5 w-5" />
          </div>
          <span className="font-semibold text-sm sm:text-base">MERN Developer</span>
        </button>
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-all cursor-pointer ${!showDashboard && activeSection === item.id
                ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-950'
                : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50'
                }`}
              id={`nav-link-${item.id}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900 cursor-pointer"
            aria-label="Toggle Theme"
            id="theme-toggle"
          >
            {darkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
          </button>
          <a
            className="hidden sm:inline-flex items-center gap-1.5 sm:gap-2 rounded-lg border border-zinc-200/80 bg-zinc-50/80 px-2.5 py-1.5 text-xs font-medium text-zinc-800 transition-all hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-200 dark:hover:bg-zinc-900 lg:px-3.5 lg:text-sm"
            href="/resume.pdf"
            download="resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Download</span> CV
          </a>
          {token ? (
            <button
              onClick={onShowDashboard}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${showDashboard
                ? 'border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-950'
                : 'border-zinc-200 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900'
                }`}
              id="nav-dashboard-toggle"
            >
              Dashboard
            </button>
          ) : (
            <button
              onClick={onShowDashboard}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${showDashboard
                ? 'border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-950'
                : 'border-zinc-200 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900'
                }`}
              id="nav-admin-login"
            >
              <Lock className="h-3.5 w-3.5" />
              <span>Admin</span>
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 transition-all md:hidden dark:border-zinc-800 dark:text-zinc-400 cursor-pointer"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="border-b border-zinc-200 bg-white px-6 py-4 md:hidden dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`rounded-lg px-4 py-2.5 text-left text-sm font-medium transition-all ${!showDashboard && activeSection === item.id
                  ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-950'
                  : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900'
                  }`}
              >
                {item.label}
              </button>
            ))}
            <div className="mt-2 border-t border-zinc-100 pt-3 dark:border-zinc-800">
              <a
                href="/resume.pdf"
                download="resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-zinc-100 py-2.5 text-sm font-medium text-zinc-900 transition-all hover:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
              >
                <Download className="h-4 w-4" />
                <span>Download CV (PDF)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;