import { Button } from '@/components/shared/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/shared/ui/sheet';
import { FaCartShopping } from 'react-icons/fa6';

export const CartSidebar = () => {
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
