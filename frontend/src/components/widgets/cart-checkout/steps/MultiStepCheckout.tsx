'use client';
import { useState } from 'react';
import { CartCheckoutFirst } from './CartCheckoutFirst';
import { CartCheckoutSecond } from './CartCheckoutSecond';
import { CartCheckoutFinal } from './CartCheckoutFinal';
import { CheckoutSteps } from '../CheckoutSteps';

export const MultiStepCheckout: React.FC = () => {
  const [step, setStep] = useState(1);

  const steps = [
    { id: 1, name: 'Корзина', active: step === 1 },
    { id: 2, name: 'Оформление заказа', active: step === 2 },
    { id: 3, name: 'Оплата', active: step === 3 },
  ];

  return (
    <div className="flex flex-col items-center">
      <CheckoutSteps steps={steps} onStepClick={setStep} />

      {step === 1 && <CartCheckoutFirst setStep={setStep} />}
      {step === 2 && <CartCheckoutSecond setStep={setStep} />}
      {step === 3 && <CartCheckoutFinal />}
    </div>
  );
};
