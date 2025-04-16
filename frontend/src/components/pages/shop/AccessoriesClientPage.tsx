'use client';
import { PageWrapper } from '@/components/shared/PageWrapper';
import { ClubBanner, HeaderBanner } from '@/components/widgets/banners';
import {
  FilterSection,
  FilterSidebarSection,
  SortDropdown,
} from '@/components/widgets/filters';
import { ShopProductGrid } from '@/components/widgets/product';
import { paths } from '@/lib/paths';
import { Api, Brand } from '@/lib/api';
import { Product } from '@/components/entity';
import { Skeleton } from '@/components/shared/ui/skeleton';
import { useEffect, useState } from 'react';
import Image from 'next/image';
const api = new Api();

export default function AccessoriesClientPage() {
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

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await api.shop.shopProductsList({
          product_type: 'Аксессуар',
          count: 900,
          price_min: priceFilter.min,
          price_max: priceFilter.max,
          brand: brandFilter.length ? brandFilter.join(',') : undefined,
          ordering: sortBy,
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
        setBrands(response.data.results);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {}
    }

    fetchProducts();
    fetchBrands();
  }, [priceFilter, brandFilter, sortBy]);

  const handleSortChange = (sortOption: string) => {
    setSortBy(sortOption);
  };

  const sections: FilterSection[] = [
    {
      title: 'Цена',
      type: 'price',
      items: [
        { label: 'Все цены', value: { min: 0, max: 999999999 } },
        { label: 'До 10 000 руб.', value: { min: 0, max: 10000 } },
        { label: '10 000-20 000 руб.', value: { min: 10000, max: 20000 } },
        { label: '20 000-30 000 руб.', value: { min: 20000, max: 30000 } },
        { label: '30 000-50 000 руб.', value: { min: 30000, max: 50000 } },
        { label: 'Более 50 000 руб.', value: { min: 50000, max: 999999999 } },
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
        imageSrc="/banner/catalog.png"
        title="Аксессуары"
        description="Все, что нужно для идеального кадра — аксессуары, которые вдохновляют"
        imageClassName="brightness-50"
        breadcrumbs={[
          { href: paths.home, label: 'Главная', color: 'white' },
          { href: paths.accessories, label: 'Аксессуары', color: 'white' },
        ]}
      />
      <PageWrapper>
        <div className="flex flex-col gap-6 px-4 py-6 md:flex-row md:px-8 lg:px-40 lg:py-[60px]">
          <aside className="w-full md:w-[25%] lg:w-[30%]">
            <FilterSidebarSection
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
