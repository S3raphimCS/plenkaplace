import { PageWrapper } from '@/components/shared/PageWrapper';
import { HeaderBanner } from '@/components/widgets/banners';
import { ClubBanner } from '@/components/widgets/banners/ClubBanner';
import { BlogGrid } from '@/components/widgets/blog/BlogGrid';
import { paths } from '@/lib/paths';
import { Metadata } from 'next';
import { blogPageMetadata } from './seo';

export const generateMetadata = (): Metadata => blogPageMetadata;

export default function BlogPage() {
  return (
    <main className="my-6 flex flex-col gap-6">
      <HeaderBanner
        className="text-white"
        imageSrc="/source/blog.png"
        title="Блог"
        description="Погружайся в мир фотоискусства вместе с нашими экспертами"
        imageClassName="brightness-50"
        breadcrumbs={[
          { href: paths.home, label: 'Главная', color: 'white' },
          { href: paths.blog, label: 'Блог', color: 'white' },
        ]}
      />
      <PageWrapper>
        <BlogGrid />
        <ClubBanner />
      </PageWrapper>
    </main>
  );
}
