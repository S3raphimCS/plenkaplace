import { cn } from '@/lib/utils';

interface PriceProps {
  className?: string;
  children: number;
}

export const Price = ({ className, children }: PriceProps) => {
  const formattedPrice = new Intl.NumberFormat('ru-RU').format(children);

  return <span className={cn(className)}>{formattedPrice} ₽</span>;
};
