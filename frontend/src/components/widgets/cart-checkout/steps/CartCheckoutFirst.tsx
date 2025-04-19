'use client';
import { RootState } from '@/store/store';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CartItem } from '../cart-cards/CartItem';
import { PaymentCard } from '../PaymentCard';
import { resetOrder } from '@/store/slices/orderSlice';

interface CartCheckoutFirstProps {
  setStep: (step: number) => void;
}

export const CartCheckoutFirst: React.FC<CartCheckoutFirstProps> = ({
  setStep,
}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    if (cartItems.length === 0) {
      dispatch(resetOrder());
    }
  }, [cartItems, dispatch]);

  return (
    <div className="flex w-full flex-col items-center py-8 px-4">
      <div className="flex flex-col lg:flex-row w-full justify-center gap-y-10 lg:gap-x-16 py-10">
        <div className="flex flex-col w-full max-w-2xl">
          <div className="hidden md:flex w-full items-start justify-between border-b pb-6">
            <div className="text-black-900 font-text">Товар</div>
            <div className="flex w-[322px] items-center justify-between">
              <div className="text-black-900 font-text">Количество</div>
              <div className="text-black-900 font-text">Цена</div>
              <div className="text-black-900 font-text">Итог</div>
            </div>
          </div>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={{
                ...item,
                quantity: item.quantity || 1,
                total: item.quantity * Number(item.price),
              }}
            />
          ))}
        </div>
        <div className="w-full max-w-md">
          <PaymentCard setStep={setStep} />
        </div>
      </div>
    </div>
  );
};
