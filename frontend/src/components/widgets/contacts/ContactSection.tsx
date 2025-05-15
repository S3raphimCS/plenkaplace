import { Mail, MapPin, Phone } from 'lucide-react';
import { ContactCards } from './ContactCards';
import { ContactForm, FormFieldContact } from './ContactForm';
import React from 'react';
import { LazyMapSection } from './map/LazyMapSection';
import { MapWrapper } from './map/MapWrapper';
import { paths } from '@/lib/paths';

export const ContactSection: React.FC = () => {
  const contactCards = [
    {
      icon: <MapPin className="h-8 w-8 text-black" />,
      title: 'АДРЕС',
      content: 'Владивосток, ул. Гоголя 19',
    },
    {
      icon: <Phone className="h-8 w-8 text-black" />,
      title: 'ТЕЛЕФОН',
      content: paths.telephone.replace('tel:', ''),
    },
    {
      icon: <Mail className="h-8 w-8 text-black" />,
      title: 'ПОЧТА',
      content: 'plenkaplace@yandex.ru',
    },
  ];

  const formFields: FormFieldContact[] = [
    {
      id: 'name',
      label: 'ВАШЕ ИМЯ',
      placeholder: 'Напишите ваше имя',
      type: 'input',
    },
    {
      id: 'email',
      label: 'ЭЛЕКТРОННАЯ ПОЧТА',
      placeholder: 'Введите ваш почтовый ящик',
      type: 'input',
    },
    {
      id: 'message',
      label: 'СООБЩЕНИЕ',
      placeholder: 'Напишите ваше сообщение',
      type: 'textarea',
    },
  ];

  return (
    <section className="mx-auto flex max-w-[1120px] flex-col items-start gap-10">
      <h2 className="font-heading-2 text-black-900 w-full text-center text-[40px] leading-[44px] tracking-[-0.40px]">
        Свяжитесь с нами
      </h2>

      <ContactCards cards={contactCards} />

      <div className="flex w-full flex-col gap-10 md:flex-row">
        <div className="w-full md:w-1/2">
          <ContactForm fields={formFields} />
        </div>

        <div className="w-full md:w-1/2">
          <MapWrapper>
            <LazyMapSection />
          </MapWrapper>
        </div>
      </div>
    </section>
  );
};
