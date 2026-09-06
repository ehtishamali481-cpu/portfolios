'use client';

import { useState } from 'react';
import { Project } from '../types';
import { ExternalLink, Github, FolderGit2, FileSpreadsheet } from 'lucide-react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { usePortfolio } from '@/context/PortfolioContext';

interface ProjectsSectionProps {
  projects?: Project[];
}

const ProjectsSection = ({ projects: propProjects }: ProjectsSectionProps) => {
  const { projects: contextProjects, projectsLoading } = usePortfolio();
  const projectsList = propProjects || contextProjects || [];
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...Array.from(new Set(projectsList.map((p) => p.category)))];

  const filteredProjects =
    filter === 'All' ? projectsList : projectsList.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
      className="bg-zinc-50 px-6 py-24 transition-colors duration-300 dark:bg-zinc-950/60 border-t border-zinc-100 dark:border-zinc-900"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
            Featured Projects
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
            A handpicked selection of production systems, complex full-stack solutions, and open-source applications that highlight my code quality and problem solving.
          </p>
        </div>

        {categories.length > 2 && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${filter === cat
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950'
                  : 'bg-white text-zinc-600 border border-zinc-200/80 hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800 dark:hover:bg-zinc-800'
                  }`}
                id={`filter-btn-${cat}`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {projectsLoading && filteredProjects.length === 0 ? (
          <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/40"
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
        ) : filteredProjects.length === 0 ? (
          <div className="mt-12 rounded-xl border border-dashed border-zinc-300 py-16 text-center dark:border-zinc-800">
            <FolderGit2 className="mx-auto h-8 w-8 text-zinc-400" />
            <p className="mt-3 text-sm text-zinc-500">No projects available.</p>
          </div>
        ) : (
          <div className="mt-12">
            <Swiper
              key={filter}
              modules={[Navigation, Pagination]}
              spaceBetween={24}
              slidesPerView={1}
              loop={filteredProjects.length > 3}
              navigation
              pagination={{ clickable: true }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="pb-12 !px-1 [&_.swiper-wrapper]:!items-stretch"
            >
              {filteredProjects.map((project) => {
                const projectId = project.id || project._id || project.title;
                return (
                  <SwiperSlide key={projectId} className="!h-auto flex flex-col">
                    <div
                      className="flex h-full flex-col justify-between overflow-hidden rounded-xl border border-zinc-200/80 bg-white p-6 shadow-xs transition-colors duration-300 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700"
                      id={`project-card-${projectId}`}
                    >
                      <div className="flex flex-col flex-1">
                        {project.image ? (
                          <div className="relative h-48 w-[calc(100%+3rem)] -mx-6 -mt-6 mb-4 overflow-hidden border-b border-zinc-150 dark:border-zinc-800/80 bg-zinc-100 dark:bg-zinc-800/60 shrink-0">
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
                          <div className="flex items-center justify-between shrink-0 mb-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
                              <FolderGit2 className="h-5 w-5" />
                            </div>
                            <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                              {project.category}
                            </span>
                          </div>
                        )}

                        <div className="flex flex-col flex-1">
                          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                            {project.title}
                          </h3>
                          <p className="mt-2.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300 flex-1">
                            {project.description}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 shrink-0">
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {project.tech?.map((t, idx) => (
                            <span
                              key={`${t}-${idx}`}
                              className="rounded-md bg-zinc-100/50 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:bg-zinc-800/60 dark:text-zinc-300"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
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
                          {project.testCasesLink && (
                            <a
                              href={project.testCasesLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
                              id={`project-test-cases-link-${projectId}`}
                              title="View Excel Test Cases Sheet"
                            >
                              <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-500" />
                              Test Cases
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;