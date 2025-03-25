import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/components/entity';
import { CartItemModel } from '@/components/entity/model/CartItemModel';
import {
  handleSuccess,
  handleError,
  handleInfo,
} from '@/components/shared/Toasts';
import { toast } from '@/hooks/use-toast';

interface CartState {
  items: CartItemModel[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      if (action.payload.product_type?.title === 'Фотоаппарат') {
        const existingItem = state.items.find(
          (item) => item.id === action.payload.id
        );
        if (existingItem) {
          handleError(toast, 'Фотоаппарат уже добавлен в корзину!');
          return state;
        } else {
          state.items.push({ ...action.payload, quantity: 1 });
          handleSuccess(toast, 'Фотоаппарат добавлен в корзину!');
        }
      } else {
        const existingItem = state.items.find(
          (item) => item.id === action.payload.id
        );
        if (existingItem) {
          existingItem.quantity += 1;
          handleSuccess(toast, 'Товар добавлен в корзину!');
        } else {
          state.items.push({ ...action.payload, quantity: 1 });
          handleSuccess(toast, 'Товар добавлен в корзину!');
        }
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      handleInfo(toast, 'Товар удален из корзины!');
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        handleSuccess(toast, `Количество товара обновлено: ${item.title}`);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
