'use client';
import { PageWrapper } from '@/components/shared/PageWrapper';
import { ClubBanner } from '@/components/widgets/banners/ClubBanner';
import { NewProductsWidget } from '@/components/widgets/product';
import { ProductAccordionSection } from '@/components/widgets/product/ProductAccordionSection';
import { ProductBreadcrumb } from '@/components/widgets/product/ProductBreadcrumb';
import { ProductDetails } from '@/components/widgets/product/ProductDetails';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Api } from '@/lib/api';
import Image from 'next/image';
import { Product, ProductImage } from '@/components/entity';
import { generateProductMetadata } from './seo';

const api = new Api();

export default function ProductDetailsPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchProduct() {
      try {
        if (!slug) return;

        const response = await api.shop.shopProductsRead(slug);
        setProduct(response.data);
      } catch (err) {
        console.error(err);
        setError('Ошибка загрузки товара');
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [slug]);

  const metadata = generateProductMetadata(product);

  useEffect(() => {
    if (metadata) {
      //@ts-expect-error: 2322
      document.title = metadata.title;
      const metaDescription = document.querySelector(
        'meta[name="description"]'
      );
      if (metaDescription) {
        metaDescription.setAttribute('content', metadata.description!);
      }

      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords && Array.isArray(metadata.keywords)) {
        metaKeywords.setAttribute('content', metadata.keywords.join(', '));
      }
    }
  }, [metadata]);

  if (loading) {
    return (
      <main className="my-6 flex flex-col gap-6">
        <PageWrapper>
          <div className="mx-auto max-w-4xl space-y-6">
            <div className="h-12 w-3/4 animate-pulse bg-gray-200" />
            <div className="h-6 w-48 animate-pulse bg-gray-200" />
            <div className="h-96 w-full animate-pulse bg-gray-200" />
            <div className="space-y-4">
              <div className="h-4 w-full animate-pulse bg-gray-200" />
              <div className="h-4 w-5/6 animate-pulse bg-gray-200" />
              <div className="h-4 w-2/3 animate-pulse bg-gray-200" />
            </div>
          </div>
        </PageWrapper>
      </main>
    );
  }

  if (error) {
    return (
      <main className="my-6 flex flex-col gap-6">
        <PageWrapper>
          <div className="flex flex-col items-center justify-center">
            <Image src={'/error.png'} alt={'Ошибка'} width={300} height={400} />
            <div className="py-6 text-center text-xl text-red-500">{error}</div>
          </div>
        </PageWrapper>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="my-6 flex flex-col gap-6">
        <PageWrapper>
          <div className="flex flex-col items-center justify-center">
            <Image
              src={'/error.png'}
              alt={'Товар не найден'}
              width={300}
              height={400}
            />
            <div className="py-6 text-center text-xl text-gray-500">
              Товар не найден
            </div>
          </div>
        </PageWrapper>
      </main>
    );
  }

  const thumbnails = product.images?.map((image: ProductImage) => ({
    id: image.id || 0,
    src: image.image || '/product/default-product.png',
  })) || [{ id: 1, src: '/product/default-product.png' }];

  return (
    <main className="my-6 flex flex-col gap-6">
      <PageWrapper>
        <ProductBreadcrumb />
        <ProductDetails product={product} thumbnails={thumbnails} />
        <ProductAccordionSection />
      </PageWrapper>
      <ClubBanner />
      <NewProductsWidget />
    </main>
  );
}
