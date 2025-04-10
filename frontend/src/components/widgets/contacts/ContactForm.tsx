'use client';
import { Button } from '@/components/shared/ui/button';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  FormInput,
  FormPhoneInput,
  FormSelect,
} from '@/components/shared/form';
import { Api } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

import { useState } from 'react';
import { handleError, handleSuccess } from '@/components/shared/Toasts';

const api = new Api();

interface FormData {
  name: string;
  email: string;
  contactMethod: 'whatsapp' | 'telegram';
  contactValue: string;
  message: string;
}

const schema = yup.object().shape({
  name: yup.string().required('Имя обязательно для заполнения'),
  email: yup
    .string()
    .email('Введите корректный email')
    .required('Введите ваш e-mail'),
  contactMethod: yup
    .string()
    .oneOf(['whatsapp', 'telegram'], 'Выберите способ связи')
    .required('Выберите способ связи'),
  contactValue: yup
    .string()
    .required('Заполните поле')
    .when('contactMethod', ([contactMethod], schema) => {
      if (contactMethod === 'whatsapp') {
        return schema.matches(
          /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
          'Введите корректный номер телефона'
        );
      }
      if (contactMethod === 'telegram') {
        return schema.required('Введите Telegram ID');
      }
      return schema;
    }),
  message: yup.string().required('Сообщение обязательно для заполнения'),
});

export interface FormFieldContact {
  id: keyof FormData;
  label: string;
  placeholder: string;
  type: 'input' | 'textarea';
}

interface ContactFormProps {
  fields: FormFieldContact[];
}

export const ContactForm: React.FC<ContactFormProps> = ({ fields }) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);
    try {
      await api.contact.contactCreate({
        name: data.name,
        contact_data: data.contactValue,
        message: data.message,
        contact_preference: data.contactMethod,
        email: data.email,
      });
      handleSuccess(toast, 'Форма успешно отправлена');

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      handleError(toast, 'Ошибка при отправке формы');
    } finally {
      setTimeout(() => setIsSubmitting(false), 5000);
    }
  };

  const contactMethod = watch('contactMethod');

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex max-w-[544px] flex-col items-start gap-6"
    >
      {fields.map((field, index) => (
        <div key={index} className="flex w-full flex-col items-start gap-3">
          <label className="text-neutral-04100 text-xs font-bold leading-3 tracking-[0]">
            {field.label}
          </label>
          <FormInput
            type={field.type}
            placeholder={field.placeholder}
            error={errors[field.id]}
            register={register(field.id)}
          />
        </div>
      ))}

      <div className="flex w-full flex-col items-start gap-3">
        <label className="text-neutral-04100 text-xs font-bold leading-3 tracking-[0]">
          Способ связи
        </label>
        <Controller
          name="contactMethod"
          control={control}
          render={({ field }) => (
            <FormSelect
              options={[
                { value: 'whatsapp', label: 'WhatsApp' },
                { value: 'telegram', label: 'Telegram' },
              ]}
              placeholder="Выберите способ связи"
              error={errors.contactMethod}
              onChange={field.onChange}
              value={field.value}
            />
          )}
        />
      </div>

      <div className="flex w-full flex-col items-start gap-3">
        <label className="text-neutral-04100 text-xs font-bold leading-3 tracking-[0]">
          {contactMethod === 'whatsapp' ? 'Номер телефона' : 'Telegram ID'}
        </label>
        {contactMethod === 'whatsapp' ? (
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

      <Button
        type="submit"
        className="font-text h-[50px] rounded-lg bg-[#bf3a2b] px-10 py-1.5 text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
      </Button>
    </form>
  );
};
