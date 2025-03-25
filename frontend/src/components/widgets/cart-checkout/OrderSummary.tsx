export const OrderSummary: React.FC<{
  items: Array<{ label: string; value: string; isTotal?: boolean }>;
}> = ({ items }) => (
  <div className="flex flex-col items-start gap-6">
    {items.map((item, index) => (
      <div
        key={index}
        className={`flex w-full items-start px-0 py-[13px] ${!item.isTotal ? 'border-b' : ''}`}
      >
        <div className="flex w-full items-start justify-between">
          <div
            className={
              item.isTotal
                ? 'whitespace-nowrap text-xl font-medium leading-7'
                : 'whitespace-nowrap text-base font-normal'
            }
          >
            {item.label}
          </div>
          <div
            className={
              item.isTotal
                ? 'whitespace-nowrap text-right text-2xl'
                : 'font-text whitespace-nowrap text-right'
            }
          >
            {item.value}
          </div>
        </div>
      </div>
    ))}
  </div>
);
