'use client';
import { useState } from 'react';
import { Input } from '@/components/shared/ui/input';
import { Ticket } from 'lucide-react';
import { Button } from '@/components/shared/ui/button';
import { Api, PromoCodeCheck, OrderItem } from '@/lib/api';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setPromoCode, setDiscountInfo } from '@/store/slices/orderSlice';

const api = new Api();

export const CouponSection: React.FC = () => {
  const [couponCode, setCouponCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [couponCorrect, setCouponCorrect] = useState<PromoCodeCheck | null>(
    null
  );

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  async function handleApplyCoupon() {
    if (!couponCode.trim()) {
      setError('Введите промокод');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.shop.shopPromoCodesCheckPromoCode({
        code: couponCode,
      });

      if (response.data) {
        setCouponCorrect(response.data);
        dispatch(setPromoCode(couponCode));

        //@ts-expect-error: OrderItem represents Product model + quantity, but in this case only id
        const orderItems: OrderItem[] = cartItems.map((item) => ({
          product: item.id,
          quantity: item.quantity,
        }));

        const priceResponse =
          await api.shop.shopPromoCodesGetOrderPriceWithPromo({
            code: couponCode,
            items: orderItems,
          });

        dispatch(
          setDiscountInfo({
            //@ts-expect-error: discount_value non part of Order
            discount_value: priceResponse.data.discount_value,
            //@ts-expect-error: price_with_discount non part of Order
            price_with_discount: priceResponse.data.price_with_discount,
          })
        );
      } else {
        setCouponCorrect(null);
        setError('Промокод недействителен');
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Ошибка проверки промокода');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex w-[424px] flex-col items-start gap-4">
      <div className="flex w-full flex-col items-start gap-[7px]">
        <h2 className="mt-[-1px] w-full">У вас есть купон?</h2>
        <p className="font-body-2 w-full">Добавьте код для скидки на товары</p>
      </div>

      <div className="flex h-[54px] w-[426px] border border-solid">
        <div className="flex w-full items-center border-b px-4">
          <Ticket className="h-6 w-6" />
          <Input
            className="h-[52px] border-none focus-visible:outline-none focus-visible:ring-offset-0"
            placeholder="Код купона"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <Button
            variant="ghost"
            onClick={handleApplyCoupon}
            disabled={loading}
          >
            {loading ? 'Проверка...' : 'Применить'}
          </Button>
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {couponCorrect && <p className="text-green-500">Промокод применён!</p>}
    </div>
  );
};
