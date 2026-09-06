'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Mail, Briefcase, ChevronRight, Code2, Database, Terminal } from 'lucide-react';
const avatarImg = '/images/profile.jpeg';

interface HeroProps {
  onContactClick: () => void;
  onProjectsClick: () => void;
}

const Hero = ({ onContactClick, onProjectsClick }: HeroProps) => {
  const items = [
    {
      text: "Hi, I'm Ehtisham.",
      color:
        'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent',
    },
    {
      text: 'Full-Stack MERN Developer building web applications.',
      color:
        'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentItem = items[currentIndex];
    const fullText = currentItem.text;

    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText === fullText) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % items.length);
    } else {
      const typingSpeed = isDeleting ? 25 : 45;
      timeout = setTimeout(() => {
        setDisplayText((prev) =>
          isDeleting
            ? fullText.substring(0, prev.length - 1)
            : fullText.substring(0, prev.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex, items]);

  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-gradient-to-b from-zinc-50/50 via-white to-zinc-50/30 px-6 py-20 transition-colors duration-300 dark:from-zinc-950/50 dark:via-zinc-950 dark:to-zinc-950/30"
    >
      <div className="absolute top-1/4 left-1/4 -z-10 h-96 w-96 rounded-full bg-indigo-400/10 blur-3xl dark:bg-indigo-500/5" />
      <div className="absolute bottom-1/3 right-1/4 -z-10 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl dark:bg-emerald-500/5" />

      <div className="mx-auto w-full max-w-5xl">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="space-y-6 text-left lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white/80 px-4 py-1.5 text-xs font-semibold tracking-wide text-zinc-800 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-200"
            >
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Available for Freelance & Remote Work
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl md:text-4xl lg:text-4xl dark:text-zinc-50 leading-tight"
            >
              Building Production-Ready <br />
              <span className="bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 bg-clip-text text-transparent dark:from-white dark:via-zinc-300 dark:to-white">
                Full-Stack MERN Apps
              </span>
            </motion.h1>
            <div className="relative h-16 sm:h-12 flex items-center">
              <p className="text-lg font-bold sm:text-xl leading-snug">
                <span className={items[currentIndex].color}>
                  {displayText}
                </span>
                <span className="ml-1 inline-block h-5 w-[2px] bg-zinc-900 align-middle animate-pulse dark:bg-zinc-100" />
              </p>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-xl text-base sm:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400"
            >
              Passionate about specializing in React, Next.js, Node.js, Express, and MongoDB.
              I design and build secure, blazing fast, and highly responsive web experiences
              using state-of-the-art cloud tools.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                onClick={onProjectsClick}
                className="group flex items-center gap-2 rounded-lg bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-zinc-800 hover:shadow-lg dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-100 cursor-pointer"
                id="hero-cta-projects"
              >
                <Briefcase className="h-4 w-4" />
                View Projects
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              <button
                onClick={onContactClick}
                className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 cursor-pointer"
                id="hero-cta-contact"
              >
                <Mail className="h-4 w-4" />
                Let&apos;s Talk
              </button>
            </motion.div>
          </div>

          <div className="relative flex justify-center lg:col-span-5 lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative h-72 w-72 sm:h-80 sm:w-80 md:h-88 md:w-88"
            >
              <div className="absolute inset-0 rounded-3xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 animate-spin-slow" />
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-emerald-500 opacity-20 blur-xl dark:opacity-30" />
              <div className="absolute inset-3 overflow-hidden rounded-2xl border-4 border-white bg-zinc-100 shadow-xl dark:border-zinc-900 dark:bg-zinc-800">
                <img
                  src={avatarImg}
                  alt="MERN Stack Developer"
                  className="h-full w-full object-cover"
                />
              </div>

              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="absolute -top-3 -right-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-md border border-zinc-100 dark:bg-zinc-900 dark:border-zinc-800 text-indigo-500"
              >
                <Code2 className="h-5 w-5" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                className="absolute -bottom-3 -left-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-md border border-zinc-100 dark:bg-zinc-900 dark:border-zinc-800 text-emerald-500"
              >
                <Database className="h-5 w-5" />
              </motion.div>

              <motion.div
                animate={{ x: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="absolute bottom-1/4 -right-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-md border border-zinc-100 dark:bg-zinc-900 dark:border-zinc-800 text-amber-500"
              >
                <Terminal className="h-5 w-5" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 border-t border-zinc-200/60 pt-8 dark:border-zinc-800/40 text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Core Specialized Tech Stack
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm font-medium text-zinc-400 dark:text-zinc-600">
            <span className="hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors cursor-default">MongoDB</span>
            <span className="text-zinc-200 dark:text-zinc-800">•</span>
            <span className="hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors cursor-default">Express.js</span>
            <span className="text-zinc-200 dark:text-zinc-800">•</span>
            <span className="hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors cursor-default">React.js</span>
            <span className="text-zinc-200 dark:text-zinc-800">•</span>
            <span className="hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors cursor-default">Node.js</span>
            <span className="text-zinc-200 dark:text-zinc-800">•</span>
            <span className="hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors cursor-default">Next.js</span>
            <span className="text-zinc-200 dark:text-zinc-800">•</span>
            <span className="hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors cursor-default">TypeScript</span>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 cursor-pointer text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hidden lg:block"
          onClick={() => {
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
          }}
          id="scroll-indicator"
        >
          <ArrowDown className="h-5 w-5" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;