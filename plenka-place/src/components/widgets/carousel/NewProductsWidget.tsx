import { Product, ProductCard } from '@/components/entity';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/shared/ui/carousel';
import React from 'react';

const products: Product[] = [
  {
    id: 1,
    name: 'Kodak Portra 160',
    price: 4000,
    image: '/grid/battery.png',
    rating: 4.3,
  },
  {
    id: 2,
    name: 'Kodak Portra 400',
    price: 5500,
    image: '/grid/battery.png',
    rating: 4.3,
  },
  {
    id: 3,
    name: 'FujiFilm Pro 400H',
    price: 6000,
    image: '/grid/battery.png',
    rating: 4.3,
  },
  {
    id: 4,
    name: 'Ilford HP5 Plus',
    price: 3500,
    image: '/grid/battery.png',
    rating: 4.3,
  },
  {
    id: 5,
    name: 'Kodak Gold 200',
    price: 4500,
    image: '/grid/battery.png',
    rating: 4.3,
  },
];

export const NewProductsWidget = () => {
  return (
    <div className="mb-14 flex flex-col gap-12 bg-[#fff0e0] px-6 py-12 sm:px-10 lg:px-40">
      <h2 className="text-3xl font-medium text-black sm:text-4xl lg:text-5xl">
        Новые поступления
      </h2>

      <div className="relative w-full">
        <Carousel>
          <CarouselContent className="-ml-4 md:-ml-6 lg:-ml-8">
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="basis-[90%] pl-4 sm:basis-1/2 md:basis-1/3 md:pl-6 lg:basis-1/4 lg:pl-8"
              >
                <ProductCard product={product} />
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
