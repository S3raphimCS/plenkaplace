import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order, OrderItem } from '@/lib/api';
import { CartItemModel } from '@/components/entity';

const initialState: Order = {
  first_name: '',
  contact_data: '',
  email: '',
  address: '',
  comment: '',
  payment_method: 'cash',
  delivery_method: 0,
  created_at: '',
  contact_preferences: 'phone_call',
  total_price: 0,
  promo_code: null,
  //@ts-expect-error: discount_value non part of Order
  discount_value: 0,
  price_with_discount: 0,
  items: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setContactInfo: (
      state,
      action: PayloadAction<{
        name: string;
        contactValue: string;
        contact_preferences: 'phone_call' | 'telegram' | 'whatsapp';
        email: string;
      }>
    ) => {
      state.first_name = action.payload.name;
      state.contact_data = action.payload.contactValue;
      state.contact_preferences = action.payload.contact_preferences;
      state.email = action.payload.email;
    },
    setDeliveryInfo: (
      state,
      action: PayloadAction<{
        address: string;
        comment: string;
        deliveryMethod: number;
      }>
    ) => {
      state.address = action.payload.address;
      state.comment = action.payload.comment;
      state.delivery_method = action.payload.deliveryMethod;
    },
    setPaymentMethod: (state, action: PayloadAction<'cash' | 'card'>) => {
      state.payment_method = action.payload;
    },
    setCartItems: (state, action: PayloadAction<OrderItem[]>) => {
      state.items = action.payload;
    },
    setOrderFromCart: (state, action: PayloadAction<CartItemModel[]>) => {
      state.items = action.payload
        .filter((item) => item.id !== undefined)
        .map((item) => ({
          product: Number(item.id),
          quantity: item.quantity,
        }));

      state.total_price = action.payload.reduce(
        (total, item) => total + item.quantity * Number(item.price ?? 0),
        0
      );
    },
    setOrderCreatedAt: (state, action: PayloadAction<string>) => {
      state.created_at = action.payload;
    },
    setOrderIdCreated: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
    setPromoCode: (state, action: PayloadAction<string>) => {
      state.promo_code = action.payload;
    },
    setDiscountInfo: (
      state,
      action: PayloadAction<{
        discount_value: number;
        price_with_discount: number;
      }>
    ) => {
      //@ts-expect-error: discount_value non part of Order
      state.discount_value = action.payload.discount_value;
      //@ts-expect-error: price_with_discount non part of Order
      state.price_with_discount = action.payload.price_with_discount;
    },
    resetOrder: () => {
      return initialState;
    },
  },
});

export const {
  setContactInfo,
  setDeliveryInfo,
  setPaymentMethod,
  setOrderCreatedAt,
  setOrderIdCreated,
  setOrderFromCart,
  setCartItems,
  setPromoCode,
  setDiscountInfo,
  resetOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
