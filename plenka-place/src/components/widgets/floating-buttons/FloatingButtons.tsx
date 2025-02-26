import { CartSidebar } from '../cart-sidebar/CartSidebar';
import { FavouriteSidebar } from '../favourite-sidebar/FavouriteSidebar';

export const FloatingButtons = () => {
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-2">
      <CartSidebar />
      <FavouriteSidebar />
    </div>
  );
};
