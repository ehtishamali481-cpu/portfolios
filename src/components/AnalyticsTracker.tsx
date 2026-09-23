'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const lastRecordedPath = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (pathname && pathname.startsWith('/admin')) return;
    if (lastRecordedPath.current === pathname) return;
    lastRecordedPath.current = pathname;
    let deviceId = '';
    try {
      deviceId = localStorage.getItem('portfolio_device_id') || '';
      if (!deviceId) {
        deviceId = `dev_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
        localStorage.setItem('portfolio_device_id', deviceId);
      }
    } catch {
      deviceId = `dev_${Date.now()}`;
    }
    let sessionId = '';
    try {
      sessionId = sessionStorage.getItem('portfolio_session_id') || '';
      if (!sessionId) {
        sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        sessionStorage.setItem('portfolio_session_id', sessionId);
      }
    } catch {
      sessionId = `sess_${Date.now()}`;
    }

    const payload = {
      deviceId,
      path: pathname || '/',
      referrer: document.referrer || '',
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      sessionId,
    };
    try {
      const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/analytics', blob);
      } else {
        fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true,
        }).catch(() => {
        });
      }
    } catch {
    }
  }, [pathname]);

  return null;
}
