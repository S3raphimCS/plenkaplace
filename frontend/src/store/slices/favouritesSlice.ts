import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/components/entity';
import { handleSuccess, handleInfo } from '@/components/shared/Toasts';
import { toast } from '@/hooks/use-toast';

interface FavouritesState {
  items: Product[];
}

const initialState: FavouritesState = {
  items: [],
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addToFavourites: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        handleInfo(toast, 'Товар уже в избранном!');
        return state;
      } else {
        state.items.push(product);
        handleSuccess(toast, `Товар "${product.title}" добавлен в избранное!`);
      }
    },
    removeFromFavourites: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const removedItem = state.items.find((item) => item.id === id);

      if (removedItem) {
        state.items = state.items.filter((item) => item.id !== id);
        handleInfo(toast, `Товар "${removedItem.title}" удалён из избранного!`);
      }
    },
    clearFavourites: (state) => {
      state.items = [];
      handleInfo(toast, 'Избранное очищено!');
    },
  },
});

export const { addToFavourites, removeFromFavourites, clearFavourites } =
  favouritesSlice.actions;
export default favouritesSlice.reducer;
