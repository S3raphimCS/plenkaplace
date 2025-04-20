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
    <div className="flex w-full flex-col items-start gap-4 sm:w-auto sm:flex-row sm:gap-8">
      {steps.map((step) => (
        <div
          key={step.id}
          className={`flex w-full flex-col gap-4 px-0 pb-4 pt-0 sm:w-64 sm:gap-6 sm:pb-[26px] ${
            step.active ? 'border-b-2 border-[#BF3A2B] sm:border-b-2' : ''
          } ${
            step.id === 3 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
          }`}
          onClick={() => {
            if (step.id !== 3) {
              onStepClick(step.id);
            }
          }}
        >
          <div className="flex w-full items-center gap-3 sm:gap-[17px]">
            <div
              className={`flex items-center justify-center rounded-full px-4 py-2 sm:px-[17px] sm:py-2 ${
                step.active ? 'bg-[#BF3A2B]' : 'bg-[#B1B5C3]'
              }`}
            >
              <span className="text-sm text-white">{step.id}</span>
            </div>
            <span
              className={`text-sm font-medium ${
                step.active ? 'text-black' : 'text-[#7C8087]'
              }`}
            >
              {step.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
