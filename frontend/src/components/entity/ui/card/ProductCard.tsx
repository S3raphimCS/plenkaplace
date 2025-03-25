'use client';
import { useRouter } from 'next/navigation';
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
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
  addToFavourites,
  removeFromFavourites,
} from '@/store/slices/favouritesSlice';
import { addToCart } from '@/store/slices/cartSlice';
import { CartItemModel } from '../../model/CartItemModel';
import { useToast } from '@/hooks/use-toast';
import { handleSuccess, handleInfo } from '@/components/shared/Toasts';
import { paths } from '@/lib/paths';

export const ProductCard = ({
  product,
  isDisabled = false,
}: {
  product: Product;
  isDisabled?: boolean;
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const favourites = useSelector((state: RootState) => state.favourites.items);
  const isFavourite = favourites.some((item) => item.id === product.id);
  const { toast } = useToast();

  const handleAddToFavourites = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavourite) {
      dispatch(removeFromFavourites(product.id as string));
      handleInfo(toast, `Товар ${product.title} удалён из избранного`);
    } else {
      dispatch(addToFavourites(product));
      handleSuccess(toast, `Товар ${product.title} добавлен в избранное`);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(
      addToCart({
        ...product,
        quantity: 1,
      } as CartItemModel)
    );
    handleSuccess(toast, `Товар ${product.title} добавлен в корзину`);
  };

  const handleNavigate = () => {
    router.push(paths.product(product.slug));
  };

  const productImage =
    product.images?.[0]?.image || '/product/default-product.png';

  return (
    <Card
      className="w-full cursor-pointer rounded-[20px] shadow-lg"
      onClick={handleNavigate}
    >
      <CardHeader className="relative">
        <div className="relative w-full overflow-hidden rounded-[20px] sm:h-[300px]">
          <Image
            src={productImage}
            alt={product.title}
            width={262}
            height={349}
            className="h-full w-full object-contain object-center"
            priority
          />
        </div>

        <div className="absolute left-4 top-4 z-10 flex w-[calc(100%-32px)] items-center justify-between">
          <span></span>
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full bg-white hover:bg-white/90 ${isFavourite ? 'text-red-500' : 'text-gray-500'}`}
            onClick={handleAddToFavourites}
          >
            <FaHeart size={18} />
          </Button>
        </div>

        <Button
          className="absolute bottom-4 left-1/2 z-10 flex w-[150px] -translate-x-1/2 transform items-center justify-center rounded-lg bg-[#bf3a2b] text-lg font-medium text-[#eceaf1] shadow-lg transition-colors hover:bg-[#a6342a]"
          onClick={handleAddToCart}
          disabled={isDisabled}
        >
          В корзину
        </Button>
      </CardHeader>

      <CardContent className="flex flex-col gap-2 p-4">
        <CardTitle className="text-sm font-medium text-[#bf3a2b] sm:text-lg">
          {product.title}
        </CardTitle>
        <CardDescription className="flex flex-col gap-1">
          <Price className="text-2xl font-bold text-[#100e15]">
            {Number(product.price) || 0}
          </Price>
        </CardDescription>
      </CardContent>
    </Card>
  );
};
