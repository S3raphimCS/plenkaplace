import { Card, CardContent } from '@/components/shared/ui/card';
import React, { ReactNode } from 'react';

interface ContactCard {
  icon: ReactNode;
  title: string;
  content: string;
}

interface ContactCardsProps {
  cards: ContactCard[];
}

export const ContactCards: React.FC<ContactCardsProps> = ({ cards }) => {
  return (
    <div className="flex w-full flex-col items-start gap-6 sm:flex-col lg:flex-row">
      {cards.map((card, index) => (
        <Card key={index} className="flex-1 border-none bg-[#f5a300]/20">
          <CardContent className="flex h-[156px] flex-col items-center gap-4 px-8 py-4">
            {card.icon}
            <div className="flex flex-col items-center gap-2">
              <h3 className="text-center text-base font-bold leading-4 tracking-[0] text-[#7b7f87]">
                {card.title}
              </h3>
              <p className="font-text w-[293px] text-center text-black">
                {card.content}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
