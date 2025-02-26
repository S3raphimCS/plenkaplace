import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/shared/ui/navigation-menu';
import { Separator } from '@/components/shared/ui/separator';
import { FaVk } from 'react-icons/fa6';
import { AiFillInstagram } from 'react-icons/ai';
import { FaTelegram } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const navigationData = {
  catalog: {
    title: 'Каталог',
    items: [
      { label: 'Фотоаппараты', href: '/catalog/cameras' },
      { label: 'Плёнка', href: '/catalog/film' },
      { label: 'Аксессуары', href: '/catalog/accessories' },
    ],
  },
  services: {
    title: 'Услуги',
    items: [
      { label: 'Проявка и оцифровка пленки', href: '/services/developing' },
      { label: 'Печать', href: '/services/printing' },
      { label: 'Цены и сроки', href: '/services/pricing' },
    ],
  },
  about: {
    title: 'О компании',
    items: [
      { label: 'Блог', href: '/blog' },
      { label: 'Гарантии', href: '/about/guarantees' },
      { label: 'Контакты', href: '/about/contacts' },
      { label: 'О нас', href: '/about' },
    ],
  },
};

const footerLinks = [
  { label: 'Главная', href: '/' },
  { label: 'Блог', href: '/blog' },
  { label: 'Политика конфиденциальности', href: '/privacy' },
  { label: 'Пользовательское соглашение', href: '/terms' },
];

const socialLinks = [
  { icon: <FaYoutube className="h-6 w-6" />, href: 'https://youtube.com' },
  { icon: <FaTelegram className="h-6 w-6" />, href: 'https://t.me' },
  {
    icon: <AiFillInstagram className="h-6 w-6" />,
    href: 'https://instagram.com',
  },
  { icon: <FaVk className="h-6 w-6" />, href: 'https://vk.com' },
];

export const Footer = (): JSX.Element => {
  return (
    <div className="relative min-h-[644px] w-full bg-[#ffe3c6] p-8">
      {/* Header */}
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-12">
        <Image
          height={111}
          width={111}
          className="h-[111px] w-[111px] object-cover"
          alt="PlenkaPlace Logo"
          src="/logo_footer.png"
        />
        <div className="text-app-primary text-[34px] font-bold">
          PlenkaPlace
        </div>
      </div>

      <Separator className="mx-auto my-12 max-w-[1280px] bg-[#100e15]" />

      {/* Navigation Sections */}
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 md:grid-cols-4">
        {Object.values(navigationData).map((section, index) => (
          <NavigationMenu key={index} orientation="vertical">
            <NavigationMenuList className="flex w-full flex-col items-start gap-4">
              <NavigationMenuItem className="font-text text-app-primary w-full py-3 text-left">
                {section.title}
              </NavigationMenuItem>
              {section.items.map((item, idx) => (
                <NavigationMenuItem key={idx} className="w-full text-left">
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className="font-text text-app-primary block w-full"
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        ))}

        {/* Social Media Section */}
        <div className="flex flex-col gap-6">
          <div className="font-text text-app-primary py-3">Будьте с нами</div>
          <div className="flex items-center gap-4">
            {socialLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Separator className="mx-auto my-12 max-w-[1280px] bg-[#100e15]" />

      {/* Footer */}
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between">
        <div className="font-text text-app-primary">
          PlenkaPlace @ 2025. Все права защищены.
        </div>
        <NavigationMenu>
          <NavigationMenuList className="flex flex-wrap items-center gap-6">
            {footerLinks.map((link, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink asChild>
                  <Link
                    href={link.href}
                    className="font-text text-app-primary px-2 py-4"
                  >
                    {link.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};
