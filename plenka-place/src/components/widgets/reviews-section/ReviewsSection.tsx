import { Review } from '@/components/entity/ui/review/Review';
import React from 'react';

const reviewCards = [
  { id: 1, image: '/reviews/review1.png' },
  { id: 2, image: '/reviews/review2.png' },
  { id: 3, image: '/reviews/review3.png' },
];

export const ReviewsSection = (): JSX.Element => {
  return (
    <div className="px-6 py-10 sm:px-10 lg:px-20">
      <div className="container mx-auto max-w-[1440px]">
        <h1 className="font-heading text-textblack mb-10 text-center text-3xl sm:text-4xl lg:text-[64px]">
          Отзывы
        </h1>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviewCards.map((card) => (
            <Review key={card.id} image={card.image} />
          ))}
        </div>
      </div>
    </div>
  );
};
