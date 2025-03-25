'use client';
import Image from 'next/image';
import { Button } from '@/components/shared/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '@/components/shared/ui/sheet';
import { FaHeart } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { removeFromFavourites } from '@/store/slices/favouritesSlice';
import { PreviewProductCard } from '@/components/entity/ui/card/PreviewProductCard';

export const FavouriteSidebar = () => {
  const favourites = useSelector((state: RootState) => state.favourites.items);
  const dispatch = useDispatch();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="rounded-xl bg-[#FDE3B8] text-red-600 hover:bg-[#E9D3AF] [&_svg]:size-5"
          size={'icon'}
        >
          <FaHeart />
        </Button>
      </SheetTrigger>
      <SheetContent side={'right'}>
        <SheetHeader>
          <SheetTitle>Избранное</SheetTitle>
          <SheetDescription>
            {favourites.length === 0 ? (
              <div className="mt-8 flex flex-col items-center justify-center gap-4">
                <Image
                  src="/favourite/empty-favourites.png"
                  alt="Пустой список избранного"
                  width={400}
                  height={400}
                />
                <p className="text-center text-lg text-gray-500">
                  Ваш список избранного пуст.
                </p>
              </div>
            ) : (
              <ul>
                {favourites.map((item) => (
                  <PreviewProductCard
                    key={item.id}
                    product={item}
                    onRemove={() => dispatch(removeFromFavourites(item.id!))}
                  />
                ))}
              </ul>
            )}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
