export const OrderSummary: React.FC<{
  items: Array<{ label: string; value: string; isTotal?: boolean }>;
}> = ({ items }) => (
  <div className="flex flex-col items-start gap-4 sm:gap-6">
    {items.map((item, index) => (
      <div
        key={index}
        className={`flex w-full items-start px-0 py-[10px] sm:py-[13px] ${!item.isTotal ? 'border-b' : ''} `}
      >
        <div className="flex w-full items-start justify-between">
          <div
            className={
              item.isTotal
                ? 'whitespace-nowrap text-lg font-medium leading-6 sm:text-xl sm:leading-7'
                : 'whitespace-nowrap text-sm font-normal sm:text-base'
            }
          >
            {item.label}
          </div>
          <div
            className={
              item.isTotal
                ? 'whitespace-nowrap text-right text-xl sm:text-2xl'
                : 'font-text whitespace-nowrap text-right text-sm sm:text-base'
            }
          >
            {item.value}
          </div>
        </div>
      </div>
    ))}
  </div>
);
