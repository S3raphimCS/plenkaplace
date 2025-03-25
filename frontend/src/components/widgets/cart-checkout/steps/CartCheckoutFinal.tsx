'use client';

import { Badge } from '@/components/shared/ui/badge';
import { Button } from '@/components/shared/ui/button';
import { Card, CardContent } from '@/components/shared/ui/card';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import Image from 'next/image';
import { clearCart } from '@/store/slices/cartSlice';
import { resetOrder } from '@/store/slices/orderSlice';
import Link from 'next/link';
import { paths } from '@/lib/paths';

export const CartCheckoutFinal: React.FC = () => {
  const dispatch = useDispatch();
  const order = useSelector((state: RootState) => state.order);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const orderDetails = [
    { label: 'Код заказа:', value: order.id || '—' },
    { label: 'Дата:', value: order.created_at || '—' },
    {
      label: 'Сумма :',
      //@ts-expect-error: price_with_discount non part of Order
      value: `${order.price_with_discount || order.total_price} ₽`,
    },
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(clearCart());
      dispatch(resetOrder());
    }, 10000);

    return () => clearTimeout(timeout);
  }, [dispatch]);

  return (
    <Card className="flex w-full max-w-[803px] flex-col items-center gap-10 rounded-lg bg-[#f5a300]/20 px-[95px] py-20">
      <CardContent className="flex w-full max-w-[546px] flex-col items-center gap-4 p-0">
        <h2 className="w-full max-w-[448px] text-center text-[28px] font-medium leading-[34px] tracking-[-0.60px] text-[#6c7174]">
          Благодарим вас за заказ!
        </h2>

        <h1 className="justify-start self-stretch text-center text-4xl font-medium text-[#22262e]">
          Мы получили ваш заказ
        </h1>
      </CardContent>

      <div className="flex w-full max-w-[546px] items-start justify-center gap-10">
        {order.items?.map((item, index) => {
          const product = cartItems.find(
            (product) => Number(product.id) === item.product
          );
          const imageUrl =
            product?.images?.[0]?.image || '/product/default-product.png';

          return (
            <div key={index} className="relative h-28 w-24">
              <div className="relative h-28">
                <Image
                  src={imageUrl}
                  alt={product?.title || 'Товар'}
                  className="absolute left-0 top-4 h-24 w-20 rounded-md object-contain"
                  width={80}
                  height={96}
                />
                <Badge className="absolute left-16 top-0 flex h-8 w-8 items-center justify-center rounded-[80px] p-0">
                  <span className="text-center text-base font-semibold">
                    {item.quantity}
                  </span>
                </Badge>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex w-full max-w-[548px] items-center justify-center gap-8">
        <div className="flex flex-col items-start gap-5">
          {orderDetails.map((detail, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="whitespace-nowrap text-[#6c7174]">
                {detail.label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-start gap-5">
          {orderDetails.map((detail, index) => (
            <div key={index}>
              <span className="whitespace-nowrap text-[#141718]">
                {detail.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Link href={paths.home}>
        <Button className="inline-flex items-center justify-center gap-2 rounded-[80px] bg-[#bf3a2b] px-10 py-3 hover:bg-[#8e2e23]">
          <span className="whitespace-nowrap text-center text-white">
            Вернуться на главную
          </span>
        </Button>
      </Link>
    </Card>
  );
};
