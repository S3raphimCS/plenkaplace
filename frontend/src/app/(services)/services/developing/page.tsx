import { PageWrapper } from '@/components/shared/PageWrapper';
import { ClubBanner, HeaderBanner } from '@/components/widgets/banners';
import {
  DevelopingAccordion,
  DevelopingTable,
} from '@/components/widgets/developing';
import { paths } from '@/lib/paths';
import { Metadata } from 'next';
import { developingPageMetadata } from './seo';

export const generateMetadata = (): Metadata => developingPageMetadata;

export default function DevelopingPage() {
  const developAndScanData: {
    type: 'header' | 'service';
    service?: string;
    resolution?: string;
    price?: string;
    headerText?: string;
  }[] = [
    {
      type: 'header',
      headerText: '35MM FUJI FRONTIER SP-500',
    },
    {
      type: 'service',
      service: 'ЧБ',
      resolution: '2400x3600',
      price: '600 ₽ EXPRESS 1 200 ₽',
    },
    {
      type: 'service',
      service: 'C-41',
      resolution: '2400x3600',
      price: '600 ₽ EXPRESS 1 200 ₽',
    },
    {
      type: 'service',
      service: 'ECN-II',
      resolution: '2400x3600',
      price: '600 ₽ EXPRESS 1 200 ₽',
    },
    {
      type: 'service',
      service: 'E-6',
      resolution: '2400x3600',
      price: '900 ₽',
    },
    {
      type: 'service',
      service: 'FILM SOUP',
      resolution: '2400x3600',
      price: '700 ₽',
    },
    {
      type: 'header',
      headerText: '120 тип AGFASCAN T5000',
    },
    {
      type: 'service',
      service: 'ЧБ',
      resolution: '5000x5000',
      price: '750 ₽ EXPRESS 1 500 ₽',
    },
    {
      type: 'service',
      service: 'C-41',
      resolution: '5000x5000',
      price: '750 ₽ EXPRESS 1 500 ₽',
    },
    {
      type: 'service',
      service: 'ECN-II',
      resolution: '5000x5000',
      price: '750 ₽ EXPRESS 1 500 ₽',
    },
    {
      type: 'service',
      service: 'E-6',
      resolution: '5000x5000',
      price: '900 ₽',
    },
  ];
  const developOnlyData: {
    type: 'header' | 'service';
    service?: string;
    resolution?: string;
    price?: string;
    headerText?: string;
  }[] = [
    {
      type: 'header',
      headerText: '35MM',
    },
    {
      type: 'service',
      service: 'ЧБ',
      price: '300 ₽',
    },
    {
      type: 'service',
      service: 'C-41',
      price: '300 ₽',
    },
    {
      type: 'service',
      service: 'ECN-II',
      price: '350 ₽',
    },
    {
      type: 'service',
      service: 'E-6',
      price: '800 ₽',
    },
  ];
  const scanOnlyData: {
    type: 'header' | 'service';
    service?: string;
    resolution?: string;
    price?: string;
    headerText?: string;
  }[] = [
    {
      type: 'header',
      headerText: '35MM nikon coolscan',
    },
    {
      type: 'service',
      service: 'СКАНИРОВАНИЕ ПЛЕНКИ',
      price: '300 ₽',
    },
    {
      type: 'service',
      service: 'БЕЗГРАНИЧНОЕ СКАНИРОВАНИЕ',
      price: '500 ₽',
    },
    {
      type: 'service',
      service: 'ПОКАДРОВОЕ СКАНИРОВАНИЕ',
      price: '50 ₽',
    },
  ];

  return (
    <main className="my-6 flex flex-col gap-6">
      <HeaderBanner
        className="text-white"
        imageSrc="/banner/catalog.png"
        title="Проявка и оцифровка плёнки"
        description="Не спрашивай, зачем унылой думой..."
        imageClassName="brightness-50"
        breadcrumbs={[
          { href: paths.home, label: 'Главная', color: 'white' },
          { href: paths.development, label: 'Проявка плёнки', color: 'white' },
        ]}
      />

      <PageWrapper>
        <div className="flex flex-col gap-8">
          <DevelopingAccordion
            value="develop-and-scan"
            imageSrc="/services/scan.png"
            imageAlt="Проявка + Скан"
            title="Проявка + Скан"
          >
            <DevelopingTable data={developAndScanData} showResolution />
          </DevelopingAccordion>

          <DevelopingAccordion
            value="develop-only"
            imageSrc="/services/film.png"
            imageAlt="Только проявка"
            title="Только проявка"
          >
            <DevelopingTable data={developOnlyData} showDescription />
          </DevelopingAccordion>

          <DevelopingAccordion
            value="scan-only"
            imageSrc="/services/scan-second.png"
            imageAlt="Только сканирование"
            title="Только сканирование"
          >
            <DevelopingTable data={scanOnlyData} showDescription />
          </DevelopingAccordion>
          <ClubBanner />
        </div>
      </PageWrapper>
    </main>
  );
}
