'use client';
import { useState, useEffect } from 'react';
import { Logo } from '@/components/entity/ui/Logo';
import { NavigationSidebar } from '../navigation-sidebar/NavigationSidebar';
import { CartSidebar } from '../cart-sidebar/CartSidebar';
import { FavouriteSidebar } from '../favourite-sidebar/FavouriteSidebar';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 flex items-center justify-between border-b bg-background px-6 py-2 transition-shadow duration-300 ${
        isScrolled ? 'shadow-lg' : ''
      }`}
    >
      <NavigationSidebar />
      <Logo width={120} />
      <div className="flex items-center gap-2">
        <CartSidebar />
        <FavouriteSidebar />
      </div>
    </header>
  );
};
