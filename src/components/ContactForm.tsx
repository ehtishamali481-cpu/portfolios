'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message.');
      }

      setSuccess('Thank you! Your message has been sent. It has been received directly on the dashboard');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Kuch error aya ha. Please dobara try krain.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="w-full max-w-full overflow-x-hidden bg-zinc-50 px-4 sm:px-6 py-16 sm:py-24 transition-colors duration-300 dark:bg-zinc-950/60 border-t border-zinc-100 dark:border-zinc-900">
      <div className="mx-auto max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_55%] gap-8 lg:gap-12 items-stretch">
          <div className="flex flex-col justify-between h-full space-y-6 lg:space-y-0">
            <div>
              <span className="text-xs font-mono font-semibold tracking-wider text-teal-500 uppercase">
            // get in touch
              </span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
                Let's build something.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                Have a project in mind or just want to say hi? Reach out through any of these.
              </p>
            </div>
            <div className="flex flex-col justify-between flex-1 mt-6 lg:mt-8 gap-4 sm:gap-6">
              <a
                className="flex items-center gap-3 font-mono text-sm px-5 py-4 sm:py-5 rounded-xl border border-zinc-200/80 bg-white text-zinc-800 shadow-xs transition-all duration-200 hover:border-teal-500 hover:text-teal-500 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-200 dark:hover:border-teal-400 dark:hover:text-teal-400"
                href="mailto:webexpress987@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-base">✉</span>
                <span className="truncate">webexpress987@gmail.com</span>
              </a>
              <a
                className="flex items-center gap-3 font-mono text-sm px-5 py-4 sm:py-5 rounded-xl border border-zinc-200/80 bg-white text-zinc-800 shadow-xs transition-all duration-200 hover:border-teal-500 hover:text-teal-500 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-200 dark:hover:border-teal-400 dark:hover:text-teal-400"
                href="https://github.com/ehtishamali481-cpu/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-base">⌥</span>
                <span>GitHub</span>
              </a>
              <a
                className="flex items-center gap-3 font-mono text-sm px-5 py-4 sm:py-5 rounded-xl border border-zinc-200/80 bg-white text-zinc-800 shadow-xs transition-all duration-200 hover:border-teal-500 hover:text-teal-500 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-200 dark:hover:border-teal-400 dark:hover:text-teal-400"
                href="https://www.linkedin.com/in/ehtisham-ali-526a4b265?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-base">in</span>
                <span>LinkedIn</span>
              </a>
              <a
                className="flex items-center gap-3 font-mono text-sm px-5 py-4 sm:py-5 rounded-xl border border-zinc-200/80 bg-white text-zinc-800 shadow-xs transition-all duration-200 hover:border-teal-500 hover:text-teal-500 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-200 dark:hover:border-teal-400 dark:hover:text-teal-400"
                href="/resume.pdf"
                download="resume.pdf"
                target='blank'
              >
                <span className="text-base">⇩</span>
                <span>Download CV (PDF)</span>
              </a>
            </div>
          </div>
          <div className="w-full max-w-full">
            <div className="text-center lg:text-left mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                Send a Message
              </h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                Have a question or want to discuss a project?
                Drop a message here, and it will go straight to my dashboard.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200/80 bg-white p-2 sm:p-6 shadow-xs transition-colors duration-300 dark:border-zinc-800 dark:bg-zinc-900/40 w-full">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6" id="client-contact-form">
                <div className="grid gap-2 sm:gap-6 grid-cols-1 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="contact-name"
                      className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter Your Name"
                      className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-900 placeholder-zinc-400 outline-none transition-all focus:border-zinc-900 focus:bg-white dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder-zinc-600 dark:focus:border-zinc-100 dark:focus:bg-zinc-950"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="contact-email"
                      className="text-xs font-bold uppercase tracking-wider text-zinc-500"
                    >
                      Your Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@dev.com"
                      className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-900 placeholder-zinc-400 outline-none transition-all focus:border-zinc-900 focus:bg-white dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder-zinc-600 dark:focus:border-zinc-100 dark:focus:bg-zinc-950"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="contact-subject"
                    className="text-xs font-bold uppercase tracking-wider text-zinc-500"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Collaboration"
                    className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-900 placeholder-zinc-400 outline-none transition-all focus:border-zinc-900 focus:bg-white dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder-zinc-600 dark:focus:border-zinc-100 dark:focus:bg-zinc-950"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="contact-message"
                    className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your project details or questions..."
                    className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-900 placeholder-zinc-400 outline-none transition-all focus:border-zinc-900 focus:bg-white dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder-zinc-600 dark:focus:border-zinc-100 dark:focus:bg-zinc-950"
                  ></textarea>
                </div>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 rounded-lg bg-red-50 p-4 text-sm font-medium text-red-700 dark:bg-red-950/20 dark:text-red-400"
                  >
                    <AlertCircle className="h-4.5 w-4.5 shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 rounded-lg bg-emerald-50 p-4 text-sm font-medium text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400"
                  >
                    <CheckCircle2 className="h-4.5 w-4.5 shrink-0" />
                    <span>{success}</span>
                  </motion.div>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-100 cursor-pointer"
                  id="contact-submit-btn"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4.5 w-4.5 animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>

  );
}