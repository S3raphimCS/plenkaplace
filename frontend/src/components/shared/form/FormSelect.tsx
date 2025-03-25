import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shared/ui/select';
import { FieldError } from 'react-hook-form';

interface FormSelectProps {
  options: { value: string; label: string }[];
  placeholder: string;
  error?: FieldError;
  onChange: (value: string) => void;
  value: string;
}

export const FormSelect = ({
  options,
  placeholder,
  error,
  onChange,
  value,
}: FormSelectProps) => {
  return (
    <div className="w-full">
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="text-black">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
    </div>
  );
};
