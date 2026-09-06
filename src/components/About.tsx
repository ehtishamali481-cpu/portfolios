import { Skill } from '../types';
import { motion } from 'motion/react';
import { usePortfolio } from '@/context/PortfolioContext';
import {
  Code2,
  Server,
  Database,
  Sparkles,
  FileCode,
  Wind,
  Atom,
  ShieldCheck,
  Zap,
  Waypoints,
  Leaf,
} from 'lucide-react';

interface AboutProps {
  skills?: Skill[];
}

const getSkillMeta = (skillName: string) => {
  const normalized = skillName.toLowerCase();

  if (normalized.includes('html')) {
    return {
      icon: <FileCode className="h-6 w-6 text-orange-600 dark:text-orange-400" />,
      colorClass: 'bg-orange-50 border-orange-100 dark:bg-orange-950/25 dark:border-orange-900/40 shadow-orange-100/50 dark:shadow-none',
      textColor: 'text-orange-900 dark:text-orange-200',
    };
  }
  if (normalized.includes('css') || normalized.includes('tailwind')) {
    return {
      icon: <Wind className="h-6 w-6 text-sky-600 dark:text-sky-400" />,
      colorClass: 'bg-sky-50 border-sky-100 dark:bg-sky-950/25 dark:border-sky-900/40 shadow-sky-100/50 dark:shadow-none',
      textColor: 'text-sky-900 dark:text-sky-200',
    };
  }
  if (normalized.includes('react') || normalized.includes('next.js') || normalized.includes('nextjs')) {
    return {
      icon: <Atom className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />,
      colorClass: 'bg-cyan-50 border-cyan-100 dark:bg-cyan-950/25 dark:border-cyan-900/40 shadow-cyan-100/50 dark:shadow-none',
      textColor: 'text-cyan-900 dark:text-cyan-200',
    };
  }
  if (normalized.includes('typescript') || (normalized.includes('js') && normalized.includes('type'))) {
    return {
      icon: <ShieldCheck className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      colorClass: 'bg-blue-50 border-blue-100 dark:bg-blue-950/25 dark:border-blue-900/40 shadow-blue-100/50 dark:shadow-none',
      textColor: 'text-blue-900 dark:text-blue-200',
    };
  }
  if (normalized.includes('node') || normalized.includes('express')) {
    return {
      icon: <Server className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
      colorClass: 'bg-emerald-50 border-emerald-100 dark:bg-emerald-950/25 dark:border-emerald-900/40 shadow-emerald-100/50 dark:shadow-none',
      textColor: 'text-emerald-900 dark:text-emerald-200',
    };
  }
  if (normalized.includes('fastapi')) {
    return {
      icon: <Zap className="h-6 w-6 text-teal-600 dark:text-teal-400" />,
      colorClass: 'bg-teal-50 border-teal-100 dark:bg-teal-950/25 dark:border-teal-900/40 shadow-teal-100/50 dark:shadow-none',
      textColor: 'text-teal-900 dark:text-teal-200',
    };
  }
  if (normalized.includes('rest api') || normalized.includes('graphql') || normalized.includes('apis')) {
    return {
      icon: <Waypoints className="h-6 w-6 text-fuchsia-600 dark:text-fuchsia-400" />,
      colorClass: 'bg-fuchsia-50 border-fuchsia-100 dark:bg-fuchsia-950/25 dark:border-fuchsia-900/40 shadow-fuchsia-100/50 dark:shadow-none',
      textColor: 'text-fuchsia-900 dark:text-fuchsia-200',
    };
  }
  if (normalized.includes('mongo') || normalized.includes('mongoose')) {
    return {
      icon: <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />,
      colorClass: 'bg-green-50 border-green-100 dark:bg-green-950/25 dark:border-green-900/40 shadow-green-100/50 dark:shadow-none',
      textColor: 'text-green-900 dark:text-green-200',
    };
  }
  if (normalized.includes('sql') || normalized.includes('postgres')) {
    return {
      icon: <Database className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />,
      colorClass: 'bg-indigo-50 border-indigo-100 dark:bg-indigo-950/25 dark:border-indigo-900/40 shadow-indigo-100/50 dark:shadow-none',
      textColor: 'text-indigo-900 dark:text-indigo-200',
    };
  }

  return {
    icon: <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
    colorClass: 'bg-purple-50 border-purple-100 dark:bg-purple-950/25 dark:border-purple-900/40 shadow-purple-100/50 dark:shadow-none',
    textColor: 'text-purple-900 dark:text-purple-200',
  };
};

const About = ({ skills: propSkills }: AboutProps) => {
  const { skills: contextSkills } = usePortfolio();
  const skillsList = propSkills || contextSkills || [];

  const categoryList = [
    {
      key: 'frontend',
      label: 'Frontend Development',
      icon: <Code2 className="h-5 w-5 text-indigo-500" />,
      items: skillsList.filter((s) => s.category === 'frontend'),
    },
    {
      key: 'backend',
      label: 'Backend Development',
      icon: <Server className="h-5 w-5 text-emerald-500" />,
      items: skillsList.filter((s) => s.category === 'backend'),
    },
    {
      key: 'database',
      label: 'Database Systems',
      icon: <Database className="h-5 w-5 text-amber-500" />,
      items: skillsList.filter((s) => s.category === 'database'),
    },
    {
      key: 'other',
      label: 'Other Tools & DevOps',
      icon: <Sparkles className="h-5 w-5 text-purple-500" />,
      items: skillsList.filter((s) => s.category === 'other'),
    },
  ];

  return (
    <section
      id="about"
      className="bg-white px-6 py-24 transition-colors duration-300 dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900"
    >
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
              Expertise & Skillset
            </h2>
            <p className="mt-6 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
              As a Full Stack MERN Developer, I build client-focused web platforms. I engineer reliable
              backends from scratch and combine them with dynamic, beautifully tailored frontend interfaces.
            </p>
            <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
              I place major focus on high speed optimization, clean security protocols, state synchronization,
              and responsive layouts that adapt cleanly from small touch screens to large desktop monitors.
            </p>

            <div className="mt-8 rounded-xl border border-zinc-100 bg-zinc-50/50 p-6 dark:border-zinc-900 dark:bg-zinc-900/40">
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">Quick Philosophy</h4>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                "Writing clean, modular, and maintainable code isn't just a requirement—it's a form of visual and functional craftsmanship."
              </p>
            </div>
          </div>
          <div className="space-y-10 lg:col-span-7">
            {categoryList.map((cat) => {
              if (cat.items.length === 0) return null;

              return (
                <div key={cat.key} className="space-y-5">
                  <div className="flex items-center gap-2 border-b border-zinc-100 pb-2 dark:border-zinc-900">
                    {cat.icon}
                    <h3 className="text-md font-bold text-zinc-800 dark:text-zinc-200">
                      {cat.label}
                    </h3>
                  </div>

                  <div className="grid gap-4 grid-cols-2 sm:grid-cols-3">
                    {cat.items.map((skill) => {
                      const meta = getSkillMeta(skill.name);
                      const skillId = skill.id || skill._id || skill.name;
                      return (
                        <motion.div
                          whileHover={{ y: -4, scale: 1.02 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                          key={skillId}
                          className={`flex flex-col items-center text-center p-4 rounded-xl border shadow-xs transition-all duration-300 ${meta.colorClass}`}
                        >
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/95 dark:bg-zinc-900/85 shadow-xs mb-3">
                            {meta.icon}
                          </div>

                          <span className={`text-xs sm:text-sm font-semibold tracking-wide ${meta.textColor}`}>
                            {skill.name}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;