'use client';
import { Button } from '@/components/shared/ui/button';
import Image from 'next/image';
import { Product } from '../../model/Product';
import { Price } from '../price/Price';
import Link from 'next/link';

interface PreviewCardProps {
  product: Product;
  onRemove: () => void;
}

export const PreviewProductCard = ({ product, onRemove }: PreviewCardProps) => {
  return (
    <div className="flex items-center justify-between gap-4 border-b p-4">
      <div className="flex items-center gap-4">
        <Link href={product.slug!}>
          <Image
            src={product.images?.[0]?.image ?? '/product/default-product.png'}
            alt={product.title}
            width={64}
            height={64}
            className="rounded-lg"
          />
        </Link>

        <div>
          <Link href={product.slug!}>
            <h3 className="text-sm font-medium sm:text-base">
              {product.title}
            </h3>
          </Link>
          <Price className="text-sm text-gray-600">
            {Number(product.price)}
          </Price>
        </div>
      </div>
      <Button variant="ghost" onClick={onRemove}>
        Удалить
      </Button>
    </div>
  );
};
