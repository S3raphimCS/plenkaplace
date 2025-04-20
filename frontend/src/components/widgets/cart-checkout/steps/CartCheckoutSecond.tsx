'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@/components/shared/ui/button';
import { Card, CardContent } from '@/components/shared/ui/card';
import { OrderSummary } from '../OrderSummary';
import { CouponSection } from '../CouponSection';
import { DeliveryAddress } from '../DeliveryAddress';
import { CartFormSecond } from '../cart-form/CartFormSecond';
import { CartItemShort } from '../cart-cards/CartItemShort';
import { RootState } from '@/store/store';
import {
  setOrderCreatedAt,
  setOrderFromCart,
  setOrderIdCreated,
} from '@/store/slices/orderSlice';
import { Api } from '@/lib/api';

const api = new Api();

interface CartCheckoutSecondProps {
  setStep: (step: number) => void;
}

export const CartCheckoutSecond: React.FC<CartCheckoutSecondProps> = ({
  setStep,
}) => {
  const dispatch = useDispatch();
  const order = useSelector((state: RootState) => state.order);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    dispatch(setOrderFromCart(cartItems));
  }, [cartItems, dispatch]);

  const handleOrderSubmit = async () => {
    try {
      //@ts-expect-error: Discount_value and Price_with_discount not used
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { discount_value, price_with_discount, ...formattedOrder } = {
        ...order,
        items: Array.isArray(order.items)
          ? order.items
          : JSON.parse(order.items),
      };

      const response = await api.shop.shopOrdersCreate(formattedOrder);
      if (response.ok) {
        //@ts-expect-error: Any and possible null
        dispatch(setOrderCreatedAt(response.data.created_at));
        //@ts-expect-error: Any and possible null
        dispatch(setOrderIdCreated(response.data.id));
        setStep(3);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {}
  };

  const orderSummary = [
    { label: 'Промежуточный итог', value: `${order.total_price} ₽` },
    //@ts-expect-error: discount_value non part of Order
    ...(order.discount_value
      ? //@ts-expect-error: discount_value non part of Order
        [{ label: 'Скидка', value: `-${order.discount_value} ₽` }]
      : []),
    {
      label: 'Итог',
      //@ts-expect-error: price_with_discount non part of Order
      value: `${order.price_with_discount! || order.total_price} ₽`,
      isTotal: true,
    },
  ];

  return (
    <div className="box-border flex w-full flex-col-reverse items-start gap-y-10 overflow-hidden px-4 py-6 sm:w-auto sm:flex-row sm:gap-x-6 sm:px-6 sm:py-8 md:px-10 md:py-10">
      <div className="flex w-full max-w-full flex-col items-start gap-6 lg:max-w-2xl">
        <Card className="w-full text-black">
          <CardContent className="p-8 pt-6 sm:p-6 sm:pt-10">
            <h2 className="mb-6 mt-[-1.00px] break-words text-xl sm:text-2xl">
              Контактная информация
            </h2>
            <CartFormSecond />
          </CardContent>
        </Card>
        <DeliveryAddress />
        <CouponSection />
        <Button
          className="w-full rounded-lg px-6 py-3 text-center text-sm sm:text-base"
          onClick={handleOrderSubmit}
        >
          Создать заказ
        </Button>
      </div>

      <Card className="w-full max-w-full rounded-md bg-white text-black sm:max-w-full lg:max-w-[413px]">
        <CardContent className="p-8 pt-4 sm:p-6">
          <h2 className="mb-4 break-words text-xl font-medium sm:text-[28px]">
            Заказ
          </h2>
          {cartItems.map((item) => (
            <CartItemShort key={item.id} item={item} />
          ))}
          <OrderSummary items={orderSummary} />
        </CardContent>
      </Card>
    </div>
  );
};
