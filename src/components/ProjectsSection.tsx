'use client';

import { Project } from '../types';
import { ExternalLink, Github, FolderGit2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';

interface ProjectsSectionProps {
  projects?: Project[];
}

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const projectId = project.id || project._id || project.title;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      className="flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-xs transition-all duration-300 hover:shadow-md hover:-translate-y-1 dark:border-zinc-800 dark:bg-zinc-900/40"
      id={`project-card-${projectId}`}
    >
      {project.image ? (
        <div className="relative h-48 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            onError={(e) => {
              (e.target as HTMLElement).parentElement!.style.display = 'none';
            }}
          />
          <span className="absolute top-3 right-3 rounded-full bg-zinc-900/80 backdrop-blur-xs px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs z-10">
            {project.category}
          </span>
        </div>
      ) : (
        <div className="flex items-center justify-between p-6 pb-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
            <FolderGit2 className="h-5 w-5" />
          </div>
          <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
            {project.category}
          </span>
        </div>
      )}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{project.title}</h3>
        <p className="mt-2.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300 flex-1 line-clamp-3">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech?.map((t, idx) => (
            <span
              key={`${t}-${idx}`}
              className="rounded-md bg-zinc-100/70 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:bg-zinc-800/60 dark:text-zinc-300"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-zinc-100 dark:border-zinc-800 px-6 py-4">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
            id={`project-github-link-${projectId}`}
          >
            <Github className="h-3.5 w-3.5" />
            Code
          </a>
        )}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-zinc-800 hover:text-zinc-950 dark:text-zinc-200 dark:hover:text-white transition-colors"
            id={`project-demo-link-${projectId}`}
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Live Demo
          </a>
        )}
      </div>
    </motion.div>
  );
};

const ProjectsSection = ({ projects: propProjects }: ProjectsSectionProps) => {
  const projectsList = propProjects || [];
  const explicitlyFeatured = projectsList.filter((p) => p.featured === true);
  const featuredProjects = explicitlyFeatured.length > 0 ? explicitlyFeatured : projectsList.slice(0, 3);
  const hasMore = projectsList.length > featuredProjects.length;

  return (
    <section
      id="projects"
      className="bg-zinc-50 px-6 py-24 transition-colors duration-300 dark:bg-zinc-950/60 border-t border-zinc-100 dark:border-zinc-900"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-1.5 text-xs font-semibold tracking-wide text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 mb-4">
            <FolderGit2 className="h-3.5 w-3.5" />
            Featured Work
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
            Featured Projects
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
            A handpicked selection of production systems, complex full-stack solutions, and open-source applications that highlight my code quality and problem solving.
          </p>
        </motion.div>
        {projectsList.length === 0 ? (
          <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/40"
              >
                <div className="h-44 w-full rounded-lg bg-zinc-200 dark:bg-zinc-800 mb-4" />
                <div className="h-5 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800 mb-2" />
                <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-800 mb-1" />
                <div className="h-4 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800 mb-4" />
                <div className="flex gap-2">
                  <div className="h-6 w-16 rounded bg-zinc-200 dark:bg-zinc-800" />
                  <div className="h-6 w-16 rounded bg-zinc-200 dark:bg-zinc-800" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project, index) => (
                <ProjectCard key={project.id || project._id || project.title} project={project} index={index} />
              ))}
            </div>
            {hasMore && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.35 }}
                className="mt-12 flex justify-center"
              >
                <Link
                  href="/projects"
                  className="group inline-flex items-center gap-2.5 rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-800 shadow-xs transition-all hover:bg-zinc-900 hover:text-white hover:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-100 dark:hover:text-zinc-950 dark:hover:border-zinc-100"
                  id="view-all-projects-btn"
                >
                  View All Projects
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-all group-hover:bg-white/20 group-hover:text-white dark:bg-zinc-800 dark:text-zinc-400 dark:group-hover:bg-zinc-700">
                    <ArrowRight className="h-3 w-3" />
                  </span>
                  <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-bold text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                    +{projectsList.length - 3} more
                  </span>
                </Link>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
