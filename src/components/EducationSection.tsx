'use client';

import { GraduationCap, BookOpen, Calendar, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

const EducationSection = () => {
  return (
    <section
      id="education"
      className="bg-zinc-50 px-6 py-24 transition-colors duration-300 dark:bg-zinc-950/60 border-t border-zinc-100 dark:border-zinc-900"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-semibold tracking-wide text-indigo-700 dark:border-indigo-900/60 dark:bg-indigo-950/30 dark:text-indigo-400 mb-4"
          >
            <GraduationCap className="h-3.5 w-3.5" />
            Education
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100"
          >
            Academic Background
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl text-base text-zinc-600 dark:text-zinc-300 leading-relaxed"
          >
            My formal education that built the strong foundation for my technical skills and
            problem-solving capabilities.
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 mx-auto max-w-3xl"
        >
          <div className="relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-8 shadow-xs transition-all duration-300 hover:shadow-md hover:border-indigo-200 dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-indigo-900/50">
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-indigo-400/10 blur-3xl dark:bg-indigo-500/5 pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-purple-400/10 blur-3xl dark:bg-purple-500/5 pointer-events-none" />

            <div className="relative flex flex-col sm:flex-row items-start gap-6">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 leading-tight">
                      Bachelor of Science in Information System & Technology Management
                    </h3>
                    <p className="mt-1 text-base font-semibold text-indigo-600 dark:text-indigo-400">
                      BSIS&TM
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950/30 dark:border-emerald-900/50 dark:text-emerald-400 shrink-0">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Complete
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
                    <BookOpen className="h-4 w-4 text-indigo-500 dark:text-indigo-400 shrink-0" />
                    <span className="font-medium">National College Bussiness Administration & Economics (NCBA&E)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-500">
                    <Calendar className="h-4 w-4 text-indigo-400 shrink-0" />
                    <span>2022 – 2025</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-500">
                    <MapPin className="h-4 w-4 text-indigo-400 shrink-0" />
                    <span>Lahore, Pakistan</span>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  Pursuing a comprehensive computer science curriculum covering data structures,
                  algorithms, software engineering principles, database systems, and modern
                  web technologies. Applying academic knowledge to real-world projects and
                  freelance work throughout my studies.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {[
                    'Data Structures',
                    'Algorithms',
                    'OOP',
                    'Database Systems',
                    'Software Engineering',
                    'Web Development',
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg bg-indigo-50 px-2.5 py-1 text-[11px] font-semibold text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;
