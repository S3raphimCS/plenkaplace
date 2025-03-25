import { Input } from '@/components/shared/ui/input';
import { Textarea } from '@/components/shared/ui/textarea';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface FormInputProps {
  type: 'input' | 'textarea' | 'email';
  placeholder: string;
  error?: FieldError;
  className?: string;
  register: UseFormRegisterReturn;
}

export const FormInput = ({
  type,
  placeholder,
  error,
  className,
  register,
}: FormInputProps) => {
  return (
    <div className="w-full">
      {type === 'input' || 'email' ? (
        <Input
          {...register}
          placeholder={placeholder}
          className={`border-black-300 text-neutral-04100 font-sub-text h-10 bg-white ${className}`}
        />
      ) : (
        <Textarea
          {...register}
          placeholder={placeholder}
          className={`border-black-300 text-neutral-04100 font-sub-text h-[140px] bg-white ${className}`}
        />
      )}
      {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
    </div>
  );
};
