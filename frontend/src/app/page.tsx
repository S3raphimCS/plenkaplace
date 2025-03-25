import { PageWrapper } from '@/components/shared/PageWrapper';
import { ClubBanner, MainBanner } from '@/components/widgets/banners';
import { BlogSection } from '@/components/widgets/blog';
import { CatalogGridSection, FeaturesWidget } from '@/components/widgets/main';
import { NewProductsWidget } from '@/components/widgets/product';
import { ReviewsSection } from '@/components/widgets/reviews-section';

export default function Home() {
  return (
    <main className="mb-6 flex flex-col gap-12">
      <MainBanner imageSrc={'/banner/main_banner.png'} />
      <PageWrapper>
        <CatalogGridSection />
        <NewProductsWidget />
        <FeaturesWidget />
        <ClubBanner />
        <ReviewsSection />
      </PageWrapper>
      {/* <PurchaseBanner /> */}
      <PageWrapper className="min-h-screen md:min-h-full">
        <BlogSection />
      </PageWrapper>
    </main>
  );
}
