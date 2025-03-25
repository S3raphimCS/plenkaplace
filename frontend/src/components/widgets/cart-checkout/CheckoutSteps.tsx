import React from 'react';

interface CheckoutStep {
  id: number;
  name: string;
  active: boolean;
}

interface CheckoutStepsProps {
  steps: CheckoutStep[];
  onStepClick: (step: number) => void;
}

export const CheckoutSteps: React.FC<CheckoutStepsProps> = ({
  steps,
  onStepClick,
}) => {
  return (
    <div className="flex items-start gap-8">
      {steps.map((step) => (
        <div
          key={step.id}
          className={`flex w-64 flex-col gap-6 px-0 pb-[26px] pt-0 ${step.active ? 'border-b-2' : ''} ${step.id === 3 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
          onClick={() => {
            if (step.id !== 3) {
              onStepClick(step.id);
            }
          }}
        >
          <div className="flex w-full items-center gap-[17px]">
            <div
              className={`flex items-center justify-center overflow-hidden rounded-[40px] px-[17px] py-2 ${step.active ? 'bg-[#BF3A2B]' : 'bg-[#B1B5C3]'}`}
            >
              <span className="text-center text-white">{step.id}</span>
            </div>
            <span
              className={`font-text ${step.active ? 'text-black' : 'text-[#7C8087]'}`}
            >
              {step.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
