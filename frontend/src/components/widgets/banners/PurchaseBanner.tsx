import { CountdownTimer } from '@/components/entity/ui/countdown-timer/CountdownTimer';
import { Button } from '@/components/shared/ui/button';
import Image from 'next/image';
import React from 'react';

const targetDate = new Date();
targetDate.setHours(targetDate.getHours() + 2);

export const PurchaseBanner: React.FC = () => {
  return (
    <div className="flex w-full max-w-full flex-wrap bg-[#BF3A2B]">
      <div className="relative w-full md:w-1/2">
        <Image
          fill
          className="h-[300px] w-full object-cover md:h-[532px]"
          alt="Promotional banner"
          src="/banner/purchase_banner.png"
        />
      </div>

      <div className="bg-app-accent flex w-full flex-col items-start justify-center gap-6 px-6 py-8 md:w-1/2 md:px-[72px] md:py-12">
        <div className="flex flex-col items-start gap-4">
          <p className="font-text text-app-primary text-[#F9D939]">
            PlenkaPlace
          </p>

          <h2 className="text-2xl font-medium text-[#fdfdfd] md:text-[40px]">
            Поторопись - успей закупить всё!
          </h2>

          <p className="text-base font-medium text-[#fdfdfd] md:text-lg">
            Find clubs that are right for your game
          </p>
        </div>

        <div className="flex flex-col items-start gap-3">
          <p className="text-sm font-normal text-[#fdfdfd] md:text-base">
            Следующая закупка будет через :
          </p>
          <CountdownTimer targetDate={targetDate} />
        </div>

        <Button className="px-6 py-2 text-sm md:px-10 md:py-1.5 md:text-base">
          Участвовать сейчас
        </Button>
      </div>
    </div>
  );
};
