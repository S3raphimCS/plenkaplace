'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const sortOptions = [
  { label: 'Цена: по возрастанию', value: 'price' },
  { label: 'Цена: по убыванию', value: '-price' },
  { label: 'Название: А—Я', value: 'title' },
  { label: 'Название: Я—А', value: '-title' },
  { label: 'Порядок: сперва новые', value: '-created_at' },
  { label: 'Порядок: сперва старые', value: 'created_at' },
];

interface SortDropdownProps {
  onSortChange: (sort: string) => void;
  selectedSort: string;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({
  onSortChange,
  selectedSort,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative z-30 inline-block">
      <button
        className="flex items-center gap-2 rounded-md border px-4 py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {sortOptions.find((o) => o.value === selectedSort)?.label ||
          'Сортировка'}
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <ul className="absolute right-0 mt-2 rounded-md border bg-white shadow-lg">
          {sortOptions.map((option) => (
            <li key={option.value}>
              <button
                className={`block w-full px-4 py-2 text-left ${
                  selectedSort === option.value ? 'bg-gray-200' : ''
                }`}
                onClick={() => {
                  onSortChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
