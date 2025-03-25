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

      console.log('Отправляем заказ:', formattedOrder);

      const response = await api.shop.shopOrdersCreate(formattedOrder);
      console.log(response.data);
      if (response.ok) {
        //@ts-expect-error: Any and possible null
        dispatch(setOrderCreatedAt(response.data.created_at));
        //@ts-expect-error: Any and possible null
        dispatch(setOrderIdCreated(response.data.id));
        setStep(3);
      }
    } catch (error) {
      console.error('Ошибка создания заказа:', error);
    }
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
    <div className="flex items-start gap-16 px-0 py-20">
      <div className="flex flex-col items-start gap-6">
        <Card className="w-full text-black">
          <CardContent className="p-6 pt-10">
            <h2 className="mb-6 mt-[-1.00px] w-fit text-2xl">
              Контактная информация
            </h2>
            <CartFormSecond />
          </CardContent>
        </Card>
        <DeliveryAddress />
        <CouponSection />
        <Button
          className="w-[643px] rounded-lg px-10 py-3 text-center"
          onClick={handleOrderSubmit}
        >
          Создать заказ
        </Button>
      </div>

      <Card className="w-[413px] rounded-md bg-white text-black">
        <CardContent className="p-6 pt-4">
          <h2 className="mb-4 text-[28px] font-medium">Заказ</h2>
          {cartItems.map((item) => (
            <CartItemShort key={item.id} item={item} />
          ))}
          <OrderSummary items={orderSummary} />
        </CardContent>
      </Card>
    </div>
  );
};
