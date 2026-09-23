'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Award,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Download,
  Maximize2,
} from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { motion, AnimatePresence } from 'motion/react';

const CertificatesSection = () => {
  const { certificates, certificatesLoading } = usePortfolio();
  const [visibleCount, setVisibleCount] = useState(3);
  const [selectedCertIndex, setSelectedCertIndex] = useState<number | null>(null);

  const visibleCertificates = certificates.slice(0, visibleCount);
  const hasMore = visibleCount < certificates.length;

  const currentCert =
    selectedCertIndex !== null && selectedCertIndex >= 0 && selectedCertIndex < certificates.length
      ? certificates[selectedCertIndex]
      : null;

  const closeLightbox = useCallback(() => {
    setSelectedCertIndex(null);
  }, []);

  const goToPrev = useCallback(() => {
    if (selectedCertIndex === null || certificates.length === 0) return;
    setSelectedCertIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : certificates.length - 1));
  }, [selectedCertIndex, certificates.length]);

  const goToNext = useCallback(() => {
    if (selectedCertIndex === null || certificates.length === 0) return;
    setSelectedCertIndex((prev) => (prev !== null && prev < certificates.length - 1 ? prev + 1 : 0));
  }, [selectedCertIndex, certificates.length]);
  useEffect(() => {
    if (selectedCertIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCertIndex, closeLightbox, goToPrev, goToNext]);

  return (
    <section
      id="certificates"
      className="bg-white px-6 py-24 transition-colors duration-300 dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-xs font-semibold tracking-wide text-amber-700 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-400 mb-4"
          >
            <Award className="h-3.5 w-3.5" />
            Certifications
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100"
          >
            My Certificates
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl text-base text-zinc-600 dark:text-zinc-300 leading-relaxed"
          >
            Professional certifications and achievements that validate my expertise in modern
            web technologies and development practices. Click on any certificate to view it in full size.
          </motion.p>
        </div>
        {certificatesLoading && certificates.length === 0 ? (
          <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl border border-zinc-200 bg-zinc-50 overflow-hidden dark:border-zinc-800 dark:bg-zinc-900/40"
              >
                <div className="h-52 w-full bg-zinc-200 dark:bg-zinc-800" />
                <div className="p-4">
                  <div className="h-4 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
                </div>
              </div>
            ))}
          </div>
        ) : certificates.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 rounded-2xl border border-dashed border-zinc-300 py-16 text-center dark:border-zinc-800"
          >
            <Award className="mx-auto h-8 w-8 text-zinc-400" />
            <p className="mt-3 text-sm text-zinc-500">No certificates added yet.</p>
          </motion.div>
        ) : (
          <>
            <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {visibleCertificates.map((cert, index) => {
                const certId = cert.id || cert._id || cert.title;
                return (
                  <motion.div
                    key={certId}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
                    onClick={() => setSelectedCertIndex(index)}
                    className="group relative cursor-pointer overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-xs hover:shadow-xl hover:border-amber-300 transition-all duration-300 hover:-translate-y-1 dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-amber-700/60"
                    id={`cert-card-${certId}`}
                    role="button"
                    tabIndex={0}
                    aria-label={`View certificate: ${cert.title}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedCertIndex(index);
                      }
                    }}
                  >
                    <div className="relative h-52 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800/60">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '';
                          (e.target as HTMLImageElement).parentElement!.classList.add(
                            'flex',
                            'items-center',
                            'justify-center'
                          );
                          (e.target as HTMLImageElement).style.display = 'none';
                          const fallback = document.createElement('div');
                          fallback.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>`;
                          (e.target as HTMLImageElement).parentElement!.appendChild(fallback);
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-zinc-900 dark:text-zinc-100 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          <ZoomIn className="h-3.5 w-3.5 text-amber-500" />
                          Click to View
                        </span>
                      </div>
                      <div className="absolute top-3 left-3 z-10">
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                          <Award className="h-3 w-3" />
                          Certificate
                        </span>
                      </div>
                      <div className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
                        <Maximize2 className="h-3.5 w-3.5 text-zinc-700 dark:text-zinc-300" />
                      </div>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                      <div className="min-w-0 pr-2">
                        <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors truncate">
                          {cert.title}
                        </h3>
                        {cert.createdAt && (
                          <p className="mt-1 text-[11px] text-zinc-400 dark:text-zinc-500">
                            {new Date(cert.createdAt).toLocaleDateString('en-US', {
                              month: 'long',
                              year: 'numeric',
                            })}
                          </p>
                        )}
                      </div>
                      <span className="shrink-0 text-xs font-medium text-amber-600 dark:text-amber-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>Open</span>
                        <ExternalLink className="h-3 w-3" />
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            {hasMore && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-12 flex justify-center"
              >
                <button
                  onClick={() => setVisibleCount((prev) => prev + 3)}
                  className="group inline-flex items-center gap-2.5 rounded-full border border-amber-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-800 shadow-xs transition-all hover:bg-amber-600 hover:text-white hover:border-amber-600 dark:border-amber-900/60 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-amber-500 dark:hover:text-zinc-950 cursor-pointer"
                  id="show-more-certificates-btn"
                >
                  <span>Show More Certificates</span>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-50 text-amber-600 transition-all group-hover:bg-white/20 group-hover:text-white dark:bg-zinc-800 dark:text-amber-400 dark:group-hover:bg-zinc-900/50">
                    <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
                  </span>
                </button>
              </motion.div>
            )}
            {visibleCount > 3 && !hasMore && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-12 flex justify-center"
              >
                <button
                  onClick={() => setVisibleCount(3)}
                  className="group inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-xs font-semibold text-zinc-600 shadow-xs transition-all hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 cursor-pointer"
                  id="show-less-certificates-btn"
                >
                  <span>Show Less</span>
                  <ChevronUp className="h-3.5 w-3.5" />
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>
      <AnimatePresence>
        {currentCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-5 md:p-8"
            onClick={closeLightbox}
            id="certificate-lightbox-modal"
          >
            <motion.div
              initial={{ scale: 0.93, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.93, opacity: 0, y: 15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex flex-col max-h-[92vh] max-w-4xl w-full bg-zinc-900/95 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl"
            >
              <div className="flex items-center justify-between border-b border-zinc-800/80 px-4 py-3 sm:px-6">
                <div className="flex items-center gap-3 min-w-0 pr-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    <Award className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-semibold text-zinc-100 truncate">
                      {currentCert.title}
                    </h3>
                    <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                      {currentCert.createdAt && (
                        <span>
                          {new Date(currentCert.createdAt).toLocaleDateString('en-US', {
                            month: 'long',
                            year: 'numeric',
                          })}
                        </span>
                      )}
                      {certificates.length > 1 && (
                        <>
                          <span>•</span>
                          <span className="font-mono text-amber-400">
                            {(selectedCertIndex ?? 0) + 1} of {certificates.length}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <a
                    href={currentCert.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors"
                    title="Open full image in new tab"
                    id="open-cert-newtab-btn"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <a
                    href={currentCert.image}
                    download={`${currentCert.title.replace(/[^a-zA-Z0-9_-]/g, '_')}_Certificate.png`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors"
                    title="Download Certificate"
                    id="download-cert-btn"
                  >
                    <Download className="h-4 w-4" />
                  </a>
                  <button
                    onClick={closeLightbox}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-800/80 text-zinc-300 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/40 border border-transparent transition-colors cursor-pointer"
                    title="Close (Esc)"
                    id="close-cert-modal-btn"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="relative flex items-center justify-center bg-black/60 p-3 sm:p-5 min-h-[280px] max-h-[72vh] overflow-hidden">
                <img
                  src={currentCert.image}
                  alt={currentCert.title}
                  className="max-h-[66vh] w-auto max-w-full rounded-xl object-contain shadow-2xl select-none"
                />
                {certificates.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        goToPrev();
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-zinc-900/80 text-white backdrop-blur-md border border-zinc-700/60 shadow-xl hover:bg-amber-600 hover:border-amber-500 transition-all cursor-pointer"
                      title="Previous Certificate (Left Arrow)"
                      id="prev-cert-btn"
                    >
                      <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        goToNext();
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-zinc-900/80 text-white backdrop-blur-md border border-zinc-700/60 shadow-xl hover:bg-amber-600 hover:border-amber-500 transition-all cursor-pointer"
                      title="Next Certificate (Right Arrow)"
                      id="next-cert-btn"
                    >
                      <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
                  </>
                )}
              </div>
              <div className="flex items-center justify-between border-t border-zinc-800/80 px-4 py-2.5 text-xs text-zinc-400 bg-zinc-950/60">
                <span className="hidden sm:inline-block">
                  Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-300 font-mono">ESC</kbd> to close{certificates.length > 1 ? ', or use arrow keys ← → to navigate' : ''}
                </span>
                <span className="sm:hidden text-[11px] truncate max-w-[200px]">
                  {currentCert.title}
                </span>
                <button
                  onClick={closeLightbox}
                  className="text-amber-400 hover:text-amber-300 font-medium ml-auto cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CertificatesSection;

