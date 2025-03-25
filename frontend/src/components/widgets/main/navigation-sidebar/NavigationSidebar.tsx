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
import { paths } from '@/lib/paths';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/shared/ui/accordion';

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
          <Accordion type="single" collapsible>
            <AccordionItem value="catalog" className="border-none">
              <AccordionTrigger className="py-0 text-lg text-accent hover:underline">
                Каталог
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 pl-4 pt-2">
                <Link
                  href={paths.cameras}
                  className="text-lg text-accent hover:underline"
                >
                  Фотоаппараты
                </Link>
                <Link
                  href={paths.film}
                  className="text-lg text-accent hover:underline"
                >
                  Плёнка
                </Link>
                <Link
                  href={paths.accessories}
                  className="text-lg text-accent hover:underline"
                >
                  Аксессуары
                </Link>
                <Link
                  href={paths.sets}
                  className="text-lg text-accent hover:underline"
                >
                  Наборы
                </Link>
                <Link
                  href={paths.certificate}
                  className="text-lg text-accent hover:underline"
                >
                  Подарочные сертификаты
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible>
            <AccordionItem className="border-none" value="services">
              <AccordionTrigger className="py-0 text-lg text-accent hover:underline">
                Услуги
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 pl-4 pt-2">
                <Link
                  href={paths.development}
                  className="text-lg text-accent hover:underline"
                >
                  Проявка и оцифровка плёнки
                </Link>
                <Link
                  href={paths.printing}
                  className="text-lg text-accent hover:underline"
                >
                  Печать
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Link
            href={paths.club}
            className="text-lg text-accent hover:underline"
          >
            Клуб Plenka Palace
          </Link>
          <Link
            href={paths.delivery}
            className="text-lg text-accent hover:underline"
          >
            Доставка
          </Link>
          <Link
            href={paths.warranty}
            className="text-lg text-accent hover:underline"
          >
            Гарантия
          </Link>
          <Link
            href={paths.blog}
            className="text-lg text-accent hover:underline"
          >
            Блог
          </Link>

          <Accordion type="single" collapsible>
            <AccordionItem className="border-none" value="help">
              <AccordionTrigger className="py-0 text-lg text-accent hover:underline">
                Помощь
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 pl-4 pt-2">
                <Link
                  href={paths.contacts}
                  className="text-lg text-accent hover:underline"
                >
                  Контакты
                </Link>
                <Link
                  href={paths.privacy}
                  className="text-lg text-accent hover:underline"
                >
                  Политика конфиденциальности
                </Link>
                <Link
                  href={paths.terms}
                  className="text-lg text-accent hover:underline"
                >
                  Пользовательское соглашение
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </nav>

        <SheetFooter className="mt-auto flex flex-col items-center gap-4 border-t pt-4">
          <Link href={paths.telegram_business_account}>
            <p className="text-xl font-bold hover:text-blue-500">
              @plenkamagazine
            </p>
          </Link>
          <div className="flex gap-6">
            <Link
              href={paths.telegram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTelegram className="text-3xl text-accent hover:text-blue-500" />
            </Link>
            <Link
              href={paths.instagram}
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
