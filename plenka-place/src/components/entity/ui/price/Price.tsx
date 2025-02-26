interface PriceProps {
  children: number;
}

export const Price = ({ children }: PriceProps) => {
  const formattedPrice = new Intl.NumberFormat('ru-RU').format(children);

  return <span>{formattedPrice} ₽</span>;
};
