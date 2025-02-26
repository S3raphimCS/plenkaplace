import { Card, CardContent } from '@/components/shared/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/shared/ui/carousel';
import { ArrowRight } from 'lucide-react';
import React from 'react';

const newsCards = [
  {
    gradient: 'linear-gradient(180deg, rgb(255,255,255) 0%, rgb(0,0,0) 100%)',
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    gradient:
      'linear-gradient(180deg, rgb(255,255,255) 0%, rgba(13.6,13.6,13.6,0) 100%)',
    title: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.',
  },
  {
    gradient:
      'linear-gradient(180deg, rgb(255,255,255) 0%, rgba(0,0,0,0) 100%)',
    title:
      'Pellentesque habitant morbi tristique senectus et netus et malesuada.',
  },
];

export const BlogSection = (): JSX.Element => {
  return (
    <section className="bg-app-background flex w-full max-w-[1440px] flex-col items-start gap-10 px-6 py-16 md:px-20 lg:px-40">
      {/* Заголовок */}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-3xl font-medium text-[#100e15] md:text-5xl lg:text-[64px]">
          Новости
        </h1>

        <button className="border-neutral-07100 inline-flex items-center gap-1 border-b">
          <span className="text-sm font-medium text-[#100e15] md:text-base">
            Больше новостей
          </span>
          <ArrowRight className="h-5 w-5" color="#141718" />
        </button>
      </div>

      {/* Карусель */}
      <Carousel className="w-full">
        <CarouselContent className="-ml-4 flex md:-ml-6">
          {newsCards.map((card, index) => (
            <CarouselItem
              key={index}
              className="basis-5/6 pl-4 sm:basis-1/2 md:basis-1/3 md:pl-6"
            >
              <Card className="border-none bg-transparent">
                <CardContent className="flex flex-col items-start gap-6 p-0">
                  <div
                    className="h-[250px] w-full md:h-[325px]"
                    style={{ background: card.gradient }}
                  />

                  <div className="flex w-full flex-col items-start gap-2">
                    <h3 className="text-lg font-semibold text-[#100e15] md:text-2xl">
                      {card.title}
                    </h3>

                    <button className="border-neutral-07100 inline-flex items-center gap-1 border-b">
                      <span className="text-sm font-medium text-[#100e15]">
                        Читать
                      </span>
                      <ArrowRight
                        className="h-4 w-4 md:h-5 md:w-5"
                        color="#6C7275"
                      />
                    </button>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};
