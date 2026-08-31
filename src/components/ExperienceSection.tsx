import { Experience } from '../types';
import { Calendar, Building, Award } from 'lucide-react';

interface ExperienceProps {
  experiences: Experience[];
}

const ExperienceSection = ({ experiences }: ExperienceProps) => {
  return (
    <section
      id="experience"
      className="bg-white px-6 py-24 transition-colors duration-300 dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900"
    >
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            Work Experience
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-zinc-600 dark:text-zinc-400">
            A look back at the roles, companies, and responsibilities that have defined my software engineering journey.
          </p>
        </div>
        <div className="relative mt-16 border-l border-zinc-200 pl-6 dark:border-zinc-800">
          {experiences.map((exp, index) => {
            const expId = exp.id || exp._id || index.toString();
            return (
              <div
                key={expId}
                className={`relative ${index !== 0 ? 'mt-12' : ''}`}
                id={`exp-item-${expId}`}
              >
                <span className="absolute -left-[35px] top-1.5 flex h-6.5 w-6.5 items-center justify-center rounded-full bg-zinc-900 text-white shadow-xs border-4 border-white dark:bg-zinc-50 dark:text-zinc-950 dark:border-zinc-950">
                  <Award className="h-3 w-3" />
                </span>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                    {exp.role}
                  </h3>
                  <span className="flex items-center gap-1 text-xs font-semibold text-zinc-500 bg-zinc-50 border border-zinc-150 px-2.5 py-1 rounded-full dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400">
                    <Calendar className="h-3 w-3" />
                    {exp.duration}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                  <Building className="h-4 w-4" />
                  <span>{exp.company}</span>
                </div>
                <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {exp.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;