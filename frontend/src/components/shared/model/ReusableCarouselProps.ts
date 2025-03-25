import { ReactNode } from 'react';

export interface ReusableCarouselProps<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
  className?: string;
  itemClassName?: string;
  title?: string;
}
