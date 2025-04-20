'use client';
import { Price, Product } from '@/components/entity';
import { Button } from '@/components/shared/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/shared/ui/carousel';
import { Heart, ShoppingCart } from 'lucide-react';
import React, { useState } from 'react';
import { ImageModal } from '@/components/shared/ImageModal';
import { useDispatch } from 'react-redux';
import { addToFavourites } from '@/store/slices/favouritesSlice';
import { addToCart } from '@/store/slices/cartSlice';
import { Badge } from '@/components/shared/ui/badge';
import { FallbackProductImage } from './FallbackProductImage';

interface Thumbnail {
  id: number;
  src: string;
}

interface ProductDetailsProps {
  product: Product;
  thumbnails: Thumbnail[];
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  thumbnails,
}) => {
  const dispatch = useDispatch();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };

  return (
    <div className="flex flex-col items-start gap-8 px-4 py-8 md:flex-row md:px-8 lg:px-40">
      <div className="flex w-full flex-col items-start gap-6 md:w-1/2">
        <Carousel className="w-full">
          <CarouselContent>
            {thumbnails.map((thumbnail, index) => (
              <CarouselItem key={thumbnail.id}>
                <div className="relative h-[400px] w-full md:h-[500px] lg:h-[728px]">
                  <FallbackProductImage
                    src={thumbnail.src}
                    alt={product.title}
                    fill
                    className="cursor-pointer object-contain"
                    priority
                    onClick={() => handleThumbnailClick(index)}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 h-10 w-10 rounded-full bg-white md:left-8" />
          <CarouselNext className="right-4 h-10 w-10 rounded-full bg-white md:right-8" />
        </Carousel>

        <div className="flex w-full items-start gap-4 overflow-x-auto">
          {thumbnails.map((thumbnail, index) => (
            <div
              key={thumbnail.id}
              className="relative h-[100px] w-[100px] flex-shrink-0 md:h-[150px] md:w-[150px]"
              onClick={() => handleThumbnailClick(index)}
            >
              <FallbackProductImage
                src={thumbnail.src}
                alt={product.title}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-full flex-col items-start md:w-1/2">
        <div className="flex w-full flex-col items-start gap-4 border-b pb-6">
          <h2 className="text-2xl font-bold text-black md:text-3xl">
            {product.title}
          </h2>

          <div className="flex flex-col gap-4 text-sm text-gray-700 md:text-base">
            {product.is_preorder && (
              <Badge className="h-10 bg-white px-4 hover:bg-white/90">
                Под заказ
              </Badge>
            )}
            {product.description}
          </div>

          <div className="flex items-center gap-3">
            <Price className="text-xl font-bold text-black md:text-2xl">
              {Number(product.price)}
            </Price>
          </div>
        </div>

        <div className="flex w-full flex-col items-start gap-4 py-8">
          <Button
            variant="outline"
            className="h-12 w-full rounded-lg md:h-14"
            onClick={() => dispatch(addToFavourites(product))}
          >
            <Heart className="mr-2 h-6 w-6" />
            <span>В избранное</span>
          </Button>

          <Button
            className="h-12 w-full rounded-lg bg-[#bf3a2b] text-white hover:bg-[#a6342a] md:h-14"
            onClick={() => dispatch(addToCart(product))}
          >
            <ShoppingCart className="mr-2 h-6 w-6" />
            <span>Добавить в корзину</span>
          </Button>
        </div>
      </div>

      {selectedImageIndex !== null && (
        <ImageModal
          images={thumbnails.map((t) => t.src)}
          initialIndex={selectedImageIndex}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};
