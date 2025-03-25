import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/shared/ui/accordion';
import Image from 'next/image';
import { ReactNode } from 'react';

interface ServiceAccordionProps {
  value: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  children: ReactNode;
}

export const DevelopingAccordion = ({
  value,
  imageSrc,
  imageAlt,
  title,
  children,
}: ServiceAccordionProps) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={value}>
        <AccordionTrigger className="flex items-center gap-4">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={100}
            height={100}
            className="rounded-lg"
          />
          <span className="text-xl font-bold">{title}</span>
        </AccordionTrigger>
        <AccordionContent>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
