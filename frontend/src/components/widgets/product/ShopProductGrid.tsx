import { Product, ProductCard } from '@/components/entity';
import React from 'react';

interface ShopProductGridProps {
  products: Product[];
}

export const ShopProductGrid: React.FC<ShopProductGridProps> = ({
  products,
}) => {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
