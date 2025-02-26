import { Badge } from '@/components/shared/ui/badge';
import { Button } from '@/components/shared/ui/button';
import { FaHeart } from 'react-icons/fa';
import Image from 'next/image';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/shared/ui/card';
import { Product } from '../../model/Product';
import { Price } from '../price/Price';
import { Rating } from '../rating/Rating'; // Импортируем компонент рейтинга

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className="max-w-[262px] rounded-[20px] shadow-lg">
      <CardHeader className="relative">
        <Image
          className="h-[349px] w-full rounded-[20px] object-cover"
          src={product.image}
          alt={product.name}
          width={262}
          height={349}
        />

        <div className="absolute left-4 top-4 flex w-[calc(100%-32px)] items-center justify-between">
          <Badge className="bg-[#eceaf1] px-3.5 py-1 text-xs text-[#100e15] sm:text-sm">
            НОВЫЙ
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white hover:bg-white/90"
          >
            <FaHeart className="text-red-500" size={18} />
          </Button>
        </div>

        <Button className="absolute bottom-4 left-1/2 flex w-[150px] -translate-x-1/2 transform items-center justify-center rounded-lg bg-[#bf3a2b] text-lg font-medium text-[#eceaf1] shadow-lg transition-colors hover:bg-[#a6342a]">
          В корзину
        </Button>
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
        <Rating value={product.rating} max={5} />
        <CardTitle className="text-sm font-medium text-[#bf3a2b] sm:text-lg">
          {product.name}
        </CardTitle>
        <CardDescription className="text-sm font-medium text-[#100e15] sm:text-lg">
          <Price>{product.price}</Price>
        </CardDescription>
      </CardContent>
    </Card>
  );
};
