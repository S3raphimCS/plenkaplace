'use client';
import { PageWrapper } from '@/components/shared/PageWrapper';
import { MultiStepCheckout } from '@/components/widgets/cart-checkout/steps/MultiStepCheckout';

export default function CartCheckoutClientPage() {
  return (
    <main className="my-8 flex flex-col gap-6">
      <PageWrapper>
        <MultiStepCheckout />
      </PageWrapper>
    </main>
  );
}
