'use client';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { ArrowLeft, ArrowRight, CircleX } from 'lucide-react';
import { FallbackProductImage } from '../widgets/product/FallbackProductImage';

interface ImageModalProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  images,
  initialIndex,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100 bg-opacity-90 px-2 py-4 sm:px-4">
      <div className="relative flex max-h-[90vh] w-full max-w-[95vw] flex-col items-center justify-center gap-4 overflow-hidden rounded-lg bg-white p-2 shadow-lg sm:max-w-[90vw] sm:p-4">
        <div className="relative flex max-h-[70vh] w-full items-center justify-center">
          <FallbackProductImage
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            width={800}
            height={600}
            className="max-h-[70vh] w-full object-contain"
          />

          <Button
            onClick={onClose}
            className="absolute right-2 top-2 rounded-full bg-white p-2 text-black hover:bg-gray-200 sm:right-4 sm:top-4"
          >
            <CircleX className="h-6 w-6" />
          </Button>

          <Button
            onClick={handlePrev}
            className="absolute left-1 top-1/2 -translate-y-1/2 transform rounded-full bg-white p-2 text-black hover:bg-gray-200 sm:left-4"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>

          <Button
            onClick={handleNext}
            className="absolute right-1 top-1/2 -translate-y-1/2 transform rounded-full bg-white p-2 text-black hover:bg-gray-200 sm:right-4"
          >
            <ArrowRight className="h-6 w-6" />
          </Button>
        </div>

        <div className="text-sm text-gray-700 sm:pt-2">
          Изображение {currentIndex + 1} из {images.length}
        </div>

        <div className="flex w-full max-w-full items-center justify-center gap-2 overflow-x-auto px-2 pb-2 sm:pb-4">
          {images.map((image, index) => (
            <div
              key={index}
              className={`h-12 w-12 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 sm:h-14 sm:w-14 ${
                index === currentIndex ? 'border-[#bf3a2b]' : 'border-gray-300'
              }`}
              onClick={() => handleThumbnailClick(index)}
            >
              <FallbackProductImage
                src={image}
                alt={`Thumbnail ${index + 1}`}
                width={56}
                height={56}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
