import { NewsDetail } from '@/lib/api';
import { Metadata } from 'next';

export const generateMetadata = (newsData: NewsDetail | null): Metadata => {
  if (!newsData) {
    return {
      title: 'Новость не найдена',
      description: 'К сожалению, запрашиваемая новость не найдена на сайте.',
      keywords: ['новости', 'PlenkaPlace', 'не найдена'],
    };
  }

  return {
    title: `${newsData.title} – PlenkaPlace`,
    description:
      newsData.preview || 'Читайте нашу статью о плёночной фотографии.',
    keywords: [
      'плёночная фотография',
      'новости фотографии',
      'PlenkaPlace',
      newsData.title,
    ],
  };
};
