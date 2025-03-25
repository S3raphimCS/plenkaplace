import { ReusableCarouselProps } from '@/components/shared/model/ReusableCarouselProps';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/shared/ui/carousel';
import React from 'react';

export const ReusableCarousel = <T,>({
  items,
  renderItem,
  className = '',
  itemClassName = '',
  title,
}: ReusableCarouselProps<T>) => {
  return (
    <div className={`flex flex-col gap-12 ${className}`}>
      {title && (
        <h2 className="text-3xl font-medium text-black sm:text-4xl lg:text-5xl">
          {title}
        </h2>
      )}

      <div className="relative w-full">
        <Carousel>
          <CarouselContent className="-ml-4 md:-ml-6 lg:-ml-8">
            {items.map((item, index) => (
              <CarouselItem
                key={index}
                className={`basis-[90%] pl-4 sm:basis-1/2 md:basis-1/3 md:pl-6 lg:basis-1/4 lg:pl-8 ${itemClassName}`}
              >
                <div className="flex h-full">{renderItem(item)}</div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};
