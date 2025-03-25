'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';


// Optional: Custom styling
NProgress.configure({ showSpinner: false, speed: 400, minimum: 0.2 });

export default function TopProgressBar() {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.start();
    const timer = setTimeout(() => {
      NProgress.done();
    }, 500); // Simulate network latency

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
