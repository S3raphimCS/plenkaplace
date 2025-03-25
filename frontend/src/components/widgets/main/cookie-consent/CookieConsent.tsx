'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/shared/ui/button';
import Link from 'next/link';
import { paths } from '@/lib/paths';

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    setIsClosing(true);
    setTimeout(() => {
      localStorage.setItem('cookieConsent', 'accepted');
      setIsVisible(false);
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 z-10 w-[90%] max-w-sm rounded-lg border border-gray-200 bg-white/95 p-4 shadow-lg transition-transform duration-300 sm:w-auto sm:p-6 lg:right-12 ${
        isClosing ? 'animate-scale-out' : 'animate-scale-in'
      }`}
    >
      <p className="mb-4 text-sm text-gray-500 sm:text-base">
        Этот сайт использует файлы cookie для улучшения вашего опыта. Продолжая
        использовать сайт,{' '}
        <Link className="underline" href={paths.privacy}>
          вы соглашаетесь на сбор данных
        </Link>
        .
      </p>
      <div className="flex justify-end">
        <Button
          onClick={handleAccept}
          className="h-10 w-full rounded-lg bg-[#bf3a2b] text-sm text-white hover:bg-[#a6342a] sm:h-12 sm:text-base md:h-14"
        >
          Принять
        </Button>
      </div>
    </div>
  );
};
