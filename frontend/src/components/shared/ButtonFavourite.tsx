'use client';
import { FaHeart } from 'react-icons/fa';
import { Button } from './ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import { useDispatch } from 'react-redux';
import {
  addToFavourites,
  removeFromFavourites,
} from '@/store/slices/favouritesSlice';
import { Product } from '../entity';

interface ButtonFavouriteProps {
  product: Product;
  isFavourite?: boolean;
}

export const ButtonFavourite = ({
  product,
  isFavourite = false,
}: ButtonFavouriteProps) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    if (isFavourite) {
      dispatch(removeFromFavourites(product.id!));
    } else {
      dispatch(addToFavourites(product));
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={'default'}
            className={`rounded-full bg-accent hover:bg-[#a6342a] ${isFavourite ? 'bg-[#a6342a]' : ''}`}
            size="icon"
            onClick={handleClick}
          >
            <FaHeart className="text-white" size={20} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {isFavourite ? 'Удалить из избранного' : 'Добавить в избранное'}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
