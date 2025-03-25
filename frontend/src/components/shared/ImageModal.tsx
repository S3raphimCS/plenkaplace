'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import { ArrowLeft, ArrowRight, CircleX } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100 bg-opacity-90">
      <div className="relative max-h-[90vh] max-w-[90vw] rounded-lg bg-white p-4 shadow-lg">
        <Image
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          width={800}
          height={600}
          className="object-contain"
        />

        <Button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-white p-2 text-black hover:bg-gray-200"
        >
          <CircleX className="h-6 w-6" />
        </Button>

        <Button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white p-2 text-black hover:bg-gray-200"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>

        <Button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white p-2 text-black hover:bg-gray-200"
        >
          <ArrowRight className="h-6 w-6" />
        </Button>

        <div className="absolute left-1/2 -translate-x-1/2 transform pt-4 text-sm text-gray-700">
          Изображение {currentIndex + 1} из {images.length}
        </div>

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform gap-2">
          {images.map((image, index) => (
            <div
              key={index}
              className={`h-12 w-12 cursor-pointer overflow-hidden rounded-lg border-2 ${
                index === currentIndex ? 'border-[#bf3a2b]' : 'border-gray-300'
              }`}
              onClick={() => handleThumbnailClick(index)}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
