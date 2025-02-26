import { FaHeart } from 'react-icons/fa';
import { Button } from './ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';

export const ButtonFavourite = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={'default'}
            className="rounded-full bg-accent hover:bg-[#a6342a]"
            size="icon"
          >
            <FaHeart className="text-white" size={20} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Добавить в избранное</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
