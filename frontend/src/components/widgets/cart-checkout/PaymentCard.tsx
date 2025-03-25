'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setPaymentMethod } from '@/store/slices/orderSlice';
import { Button } from '@/components/shared/ui/button';
import { Card, CardContent } from '@/components/shared/ui/card';
import { Label } from '@/components/shared/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/shared/ui/radio-group';
import { Price } from '@/components/entity';

interface PaymentCardProps {
  setStep: (step: number) => void; // New prop to handle step change
}

export const PaymentCard: React.FC<PaymentCardProps> = ({ setStep }) => {
  const dispatch = useDispatch();
  const paymentMethod = useSelector(
    (state: RootState) => state.order.payment_method
  );
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );
  const total = subtotal;

  const handlePaymentChange = (method: 'cash' | 'card') => {
    dispatch(setPaymentMethod(method));
  };

  return (
    <Card className="w-[413px] rounded-md border border-[#6c7174] bg-white">
      <CardContent className="flex flex-col items-start gap-4 p-6">
        <h2 className="font-headline-7 self-stretch text-black">
          Выбор оплаты
        </h2>
        <div className="flex w-full flex-col items-start">
          <div className="flex w-full flex-col items-start px-0 pb-8 pt-0">
            <RadioGroup
              value={paymentMethod}
              onValueChange={handlePaymentChange}
              className="flex w-full flex-col items-start gap-3 px-0 pb-4 pt-0"
            >
              <div className="flex w-full items-center rounded border border-solid border-black px-4 py-[13px]">
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="cash" id="cash" className="h-5 w-5" />
                  <Label
                    htmlFor="cash"
                    className="font-text-16px-regular text-black"
                  >
                    Наличный расчёт
                  </Label>
                </div>
              </div>
              <div className="flex w-full items-center rounded border border-solid border-black px-4 py-[13px]">
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="card" id="card" className="h-5 w-5" />
                  <Label
                    htmlFor="card"
                    className="font-text-16px-regular text-black"
                  >
                    Безналичный расчёт
                  </Label>
                </div>
              </div>
            </RadioGroup>
            <div className="border-black-200 flex w-full flex-col border-b px-0 py-[13px]">
              <div className="flex w-full items-start justify-between">
                <div className="text-base font-normal leading-[26px] text-black">
                  Промежуточный итог
                </div>
                <Price className="text-black">
                  {Number(subtotal.toFixed(2))}
                </Price>
              </div>
            </div>
            <div className="flex w-full flex-col px-0 py-[13px]">
              <div className="flex w-full items-start justify-between">
                <div className="text-2xl font-semibold leading-8 text-black">
                  Итог
                </div>
                <Price className="text-2xl text-black">
                  {Number(total.toFixed(2))}
                </Price>
              </div>
            </div>
          </div>
          <Button
            onClick={() => setStep(2)}
            className="w-full rounded-lg bg-[#bf3a2b] py-2 text-white hover:bg-[#a6342a]"
          >
            Перейти к оформлению
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
