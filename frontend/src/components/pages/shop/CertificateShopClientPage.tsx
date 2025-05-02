'use client';
import { useEffect, useState } from 'react';
import { PageWrapper } from '@/components/shared/PageWrapper';
import { HeaderBanner } from '@/components/widgets/banners';
import { paths } from '@/lib/paths';
import { Api } from '@/lib/api';
import { Product, ProductCard } from '@/components/entity';
import { Skeleton } from '@/components/shared/ui/skeleton';
import Image from 'next/image';
import clsx from 'clsx';

const staticCertificates: Product[] = [
  {
    id: 'certificate-1000',
    title: 'Подарочный сертификат 1000',
    description: 'Сертификат номиналом 1000 рублей',
    price: '1000',
    images: [{ image: '/certificates/1000.png', product: 1 }],
  },
  {
    id: 'certificate-2000',
    title: 'Подарочный сертификат 2000',
    description: 'Сертификат номиналом 2000 рублей',
    price: '2000',
    images: [{ image: '/certificates/2000.png', product: 2 }],
  },
  {
    id: 'certificate-3000',
    title: 'Подарочный сертификат 3000',
    description: 'Сертификат номиналом 3000 рублей',
    price: '3000',
    images: [{ image: '/certificates/3000.png', product: 3 }],
  },
  {
    id: 'certificate-5000',
    title: 'Подарочный сертификат 5000',
    description: 'Сертификат номиналом 5000 рублей',
    price: '5000',
    images: [{ image: '/certificates/5000.png', product: 4 }],
  },
  {
    id: 'development-certificate-5000',
    title: 'Проявочный сертификат 5000',
    description: 'Сертификат на проявку плёнки',
    price: '5000',
    images: [{ image: '/certificates/5000-film.png', product: 5 }],
  },
];

const api = new Api();

export default function CertificateShopClientPage() {
  const [certificates, setCertificates] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isStatic, setIsStatic] = useState(false);

  useEffect(() => {
    async function fetchCertificates() {
      try {
        const response = await api.shop.shopProductsList({
          product_type: 'Сертификаты',
          count: 50,
        });

        if (response.data.results.length) {
          setCertificates(response.data.results);
          setIsStatic(false);
        } else {
          setCertificates(staticCertificates);
          setIsStatic(true);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Ошибка загрузки данных');
        setCertificates(staticCertificates);
        setIsStatic(true);
      } finally {
        setLoading(false);
      }
    }

    fetchCertificates();
  }, []);

  return (
    <main className="my-6 flex flex-col gap-6">
      <HeaderBanner
        className="text-white"
        imageSrc="/source/catalog.png"
        title="Подарочные сертификаты"
        description="Выберите лучший сертификат для себя"
        imageClassName="brightness-50"
        breadcrumbs={[
          { href: paths.home, label: 'Главная', color: 'white' },
          {
            href: paths.certificate,
            label: 'Подарочные сертификаты',
            color: 'white',
          },
        ]}
      />
      <PageWrapper>
        <div className="flex flex-col gap-8">
          <h2 className="text-4xl font-bold">Сертификаты</h2>
          {loading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-[250px] w-full rounded-xl" />
              ))}
            </div>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : certificates.length === 0 ? (
            <div className="mx-auto flex flex-col gap-4">
              <Image
                src="/cart/not_found.png"
                alt="Товары не найдены"
                width={300}
                height={300}
              />
              <p className="text-center text-lg text-gray-500">
                Сертификаты не найдены
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {certificates.map((certificate) => (
                <div
                  key={certificate.id}
                  className={clsx(
                    'relative px-2 sm:px-4',
                    isStatic &&
                      'before:absolute before:left-0 before:top-1/2 before:z-[30] before:h-1 before:w-full before:rotate-[-10deg] before:bg-red-600 before:content-[""]'
                  )}
                >
                  <ProductCard isDisabled={isStatic} product={certificate} />
                </div>
              ))}
            </div>
          )}
        </div>
      </PageWrapper>
    </main>
  );
}
