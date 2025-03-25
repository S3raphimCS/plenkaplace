import { Card, CardContent } from '@/components/shared/ui/card';
import Image from 'next/image';
import React from 'react';

type ReviewProps = {
  image: string;
};

export const Review: React.FC<ReviewProps> = ({ image }) => {
  return (
    <Card className="flex min-h-[350px] flex-col items-center justify-center overflow-hidden bg-white shadow-[0px_4px_24px_#8ba7b229]">
      <CardContent className="flex h-full w-full items-center justify-center p-4 sm:p-6">
        <Image
          src={image}
          alt="Отзыв"
          width={500}
          height={350}
          className="h-[revert-layer] w-full rounded-lg object-contain"
        />
      </CardContent>
    </Card>
  );
};
