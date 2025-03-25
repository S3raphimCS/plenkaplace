'use client';

import { Button } from '@/components/shared/ui/button';
import { Card, CardContent } from '@/components/shared/ui/card';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/components/shared/ui/toggle-group';
import { Grid2X2, Layers, List, Menu } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Api, NewsList } from '@/lib/api';
import { Skeleton } from '@/components/shared/ui/skeleton';

const api = new Api();

export const BlogGrid: React.FC = () => {
  const router = useRouter();

  const [viewType, setViewType] = useState<
    'grid' | 'smallGrid' | 'list' | 'menu'
  >('grid');
  const [news, setNews] = useState<NewsList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await api.news.newsList({
          count: 6,
          page: 1,
        });
        setNews(response.data.results);
      } catch (err) {
        console.error(err);
        setError('Ошибка загрузки новостей');
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  const loadMoreNews = async () => {
    try {
      const nextPage = page + 1;
      const response = await api.news.newsList({
        count: 6,
        page: nextPage,
      });

      // Проверка структуры ответа
      if (response.data && Array.isArray(response.data.results)) {
        setNews((prevNews) => [...prevNews, ...response.data.results]);
        setPage(nextPage);
      } else {
        throw new Error('Некорректный формат данных');
      }
    } catch (err) {
      console.error(err);
      setError('Ошибка загрузки дополнительных новостей');
    }
  };

  const viewClasses = {
    grid: 'grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    smallGrid: 'grid gap-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4',
    list: 'flex flex-col gap-4',
    menu: 'flex flex-wrap justify-between gap-2',
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center px-4 pb-10 pt-6">
        <div className="flex h-10 w-full max-w-[1120px] justify-end">
          <ToggleGroup type="single" value={viewType}>
            <ToggleGroupItem
              value="grid"
              className="border-black-200 h-10 w-[46px] border"
            >
              <Grid2X2 className="h-5 w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="smallGrid"
              className="border-black-200 h-10 w-[46px] border"
            >
              <Layers className="h-5 w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="list"
              className="border-black-200 h-10 w-[46px] border"
            >
              <List className="h-5 w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="menu"
              className="border-black-200 h-10 w-[46px] border"
            >
              <Menu className="h-5 w-5" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <section
          className={`w-full max-w-[1440px] py-10 ${viewClasses[viewType]}`}
        >
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <Card key={index} className="border-none shadow-none">
              <CardContent className="flex flex-col items-start gap-4 p-4">
                <Skeleton className="h-[250px] w-full rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    );
  }

  if (error || news.length === 0) {
    return (
      <div className="my-6 text-center">
        <Image
          src="/blog/new-not-found.png"
          alt="Not found"
          width={200}
          height={200}
          className="mx-auto mb-4"
        />
        <div className="text-lg font-medium text-red-500">
          {/* {error || 'Новости не найдены'} */}
          {'Новости не найдены'}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center px-4 pb-10 pt-6">
      <div className="flex h-10 w-full max-w-[1120px] justify-end">
        <ToggleGroup
          type="single"
          value={viewType}
          onValueChange={(value: 'grid' | 'smallGrid' | 'list' | 'menu') =>
            value && setViewType(value)
          }
        >
          <ToggleGroupItem
            value="grid"
            className="border-black-200 h-10 w-[46px] border"
          >
            <Grid2X2 className="h-5 w-5" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="smallGrid"
            className="border-black-200 h-10 w-[46px] border"
          >
            <Layers className="h-5 w-5" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="list"
            className="border-black-200 h-10 w-[46px] border"
          >
            <List className="h-5 w-5" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="menu"
            className="border-black-200 h-10 w-[46px] border"
          >
            <Menu className="h-5 w-5" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <section
        className={`w-full max-w-[1440px] py-10 ${viewClasses[viewType]}`}
      >
        {news.map((card) => (
          <Card
            key={card.id}
            className={`cursor-pointer border-none shadow-none transition-transform duration-200 hover:scale-[1.02] ${
              viewType === 'list' ? 'flex-row items-center p-4' : ''
            }`}
            onClick={() => router.push(`/blog/${card.id}`)}
          >
            <CardContent
              className={`flex ${viewType === 'list' ? 'flex-row items-center gap-4' : 'flex-col items-start gap-4'} p-4`}
            >
              <div
                className={`relative overflow-hidden rounded-lg ${viewType === 'list' ? 'h-[100px] w-[150px]' : 'h-[250px] w-full'}`}
              >
                {card.preview && (
                  <Image
                    src={card.preview}
                    alt={card.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                )}
              </div>
              <div className="flex flex-col items-start gap-2">
                <h3 className="text-lg font-semibold text-black">
                  {card.title}
                </h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <Button
        onClick={loadMoreNews}
        className="mt-6 h-[41px] rounded-full border px-6 py-2"
      >
        <span className="text-base">Загрузить ещё</span>
      </Button>
    </div>
  );
};
