'use client';
import { Button } from '@/components/shared/ui/button';
import { Card, CardContent } from '@/components/shared/ui/card';
import { ArrowRight } from 'lucide-react';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { paths } from '@/lib/paths';
import { Skeleton } from '@/components/shared/ui/skeleton';

interface BlogPostCardProps {
  id: number;
  gradient?: string;
  title: string;
  img: string;
  isLoading?: boolean;
}

export const BlogPostCard = ({
  id,
  gradient,
  title,
  img,
  isLoading = false,
}: BlogPostCardProps) => {
  const router = useRouter();

  if (isLoading) {
    return (
      <Card className="border-none bg-transparent shadow-none">
        <CardContent className="flex flex-col items-start gap-6 p-0">
          <Skeleton
            className="h-[250px] w-full md:h-[325px]"
            style={{ background: 'linear-gradient(90deg, #ccc, #ddd)' }}
          />

          <div className="flex w-full flex-col items-start gap-2">
            <Skeleton className="h-6 w-full rounded" />
            <Skeleton className="h-4 w-1/2 rounded" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-none bg-transparent shadow-none">
      <CardContent className="flex flex-col items-start gap-6 p-0">
        <Image
          height={250}
          width={300}
          className="h-[250px] w-full object-contain md:h-[325px]"
          style={{ background: gradient }}
          src={img ?? '/placeholder.png'}
          alt={title}
        />

        <div className="flex w-full flex-col items-start gap-2">
          <h3 className="text-lg font-semibold text-[#100e15] md:text-2xl">
            {title}
          </h3>

          <Button
            className="inline-flex items-center gap-1 border-b"
            onClick={() => router.push(paths.blog_news(id))}
          >
            <span className="text-sm font-medium text-[#100e15]">Читать</span>
            <ArrowRight className="h-4 w-4 md:h-5 md:w-5" color="#6C7275" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
