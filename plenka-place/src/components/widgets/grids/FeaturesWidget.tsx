import { MdOutlineLocalShipping } from 'react-icons/md';
import { IoLockClosedOutline } from 'react-icons/io5';
import { GiReturnArrow } from 'react-icons/gi';
import { IoCallOutline } from 'react-icons/io5';

export const FeaturesWidget = () => {
  return (
    <div className="flex flex-wrap items-start justify-start gap-6 bg-[#fff0e0] px-6 py-6 lg:px-40">
      <div className="inline-flex h-[320px] w-full flex-col items-start justify-between gap-[17px] bg-[#f5a300]/20 pb-12 pl-5 pr-[19px] pt-[47px] sm:w-[48%] md:w-[48%] lg:w-[23%]">
        <div className="relative">
          <MdOutlineLocalShipping size={48} className="text-[#141718]" />
        </div>
        <div className="inline-flex h-[52px] flex-col items-start justify-start gap-2 self-stretch">
          <div className="text-lg font-medium text-[#100e15]">
            Бесплатная доставка
          </div>
          <div className="self-stretch text-sm font-normal leading-normal text-[#6c7174]">
            Если заказ более 5000 руб.
          </div>
        </div>
      </div>

      <div className="inline-flex h-[320px] w-full flex-col items-start justify-between gap-4 bg-[#f5a300]/20 px-8 py-12 sm:w-[48%] md:w-[48%] lg:w-[23%]">
        <div className="relative h-12 w-12 overflow-hidden">
          <GiReturnArrow size={48} className="text-[#141718]" />
        </div>
        <div className="flex flex-col items-start justify-start gap-2">
          <div className="w-[101px] text-lg font-medium text-[#100e15]">
            Возврат
          </div>
          <div className="w-[198px] text-sm font-normal leading-normal text-[#6c7174]">
            14 дней гарантии
          </div>
        </div>
      </div>

      <div className="inline-flex h-[320px] w-full flex-col items-start justify-between gap-4 bg-[#f5a300]/20 px-8 py-12 sm:w-[48%] md:w-[48%] lg:w-[23%]">
        <div className="relative">
          <IoLockClosedOutline size={48} className="text-[#141718]" />
        </div>
        <div className="flex flex-col items-start justify-start gap-2">
          <div className="text-lg font-medium text-[#100e15]">
            Надёжные платежи
          </div>
          <div className="w-[198px] text-sm font-normal leading-normal text-[#6c7174]">
            Lorem...
          </div>
        </div>
      </div>

      <div className="inline-flex h-[320px] w-full flex-col items-start justify-between gap-4 bg-[#f5a300]/20 px-8 py-12 sm:w-[48%] md:w-[48%] lg:w-[23%]">
        <div className="relative">
          <IoCallOutline size={48} className="text-[#141718]" />
        </div>
        <div className="flex flex-col items-start justify-start gap-2">
          <div className="text-lg font-medium text-[#100e15]">
            Поддержка 24/7
          </div>
          <div className="w-[198px] text-sm font-normal leading-normal text-[#6c7174]">
            Свяжитесь с нами если что-то пошло не так
          </div>
        </div>
      </div>
    </div>
  );
};
