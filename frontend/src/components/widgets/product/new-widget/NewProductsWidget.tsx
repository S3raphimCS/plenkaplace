'use client';

import { Product, ProductCard } from '@/components/entity';
import { ReusableCarousel } from '../../../shared/ReusableCarousel';
import React, { useEffect, useState } from 'react';
import { Api } from '@/lib/api';
import { Skeleton } from '@/components/shared/ui/skeleton';
import Image from 'next/image';

const api = new Api();

export const NewProductsWidget = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchProducts() {
      try {
        const [camerasResponse, filmResponse, kitsResponse] = await Promise.all(
          [
            api.shop.shopProductsList({
              product_type: 'Фотоаппарат',
              count: 6,
            }),
            api.shop.shopProductsList({
              product_type: 'Аксессуар',
              count: 6,
            }),
            api.shop.shopProductsList({
              product_type: 'Пленка',
              count: 6,
            }),
            api.shop.shopProductsList({
              product_type: 'Наборы',
              count: 6,
            }),
          ]
        );

        const allProducts = [
          ...camerasResponse.data.results,
          ...filmResponse.data.results,
          ...kitsResponse.data.results,
        ];

        setProducts(allProducts);
      } catch (err) {
        console.error(err);
        setError('Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="mb-14 bg-[#fff0e0] px-6 py-12 sm:px-10 lg:px-40">
        <h2 className="mb-6 text-3xl font-bold">Новые поступления</h2>
        <div className="flex gap-4">
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className="flex-1">
              <Skeleton className="h-[300px] w-full rounded-lg" />
              <Skeleton className="mt-2 h-6 w-3/4" />
              <Skeleton className="mt-2 h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || products.length === 0) {
    return (
      <div className="mb-14 bg-[#fff0e0] px-6 py-12 sm:px-10 lg:px-40">
        <h2 className="mb-6 text-3xl font-bold">Новые поступления</h2>
        <div className="text-center">
          <Image
            src="/product/not-found.png"
            alt="Not found"
            width={200}
            height={200}
            className="mx-auto mb-4"
          />
          <div className="text-lg font-medium text-red-700">
            {/* {error || 'Продукты не найдены'} */}
            {'Продукты не найдены'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <ReusableCarousel
      items={products}
      renderItem={(product) => <ProductCard product={product} />}
      className="mb-14 bg-[#fff0e0] px-6 py-12 sm:px-10 lg:px-40"
      title="Новые поступления"
    />
  );
};
