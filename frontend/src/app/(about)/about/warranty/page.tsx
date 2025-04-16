import { PageWrapper } from '@/components/shared/PageWrapper';
import { paths } from '@/lib/paths';
import { WarrantyInfo } from '@/components/widgets/warranty/WarrantyInfo';
import { ClubBanner } from '@/components/widgets/banners/ClubBanner';
import { HeaderBanner } from '@/components/widgets/banners';
import { Metadata } from 'next';
import { warrantyPageMetadata } from './seo';

export const generateMetadata = (): Metadata => warrantyPageMetadata;

export default function WarrantyPage() {
  return (
    <main className="my-4 flex flex-col gap-4 md:my-6 md:gap-6">
      <HeaderBanner
        className="text-white"
        imageSrc="/banner/catalog.png"
        title="Гарантии"
        description="Ваше доверие — наша главная ценность и обязательство"
        imageClassName="brightness-50"
        breadcrumbs={[
          { href: paths.home, label: 'Главная', color: 'white' },
          { href: paths.warranty, label: 'Гарантии', color: 'white' },
        ]}
      />

      <PageWrapper>
        <div className="my-4 flex flex-col gap-4 md:my-6 md:gap-6">
          <WarrantyInfo />
          <ClubBanner />
        </div>
      </PageWrapper>
    </main>
  );
}
