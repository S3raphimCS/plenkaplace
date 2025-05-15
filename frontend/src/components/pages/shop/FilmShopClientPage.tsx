'use client';

import { useState, useEffect } from 'react';
import { PageWrapper } from '@/components/shared/PageWrapper';
import { ClubBanner } from '@/components/widgets/banners/ClubBanner';
import { ShopProductGrid } from '@/components/widgets/product/ShopProductGrid';
import { paths } from '@/lib/paths';
import {
  FilterSection,
  FilterSidebarSection,
} from '@/components/widgets/filters';
import { HeaderBanner } from '@/components/widgets/banners';
import { Product } from '@/components/entity';
import { Skeleton } from '@/components/shared/ui/skeleton';
import { Api, Brand } from '@/lib/api';
import Image from 'next/image';
import { SortDropdown } from '@/components/widgets/filters/SortDropdown';

const api = new Api();

export default function FilmShopClientPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [priceFilter, setPriceFilter] = useState<{ min: number; max: number }>({
    min: 0,
    max: 999999999,
  });
  const [brandFilter, setBrandFilter] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<string>('-created_at');
  const [isPreorderOnly, setIsPreorderOnly] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const response = await api.shop.shopProductsList({
          product_type: 'Пленка',
          count: 900,
          price_min: priceFilter.min,
          price_max: priceFilter.max,
          brand: brandFilter.length ? brandFilter.join(',') : undefined,
          ordering: sortBy,
          is_preorder: isPreorderOnly ? true : undefined,
        });
        setProducts(response.data.results);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    }

    async function fetchBrands() {
      try {
        const response = await api.shop.shopBrandsList();
        setBrands(response.data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {}
    }

    fetchProducts();
    fetchBrands();
  }, [priceFilter, brandFilter, sortBy, isPreorderOnly]);

  const handleSortChange = (sortOption: string) => {
    setSortBy(sortOption);
  };

  const sections: FilterSection[] = [
    {
      title: 'Цена',
      type: 'price',
      items: [
        { label: 'Все цены', value: { min: 0, max: 999999999 } },
        { label: 'До 500 руб.', value: { min: 0, max: 500 } },
        { label: '500-1000 руб.', value: { min: 500, max: 1000 } },
        { label: '1000-2000 руб.', value: { min: 1000, max: 2000 } },
        { label: 'Более 2000 руб.', value: { min: 2000, max: 999999999 } },
      ],
    },
    {
      title: 'Бренд',
      type: 'brand',
      items: brands,
    },
  ];

  return (
    <main className="my-6 flex flex-col gap-6">
      <HeaderBanner
        className="text-white"
        imageSrc="/source/catalog.png"
        title="Плёнка"
        description="Погрузись в атмосферу ретро с нашей коллекцией качественной фотопленки"
        imageClassName="brightness-50"
        breadcrumbs={[
          { href: paths.home, label: 'Главная', color: 'white' },
          { href: paths.catalog, label: 'Каталог', color: 'white' },
        ]}
      />
      <PageWrapper>
        <div className="flex flex-col gap-6 px-4 py-6 md:flex-row md:px-8 lg:px-40 lg:py-[60px]">
          <aside className="w-full md:w-[25%] lg:w-[30%]">
            <FilterSidebarSection
              isPreorderOnly={isPreorderOnly}
              onPreorderChange={setIsPreorderOnly}
              sections={sections}
              selectedBrands={brandFilter}
              onResetFilters={() => {
                setPriceFilter({ min: 0, max: 999999999 });
                setBrandFilter([]);
              }}
              onFilterChange={(type, value) => {
                if (type === 'price') setPriceFilter(value);
              }}
              onBrandFilterChange={setBrandFilter}
            />
          </aside>

          <section className="w-full flex-1 md:w-[75%] lg:w-[82%]">
            <div className="mb-4 flex justify-end">
              <SortDropdown
                onSortChange={handleSortChange}
                selectedSort={sortBy}
              />
            </div>

            {loading ? (
              <Skeleton className="h-[250px] w-[150px] rounded-xl" />
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : products.length === 0 ? (
              <div className="flex flex-col items-center gap-6">
                <Image
                  src="/cart/not_found.png"
                  alt="Товары не найдены"
                  width={300}
                  height={300}
                />
                <p className="text-center text-lg text-gray-500">
                  Товары не найдены
                </p>
              </div>
            ) : (
              <ShopProductGrid products={products} />
            )}
          </section>
        </div>
      </PageWrapper>
      <ClubBanner />
    </main>
  );
}
