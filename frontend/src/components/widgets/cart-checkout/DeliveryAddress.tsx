'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent } from '@/components/shared/ui/card';
import { Input } from '@/components/shared/ui/input';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { FormSelect } from '@/components/shared/form';
import { Api, DeliveryMethod } from '@/lib/api';
import { RootState } from '@/store/store';
import { setDeliveryInfo } from '@/store/slices/orderSlice';

interface DeliveryData {
  deliveryMethod: string;
  address: string;
  comment: string;
}

const api = new Api();

export const DeliveryAddress: React.FC = () => {
  const dispatch = useDispatch();
  const { address, comment, delivery_method } = useSelector(
    (state: RootState) => state.order
  );

  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm<DeliveryData>({
    defaultValues: {
      address,
      comment,
      deliveryMethod: delivery_method ? String(delivery_method) : 'selfPickup',
    },
  });

  const [methods, setMethods] = useState<DeliveryMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const watchedFields = useWatch({ control });

  useEffect(() => {
    async function fetchMethods() {
      try {
        const response = await api.shop.shopDeliveryMethodsList();
        setMethods(response.data.results);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    }

    fetchMethods();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(
        setDeliveryInfo({
          address: watchedFields.address!,
          comment: watchedFields.comment!,
          deliveryMethod: Number(watchedFields.deliveryMethod),
        })
      );
    }, 1000);

    return () => clearTimeout(timeout);
  }, [watchedFields, dispatch]);

  return (
    <Card className="w-full text-black sm:w-full lg:w-[643px]">
      <CardContent className="p-8 pt-8 sm:p-6 sm:pt-10">
        <h2 className="mb-6 mt-[-1.00px] w-fit text-xl sm:text-2xl">
          Адрес доставки
        </h2>

        <div className="flex w-full flex-col items-start gap-2 sm:gap-3">
          <label className="font-hairline-2 mt-[-1.00px] w-fit text-sm sm:text-base">
            Способ доставки
          </label>
          {loading ? (
            <span>Загрузка способов доставки...</span>
          ) : error ? (
            <span className="text-red-500">{error}</span>
          ) : (
            <Controller
              name="deliveryMethod"
              control={control}
              render={({ field }) => (
                <FormSelect
                  options={methods.map((method) => ({
                    value: String(method.id),
                    label: method.title,
                  }))}
                  placeholder="Выберите способ доставки"
                  onChange={(value: string) => {
                    setValue('deliveryMethod', value, { shouldDirty: true });
                    field.onChange(value);
                  }}
                  value={field.value}
                />
              )}
            />
          )}
        </div>

        {watchedFields.deliveryMethod !== 'selfPickup' && (
          <div className="mt-4 flex flex-col gap-4 sm:gap-6">
            <div className="flex w-full flex-col items-start gap-2 sm:gap-3">
              <label className="font-hairline-2 mt-[-1.00px] w-fit text-sm sm:text-base">
                Адрес
              </label>
              <Input
                className="h-10 w-full bg-white"
                placeholder="Введите ваш адрес"
                {...register('address', {
                  required: 'Адрес обязателен для заполнения',
                })}
              />
              {errors.address && (
                <span className="text-sm text-red-500">
                  {errors.address.message}
                </span>
              )}
            </div>

            <div className="flex w-full flex-col items-start gap-2 sm:gap-3">
              <label className="font-hairline-2 mt-[-1.00px] w-fit text-sm sm:text-base">
                Комментарий
              </label>
              <Input
                className="h-10 w-full bg-white"
                placeholder="Комментарий к доставке"
                {...register('comment')}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
