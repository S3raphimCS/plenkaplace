'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/shared/ui/carousel';
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { BlogPostCard } from '@/components/entity';
import { Skeleton } from '@/components/shared/ui/skeleton';
import { paths } from '@/lib/paths';
import { Api, NewsList } from '@/lib/api';
import Image from 'next/image';

const api = new Api();

export const BlogSection: React.FC = () => {
  const [news, setNews] = useState<NewsList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await api.news.newsList({
          count: 9,
        });

        setNews(response.data.results);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  const newsCards = news.map((item) => ({
    id: item.id,
    preview: item.preview,
    title: item.title,
  }));

  if (loading) {
    return (
      <section className="flex w-full max-w-[1440px] flex-col items-start gap-10 px-6 py-16 md:px-20 lg:px-40">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-3xl font-medium text-[#100e15] md:text-5xl lg:text-[64px]">
            Новости
          </h1>
        </div>
        <div className="flex w-full flex-wrap gap-4">
          {[1, 2, 3].map((_, index) => (
            <Skeleton key={index} className="basis-1/3" />
          ))}
        </div>
      </section>
    );
  }

  if (error || news.length === 0) {
    return (
      <section className="flex w-full max-w-[1440px] flex-col items-center gap-10 px-6 py-16 md:px-20 lg:px-40">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-3xl font-medium text-[#100e15] md:text-5xl lg:text-[64px]">
            Новости
          </h1>
        </div>
        <div className="text-center">
          <Image
            src="/blog/new-not-found.png"
            alt="Not found"
            width={200}
            height={200}
            className="mx-auto mb-4"
          />
          <div className="text-lg font-medium text-red-700">
            {/* {error || 'Новости не найдены'} */}
            {'Новости не найдены'}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex w-full max-w-[1440px] flex-col items-start gap-10 px-6 py-16 md:px-20 lg:px-40">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-3xl font-medium text-[#100e15] md:text-5xl lg:text-[64px]">
          Новости
        </h1>

        <button className="inline-flex items-center gap-1 border-b">
          <Link
            className="text-sm font-medium text-[#100e15] md:text-base"
            href={paths.blog}
          >
            Больше новостей
          </Link>
          <ArrowRight className="h-5 w-5" color="#141718" />
        </button>
      </div>

      <Carousel className="w-full">
        <CarouselContent className="-ml-4 flex md:-ml-6">
          {newsCards.map((card, index) => (
            <CarouselItem
              key={index}
              className="basis-5/6 pl-4 sm:basis-1/2 md:basis-1/3 md:pl-6"
            >
              <BlogPostCard
                id={card.id!}
                img={card.preview!}
                title={card.title}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};
