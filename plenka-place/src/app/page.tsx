import { PageWrapper } from '@/components/shared/PageWrapper';
import { FeaturesWidget } from '@/components/widgets';
import { AdBanner } from '@/components/widgets/banners/AdBanner';
import { MainBanner } from '@/components/widgets/banners/MainBanner';
import PurchaseBanner from '@/components/widgets/banners/PurchaseBanner';
import { BlogSection } from '@/components/widgets/blog-section/BlogSections';
import { NewProductsWidget } from '@/components/widgets/carousel/NewProductsWidget';
import { ProductSection } from '@/components/widgets/grids/ProductSection';
import { ReviewsSection } from '@/components/widgets/reviews-section/ReviewsSection';

export default function Home() {
  return (
    <main className="mb-6 flex flex-col gap-12">
      <MainBanner imageSrc={'/banner/main_banner.png'} />
      <PageWrapper>
        <ProductSection />
        <NewProductsWidget />
        <FeaturesWidget />
        <AdBanner
          title={'Вступай в клуб Plenka Place'}
          badgeText={'Подробнее'}
          bgColor="#bf3a2b"
          imageSrc={'/grid/camera.png'}
          mobileImageSrc={'/grid/camera.png'}
        />
        <ReviewsSection />
      </PageWrapper>
      <PurchaseBanner />
      <PageWrapper>
        <BlogSection />
      </PageWrapper>
    </main>
  );
}
