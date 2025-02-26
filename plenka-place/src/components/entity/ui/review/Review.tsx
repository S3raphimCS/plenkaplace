import { Card, CardContent } from '@/components/shared/ui/card';
import Image from 'next/image';
import React from 'react';

type ReviewProps = {
  image: string;
};

export const Review: React.FC<ReviewProps> = ({ image }) => {
  return (
    <Card className="h-auto overflow-hidden bg-white shadow-[0px_4px_24px_#8ba7b229]">
      <CardContent className="p-4 sm:p-6">
        <Image
          src={image}
          alt="Отзыв"
          width={500}
          height={500}
          className="h-auto w-full rounded-lg object-cover"
        />
      </CardContent>
    </Card>
  );
};
