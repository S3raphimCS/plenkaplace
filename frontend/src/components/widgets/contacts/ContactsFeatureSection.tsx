import { Card, CardContent } from '@/components/shared/ui/card';
import Image from 'next/image';
import React from 'react';

interface ContactsFeatureSectionProps {
  imageSrc: string;
  imageAlt: string;
  aboutText: string;
}

export const ContactsFeatureSection: React.FC<ContactsFeatureSectionProps> = ({
  aboutText,
  imageSrc,
  imageAlt,
}) => {
  return (
    <section className="flex flex-col items-stretch px-4 py-8 md:flex-row md:px-8 lg:px-40">
      <div className="relative h-[300px] w-full md:h-auto md:w-[560px]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover object-center"
        />
      </div>

      <Card className="w-full bg-[#bf3a2b] md:w-[559px]">
        <CardContent className="flex h-full flex-col justify-center gap-6 p-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-[#eceaf1] md:text-[40px]">
              Информация о нас
            </h2>
            <p className="text-sm text-[#eceaf1] md:text-base">{aboutText}</p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
