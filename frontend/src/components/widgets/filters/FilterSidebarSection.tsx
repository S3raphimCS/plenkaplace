'use client';

import { useState } from 'react';
import { Checkbox } from '@/components/shared/ui/checkbox';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/shared/ui/accordion';
import { Button } from '@/components/shared/ui/button';
import { Check, FilterIcon } from 'lucide-react';
import { Brand } from '@/lib/api';

export interface FilterOption {
  label: string;
  value?: { min: number; max: number };
}

export interface FilterSection {
  title: string;
  type: 'characteristics' | 'price' | 'brand';
  items: string[] | FilterOption[] | Brand[];
}

interface FilterSidebarSectionProps {
  isPreorderOnly: boolean;
  sections: FilterSection[];
  selectedBrands: number[];
  onResetFilters: () => void;
  onPreorderChange: (checked: boolean) => void;
  onFilterChange?: (type: string, value: { min: number; max: number }) => void;
  onBrandFilterChange: (brands: number[]) => void;
}

export const FilterSidebarSection: React.FC<FilterSidebarSectionProps> = ({
  isPreorderOnly,
  sections,
  selectedBrands,
  onResetFilters,
  onPreorderChange,
  onFilterChange,
  onBrandFilterChange,
}) => {
  const [selectedCharacteristics, setSelectedCharacteristics] = useState<
    string[]
  >([]);
  const [selectedPrice, setSelectedPrice] = useState<{
    min: number;
    max: number;
  } | null>(null);

  const handleCheckboxChange = (sectionType: string, option: FilterOption) => {
    if (sectionType === 'price' && option.value) {
      setSelectedPrice(option.value);
      onFilterChange?.(sectionType, option.value);
    }
  };

  const handleBrandChange = (brandId: number) => {
    const updatedBrands = selectedBrands.includes(brandId)
      ? selectedBrands.filter((id) => id !== brandId)
      : [...selectedBrands, brandId];

    onBrandFilterChange(updatedBrands);
  };

  const handleCharacteristicChange = (characteristic: string) => {
    setSelectedCharacteristics((prev) =>
      prev.includes(characteristic)
        ? prev.filter((item) => item !== characteristic)
        : [...prev, characteristic]
    );
  };

  return (
    <div className="sticky top-8 flex flex-col gap-8">
      <header className="flex items-center gap-2">
        <FilterIcon className="h-6 w-6" />
        <h2 className="font-text text-black-900">Фильтрация</h2>
      </header>

      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <Checkbox
            id="preorder"
            checked={isPreorderOnly}
            className="bg-neutrals-8 border-neutral-04100 h-6 w-6 rounded border-[1.5px]"
            onCheckedChange={(checked) => onPreorderChange(Boolean(checked))}
          />
          <label
            htmlFor="preorder"
            className="font-sub-text text-black-500 whitespace-nowrap"
          >
            Под заказ
          </label>
        </div>
        {sections.map((section, sectionIndex) => (
          <Accordion
            key={sectionIndex}
            type="single"
            collapsible
            defaultValue={section.type}
            className="w-full"
          >
            <AccordionItem value={section.type} className="border-none">
              <AccordionTrigger className="py-0 hover:no-underline">
                <span className="font-text text-black-900">
                  {section.title}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                {section.type === 'brand' ? (
                  <div className="flex flex-col gap-3 py-2">
                    {(section.items as Brand[]).map((brand) => (
                      <div key={brand.id} className="flex items-center gap-2">
                        <Checkbox
                          id={`brand-${brand.id}`}
                          checked={selectedBrands.includes(brand.id!)}
                          className="bg-neutrals-8 border-neutral-04100 h-6 w-6 rounded border-[1.5px]"
                          onCheckedChange={() => handleBrandChange(brand.id!)}
                        />
                        <span className="font-sub-text text-black-500 whitespace-nowrap">
                          {brand.title}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : section.type === 'characteristics' ? (
                  <div className="flex flex-col gap-3 py-2">
                    {(section.items as string[]).map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Checkbox
                          id={`${section.type}-${index}`}
                          checked={selectedCharacteristics.includes(item)}
                          className="bg-neutrals-8 border-neutral-04100 h-6 w-6 rounded border-[1.5px]"
                          onCheckedChange={() =>
                            handleCharacteristicChange(item)
                          }
                        />
                        <span className="font-sub-text text-black-500 whitespace-nowrap">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 py-2">
                    {(section.items as FilterOption[]).map((option, index) => (
                      <div
                        key={index}
                        className="flex w-full items-center justify-between"
                      >
                        <span
                          className={`$ { index === 0 ? 'font-sub-text text-[#6c7174]' : 'font-text-14px-semibold text-black-500' } whitespace-nowrap`}
                        >
                          {option.label}
                        </span>
                        <div className="relative">
                          <Checkbox
                            id={`${section.type}-${index}`}
                            checked={
                              selectedPrice?.min === option.value?.min &&
                              selectedPrice?.max === option.value?.max
                            }
                            className={`h-6 w-6 rounded ${selectedPrice?.min === option.value?.min && selectedPrice?.max === option.value?.max ? 'bg-neutral-07100' : 'bg-neutrals-8 border-neutral-04100 border-[1.5px]'}`}
                            onCheckedChange={() =>
                              handleCheckboxChange(section.type, option)
                            }
                          />
                          {selectedPrice?.min === option.value?.min &&
                            selectedPrice?.max === option.value?.max && (
                              <Check className="absolute left-0 top-0 h-6 w-6 text-white" />
                            )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>

      <Button
        className="rounded-[10px] px-4 py-2 text-white"
        onClick={onResetFilters}
      >
        Сбросить фильтры
      </Button>
    </div>
  );
};
