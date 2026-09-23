'use client';

import { useState, useEffect } from 'react';
import { Project } from '@/types';
import { ExternalLink, Github, FolderGit2, ArrowLeft, Search } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const projectId = project.id || project._id || project.title;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.08 }}
      className="flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-xs transition-all duration-300 hover:shadow-md hover:-translate-y-1 dark:border-zinc-800 dark:bg-zinc-900/40"
    >
      {project.image ? (
        <div className="relative h-44 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            onError={(e) => { (e.target as HTMLElement).parentElement!.style.display = 'none'; }}
          />
          <span className="absolute top-3 right-3 rounded-full bg-zinc-900/80 backdrop-blur-xs px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white z-10">
            {project.category}
          </span>
        </div>
      ) : (
        <div className="flex items-center justify-between p-5 pb-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-50 dark:bg-zinc-800">
            <FolderGit2 className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
          </div>
          <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
            {project.category}
          </span>
        </div>
      )}

      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300 flex-1 line-clamp-3">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech?.map((t, idx) => (
            <span key={`${t}-${idx}`} className="rounded-md bg-zinc-100/70 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:bg-zinc-800/60 dark:text-zinc-300">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-zinc-100 dark:border-zinc-800 px-5 py-4">
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors">
            <Github className="h-3.5 w-3.5" /> Code
          </a>
        )}
        {project.link && (
          <a href={project.link} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-zinc-800 hover:text-zinc-950 dark:text-zinc-200 dark:hover:text-white transition-colors">
            <ExternalLink className="h-3.5 w-3.5" /> Live Demo
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default function AllProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    setDarkMode(saved !== 'light');
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        const list = Array.isArray(data) ? data : data.projects || [];
        setProjects(list);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

  const filtered = projects.filter((p) => {
    const matchCat = filter === 'All' || p.category === filter;
    const matchSearch =
      search.trim() === '' ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.tech?.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-100">
      <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/80">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            All Projects
          </span>
          <span className="text-xs text-zinc-400">{projects.length} total</span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-1.5 text-xs font-semibold tracking-wide text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 mb-4">
            <FolderGit2 className="h-3.5 w-3.5" />
            Complete Portfolio
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
            All Projects
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-zinc-600 dark:text-zinc-300">
            Every project I have built — from side experiments to production systems.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mb-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white pl-9 pr-4 py-2 text-sm outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:focus:border-zinc-600"
            />
          </div>
          {categories.length > 2 && (
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${filter === cat
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950'
                      : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </motion.div>
        {loading ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/40">
                <div className="h-40 rounded-lg bg-zinc-200 dark:bg-zinc-800 mb-4" />
                <div className="h-5 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800 mb-2" />
                <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-800 mb-1" />
                <div className="h-4 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 py-20 text-center dark:border-zinc-800">
            <FolderGit2 className="mx-auto h-8 w-8 text-zinc-400" />
            <p className="mt-3 text-sm text-zinc-500">No projects match your search.</p>
            <button
              onClick={() => { setFilter('All'); setSearch(''); }}
              className="mt-4 text-xs font-semibold text-zinc-700 underline dark:text-zinc-300 cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, index) => (
              <ProjectCard key={project.id || project._id || project.title} project={project} index={index} />
            ))}
          </div>
        )}
      </main>
      <footer className="mt-20 border-t border-zinc-200 bg-white py-8 dark:border-zinc-900 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} MERN Developer — All rights reserved.
          </p>
          <Link
            href="/"
            className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3 w-3" />
            Back to Portfolio
          </Link>
        </div>
      </footer>
    </div>
  );
}
