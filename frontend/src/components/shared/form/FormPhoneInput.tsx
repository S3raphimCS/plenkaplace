import { ControllerRenderProps, FieldError } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';

interface FormPhoneInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, any>;
  error?: FieldError;
}

export const FormPhoneInput = ({ field, error }: FormPhoneInputProps) => {
  return (
    <div className="w-full">
      <PatternFormat
        {...field}
        format="+7 (###) ###-##-##"
        mask="_"
        placeholder="+7 (___) ___-__-__"
        className="border-black-300 text-neutral-04100 font-sub-text h-10 w-full rounded-md bg-white px-3 py-2"
      />
      {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
    </div>
  );
};
