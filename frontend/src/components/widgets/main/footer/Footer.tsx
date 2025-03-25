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
import { paths } from '@/lib/paths';

const navigationData = {
  catalog: {
    title: 'Каталог',
    items: [
      { label: 'Фотоаппараты', href: paths.cameras },
      { label: 'Плёнка', href: paths.film },
      { label: 'Аксессуары', href: paths.accessories },
      { label: 'Наборы', href: paths.sets },
      { label: 'Подарочные сертификаты', href: paths.certificate },
    ],
  },
  services: {
    title: 'Услуги',
    items: [
      { label: 'Проявка и оцифровка пленки', href: paths.development },
      { label: 'Печать', href: paths.printing },
    ],
  },
  about: {
    title: 'О компании',
    items: [
      { label: 'Блог', href: paths.blog },
      { label: 'Гарантии', href: paths.warranty },
      { label: 'Контакты', href: paths.contacts },
    ],
  },
};

const footerLinks = [
  { label: 'Главная', href: paths.home },
  { label: 'Блог', href: paths.blog },
  { label: 'Политика конфиденциальности', href: paths.privacy },
  { label: 'Пользовательское соглашение', href: paths.terms },
];

const socialLinks = [
  { icon: <FaYoutube className="h-6 w-6" />, href: 'https://youtube.com' },
  { icon: <FaTelegram className="h-6 w-6" />, href: paths.telegram },
  {
    icon: <AiFillInstagram className="h-6 w-6" />,
    href: paths.instagram,
  },
  { icon: <FaVk className="h-6 w-6" />, href: 'https://vk.com' },
];

export const Footer: React.FC = () => {
  return (
    <div className="relative min-h-[644px] w-full bg-[#ffe3c6] p-8">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-12">
        <Image
          height={111}
          width={111}
          className="h-[111px] w-[111px] object-cover"
          alt="PlenkaPlace Logo"
          src="/logo.png"
        />
        <div className="text-app-primary text-[34px] font-bold">
          PlenkaPlace
        </div>
      </div>

      <Separator className="mx-auto my-12 max-w-[1280px] bg-[#100e15]" />

      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 md:grid-cols-4">
        {Object.values(navigationData).map((section, index) => (
          <NavigationMenu
            key={index}
            orientation="vertical"
            className="items-start"
          >
            <NavigationMenuList className="flex w-full flex-col gap-4">
              <NavigationMenuItem className="font-text w-full py-3 text-left">
                {section.title}
              </NavigationMenuItem>
              {section.items.map((item, idx) => (
                <NavigationMenuItem key={idx} className="w-full text-left">
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className="font-text block w-full transition hover:scale-[1.1]"
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        ))}

        <div className="flex flex-col gap-6">
          <div className="font-text py-3">Будьте с нами</div>
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

      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between">
        <div className="font-text">PlenkaPlace @ 2025. Все права защищены.</div>
        <NavigationMenu>
          <NavigationMenuList className="flex flex-wrap items-center gap-6">
            {footerLinks.map((link, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink asChild>
                  <Link
                    href={link.href}
                    className="font-text px-2 py-4 transition hover:scale-[1.1]"
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
