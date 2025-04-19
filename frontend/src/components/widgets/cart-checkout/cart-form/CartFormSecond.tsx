'use client';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setContactInfo } from '@/store/slices/orderSlice';
import { useEffect, useRef } from 'react';
import {
  FormInput,
  FormPhoneInput,
  FormSelect,
} from '@/components/shared/form';

interface FormData {
  name: string;
  contact_preferences: 'phone_call' | 'telegram' | 'whatsapp';
  contactValue: string;
  email: string;
}

const schema = yup.object().shape({
  name: yup.string().required('Имя обязательно для заполнения'),
  contact_preferences: yup
    .string()
    .oneOf(['phone_call', 'telegram', 'whatsapp'], 'Выберите способ связи')
    .required('Выберите способ связи'),
  contactValue: yup
    .string()
    .required('Заполните поле')
    .when('contact_preferences', ([method], schema) => {
      if (method === 'whatsapp' || method === 'phone_call') {
        return schema.matches(
          /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
          'Введите корректный номер телефона'
        );
      }
      if (method === 'telegram') {
        return schema.required('Введите Telegram ID');
      }
      return schema;
    }),
  email: yup
    .string()
    .email('Введите корректный E-mail')
    .required('E-mail обязателен'),
});

export const CartFormSecond: React.FC = () => {
  const dispatch = useDispatch();
  const order = useSelector((state: RootState) => state.order);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const {
    register,
    control,
    watch,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: order.first_name,
      contact_preferences: order.contact_preferences || 'phone_call',
      contactValue: order.contact_data || '',
      email: order.email || '',
    },
  });

  const watchedFields = watch();

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(async () => {
      const isValid = await trigger();
      if (isValid) {
        dispatch(
          setContactInfo({
            name: watchedFields.name,
            contactValue: watchedFields.contactValue,
            contact_preferences: watchedFields.contact_preferences,
            email: watchedFields.email,
          })
        );
      }
    }, 1000);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [watchedFields, dispatch, trigger]);

  return (
    <form className="flex w-full flex-col items-start gap-6">
      <div className="flex w-full flex-col items-start gap-3">
        <label className="text-xs font-bold text-black">Введите ваше ФИО</label>
        <FormInput
          type="input"
          placeholder="Введите ФИО"
          error={errors.name}
          register={register('name')}
        />
      </div>

      <div className="flex w-full flex-col items-start gap-3">
        <label className="text-xs font-bold text-black">Способ связи</label>
        <Controller
          name="contact_preferences"
          control={control}
          render={({ field }) => (
            <FormSelect
              options={[
                { value: 'phone_call', label: 'Телефон' },
                { value: 'whatsapp', label: 'WhatsApp' },
                { value: 'telegram', label: 'Telegram' },
              ]}
              placeholder="Выберите способ связи"
              error={errors.contact_preferences}
              {...field}
            />
          )}
        />
      </div>

      <div className="flex w-full flex-col items-start gap-3">
        <label className="text-xs font-bold text-black">
          {watchedFields.contact_preferences === 'phone_call' ||
          watchedFields.contact_preferences === 'whatsapp'
            ? 'Номер телефона'
            : 'Telegram ID'}
        </label>

        {watchedFields.contact_preferences === 'phone_call' ||
        watchedFields.contact_preferences === 'whatsapp' ? (
          <Controller
            name="contactValue"
            control={control}
            render={({ field }) => (
              <FormPhoneInput field={field} error={errors.contactValue} />
            )}
          />
        ) : (
          <FormInput
            type="input"
            placeholder="Введите Telegram ID"
            error={errors.contactValue}
            register={register('contactValue')}
          />
        )}
      </div>

      <div className="flex w-full flex-col items-start gap-3">
        <label className="text-xs font-bold text-black">E-mail</label>
        <FormInput
          type="email"
          placeholder="Введите E-mail"
          error={errors.email}
          register={register('email')}
        />
      </div>
    </form>
  );
};
