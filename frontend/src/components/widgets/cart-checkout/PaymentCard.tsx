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
  setStep: (step: number) => void;
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
    <Card className="w-full max-w-md rounded-md border border-[#6c7174] bg-white">
      <CardContent className="flex flex-col items-start gap-4 p-4 sm:p-6">
        <h2 className="w-full text-lg font-semibold text-black sm:text-xl">
          Выбор оплаты
        </h2>
        <div className="flex w-full flex-col">
          <RadioGroup
            value={paymentMethod}
            onValueChange={handlePaymentChange}
            className="flex w-full flex-col gap-3"
          >
            <div className="flex w-full items-center rounded border border-black px-4 py-3">
              <RadioGroupItem value="cash" id="cash" className="h-5 w-5" />
              <Label htmlFor="cash" className="ml-3 text-sm text-black">
                Наличный расчёт
              </Label>
            </div>
            <div className="flex w-full items-center rounded border border-black px-4 py-3">
              <RadioGroupItem value="card" id="card" className="h-5 w-5" />
              <Label htmlFor="card" className="ml-3 text-sm text-black">
                Безналичный расчёт
              </Label>
            </div>
          </RadioGroup>

          <div className="mt-4 flex justify-between border-b border-t py-3 text-sm text-black">
            <span>Промежуточный итог</span>
            <Price>{Number(subtotal.toFixed(2))}</Price>
          </div>
          <div className="flex justify-between py-3 text-lg font-semibold text-black">
            <span>Итог</span>
            <Price>{Number(total.toFixed(2))}</Price>
          </div>
        </div>

        <Button
          onClick={() => setStep(2)}
          className="w-full rounded-lg bg-[#bf3a2b] py-2 text-sm text-white hover:bg-[#a6342a] sm:text-base"
        >
          Перейти к оформлению
        </Button>
      </CardContent>
    </Card>
  );
};
