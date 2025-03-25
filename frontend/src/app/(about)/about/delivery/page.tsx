import { PageWrapper } from '@/components/shared/PageWrapper';
import { HeaderBanner } from '@/components/widgets/banners';
import { DeliveryAccordion } from '@/components/widgets/delivery/DeliveryAccordion';
import { DeliveryInfoCard } from '@/components/widgets/delivery/DeliveryInfoCard';
import { PaymentInfoCard } from '@/components/widgets/delivery/PaymentInfoCard';
import { paths } from '@/lib/paths';
import { Metadata } from 'next';
import { deliveryPageMetadata } from './seo';

export const generateMetadata = (): Metadata => deliveryPageMetadata;

export default function DeliveryPage() {
  return (
    <main className="my-4 flex flex-col gap-4 md:my-6 md:gap-6">
      <HeaderBanner
        className="text-white"
        imageSrc="/banner/catalog.png"
        title="Доставка"
        description="Не спрашивай, зачем унылой думой..."
        imageClassName="brightness-50"
        breadcrumbs={[
          { href: paths.home, label: 'Главная', color: 'white' },
          { href: paths.delivery, label: 'Доставка', color: 'white' },
        ]}
      />

      <PageWrapper>
        <div className="flex flex-col gap-6 md:gap-8">
          <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">
            Доставка и оплата
          </h1>
          <DeliveryInfoCard />
          <DeliveryAccordion />
          <PaymentInfoCard />
        </div>
      </PageWrapper>
    </main>
  );
}
