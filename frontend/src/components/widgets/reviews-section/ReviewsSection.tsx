'use client';
import { Review } from '@/components/entity/ui/review/Review';
import { Skeleton } from '@/components/shared/ui/skeleton';
import React, { useState, useEffect } from 'react';
import { Api, Feedback } from '@/lib/api';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/shared/ui/carousel';

const api = new Api();

export const ReviewsSection: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reviews, setReviews] = useState<Feedback[]>([]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await api.shop.shopFeedbacksList({ count: 10 }, {});
        setReviews(response.data.results);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Ошибка загрузки отзывов');
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="px-6 py-10 sm:px-10 lg:px-20">
        <Skeleton className="mb-4 h-48 w-full" />
        <Skeleton className="mb-4 h-48 w-full" />
        <Skeleton className="mb-4 h-48 w-full" />
      </div>
    );
  }

  if (error || reviews.length === 0) {
    return (
      <div className="px-6 py-10 text-center sm:px-10 lg:px-20">
        <h1 className="text-textblack mb-10 text-center text-3xl sm:text-4xl lg:text-[64px]">
          Отзывы
        </h1>
        <Image
          src="/review/not-found.png"
          alt="Not found"
          width={200}
          height={200}
          className="mx-auto mb-4"
        />
        <div className="text-lg font-medium text-red-700">
          {/* {error || 'Отзывы не найдены'} */}
          {'Отзывы не найдены'}
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-10 sm:px-10 lg:px-20">
      <div className="container mx-auto max-w-[1440px]">
        <h1 className="text-textblack mb-10 text-center text-3xl sm:text-4xl lg:text-[64px]">
          Отзывы
        </h1>

        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1">
          {reviews.length > 3 ? (
            <Carousel className="w-full">
              <CarouselContent className="-ml-4 flex md:-ml-6">
                {reviews.map((review, index) => (
                  <CarouselItem
                    key={index}
                    className="basis-5/6 pl-4 sm:basis-1/2 md:basis-1/3 md:pl-6"
                  >
                    <Review image={review.image!} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          ) : (
            reviews.map((review) => (
              <div key={review.id}>
                {review.image && (
                  <Review key={review.id} image={review.image} />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
