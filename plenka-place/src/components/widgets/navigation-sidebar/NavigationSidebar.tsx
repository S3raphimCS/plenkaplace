import { Button } from '@/components/shared/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/shared/ui/sheet';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaTelegram, FaInstagram } from 'react-icons/fa';
import Link from 'next/link';

const navLinks = [
  { href: '/cameras', label: 'Фотоаппараты' },
  { href: '/film', label: 'Пленка' },
  { href: '/sets', label: 'Наборы' },
  { href: '/club', label: 'Клуб Plenka Place' },
  { href: '/delivery', label: 'Доставка' },
  { href: '/warranty', label: 'Гарантия' },
  { href: '/contacts', label: 'Контакты' },
  { href: '/blog', label: 'Блог' },
];

export const NavigationSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="text-accent hover:bg-inherit hover:text-accent [&_svg]:size-8"
        >
          <GiHamburgerMenu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold">Меню</SheetTitle>
        </SheetHeader>

        <nav className="mt-4 flex flex-col gap-4">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-lg text-accent hover:underline"
            >
              {label}
            </Link>
          ))}
        </nav>

        <SheetFooter className="mt-auto flex flex-col items-center gap-4 border-t pt-4">
          <p className="text-xl font-bold">@plenlaplace</p>
          <div className="flex gap-6">
            <Link
              href="https://t.me/plenka_mag"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTelegram className="text-3xl text-accent hover:text-blue-500" />
            </Link>
            <Link
              href="https://instagram.com/plenka_place"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-3xl text-accent hover:text-pink-500" />
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
