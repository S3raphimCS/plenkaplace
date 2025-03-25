import { Product } from '@/components/entity';
import { Metadata } from 'next';

export const generateProductMetadata = (product: Product | null): Metadata => {
  if (!product) {
    return {
      title: 'Товар не найден',
      description: 'К сожалению, запрашиваемый товар не найден на сайте.',
      keywords: ['товар не найден', 'PlenkaPlace', 'ошибка'],
    };
  }

  return {
    title: `${product.title} – PlenkaPlace`,
    description:
      product.description || 'Посмотрите детали товара на нашем сайте.',
    keywords: [
      'товары для фотоаппаратов',
      'фото аксессуары',
      'PlenkaPlace',
      product.title,
    ],
  };
};
