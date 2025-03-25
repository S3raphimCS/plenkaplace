'use client';
import { Button } from '@/components/shared/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/shared/ui/sheet';
import { FaCartShopping } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { removeFromCart } from '@/store/slices/cartSlice';
import { PreviewProductCard } from '@/components/entity/ui/card/PreviewProductCard';
import Image from 'next/image';
import Link from 'next/link';
import { paths } from '@/lib/paths';

export const CartSidebar = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="rounded-xl bg-[#FDE3B8] text-black hover:bg-[#E9D3AF] [&_svg]:size-5"
          size={'icon'}
        >
          <FaCartShopping size={24} className="text-2xl" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={'right'}
        className="overflow-x-hidden overflow-y-scroll"
      >
        <SheetHeader>
          <SheetTitle>Корзина</SheetTitle>
        </SheetHeader>

        {cartItems.length > 0 ? (
          <>
            <ul className="mt-4">
              {cartItems.map((item) => (
                <PreviewProductCard
                  key={item.id}
                  product={item}
                  onRemove={() => dispatch(removeFromCart(item.id as string))}
                />
              ))}
            </ul>
            <div className="mt-6">
              <Link href={paths.cart_checkout}>
                <Button className="w-full rounded-lg bg-[#bf3a2b] py-2 text-white hover:bg-[#a6342a]">
                  Перейти к оформлению
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="mt-8 flex flex-col items-center justify-center gap-4">
            <Image
              src="/cart/empty_cart.png"
              alt="Корзина пуста"
              width={200}
              height={200}
              className="h-auto w-auto"
            />
            <p className="text-center text-gray-500">
              В вашей корзине пока нет товаров.
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
