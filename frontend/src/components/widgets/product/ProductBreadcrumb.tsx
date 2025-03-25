'use client';
import { Product } from '@/components/entity';
import { CustomBreadcrumb } from '@/components/shared/CustomBreadcrumb';
import { Api } from '@/lib/api';
import { paths } from '@/lib/paths';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const api = new Api();

export const ProductBreadcrumb = () => {
  const params = useParams();
  const productSlug = params.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!productSlug || Array.isArray(productSlug)) {
          throw new Error('Invalid product Slug');
        }

        const response = await api.shop.shopProductsRead(productSlug);
        setProduct(response.data);
      } catch (err) {
        console.error(err);
        setError('Ошибка загрузки товара');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productSlug]);

  if (loading) {
    return (
      <CustomBreadcrumb
        items={[
          { label: 'Главная', href: paths.home, active: false },
          { label: 'Каталог', href: paths.catalog, active: false },
          { label: 'Загрузка...', href: '#', active: true },
        ]}
        className="pl-40"
      />
    );
  }

  if (error || !product) {
    return (
      <CustomBreadcrumb
        items={[
          { label: 'Главная', href: paths.home, active: false },
          { label: 'Каталог', href: paths.catalog, active: false },
          { label: 'Товар не найден', href: '#', active: true },
        ]}
        className="pl-40"
      />
    );
  }

  const productTitle = product.title;
  const productType = product.product_type;

  const breadcrumbItems = [
    { label: 'Главная', href: paths.home, active: false },
    { label: 'Каталог', href: paths.catalog, active: false },
  ];

  if (productType) {
    let typePath: string;

    switch (productType.title.toLowerCase()) {
      case 'фотоаппарат':
        typePath = paths.cameras;
        break;
      case 'пленка':
        typePath = paths.film;
        break;
      case 'аксессуар':
        typePath = paths.accessories;
        break;
      case 'наборы':
        typePath = paths.sets;
        break;
      case 'сертификаты':
        typePath = paths.certificate;
        break;
      default:
        typePath = paths.catalog;
    }

    breadcrumbItems.push({
      label: productType.title,
      href: typePath,
      active: false,
    });
  }

  breadcrumbItems.push({
    label: productTitle,
    href: paths.product(productSlug),
    active: true,
  });

  return <CustomBreadcrumb items={breadcrumbItems} className="pl-8" />;
};
