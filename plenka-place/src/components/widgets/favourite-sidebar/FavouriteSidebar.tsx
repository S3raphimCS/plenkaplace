import { Button } from '@/components/shared/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/shared/ui/sheet';
import { FaHeart } from 'react-icons/fa6';

export const FavouriteSidebar = () => {
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
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
