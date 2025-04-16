import { PageWrapper } from '@/components/shared/PageWrapper';
import { ClubBanner, HeaderBanner } from '@/components/widgets/banners';
import {
  DevelopingAccordion,
  DevelopingTable,
  DevelopingDescriptionBlock,
} from '@/components/widgets/developing';
import { paths } from '@/lib/paths';
import { Metadata } from 'next';
import { printingPageMetadata } from './seo';

type ServiceTableData = {
  type: 'service' | 'header';
  service?: string;
  resolution?: string;
  description?: string;
  price?: string;
  headerText?: string;
};

export const generateMetadata = (): Metadata => printingPageMetadata;

export default function PrintingPage() {
  const printingData: ServiceTableData[] = [
    {
      type: 'service',
      service: 'Печать фотографий 10x15 см',
      resolution: '300 dpi',
      price: '10 руб/шт',
    },
    {
      type: 'service',
      service: 'Печать фотографий 15x20 см',
      resolution: '300 dpi',
      price: '20 руб/шт',
    },
    {
      type: 'service',
      service: 'Печать фотографий 20x30 см',
      resolution: '300 dpi',
      price: '30 руб/шт',
    },
  ];

  const includedInCost = [
    {
      description: 'Качественная печать на фотобумаге',
    },
    {
      description: 'Цветокоррекция (базовая)',
    },
    {
      description: 'Ламинация (по запросу)',
    },
  ];

  const additionalOptions = [
    { description: 'Ретушь фотографий', price: 'от 50 руб/шт' },
    { description: 'Печать на холсте', price: 'от 500 руб/шт' },
    { description: 'Оформление в рамку', price: 'от 200 руб/шт' },
  ];

  return (
    <main className="my-6 flex flex-col gap-6">
      <HeaderBanner
        className="text-white"
        imageSrc="/banner/catalog.png"
        title="Печать"
        description="Печать, которая сохраняет эмоции и делает их осязаемыми"
        imageClassName="brightness-50"
        breadcrumbs={[
          { href: paths.home, label: 'Главная', color: 'white' },
          { href: paths.printing, label: 'Печать', color: 'white' },
        ]}
      />

      <PageWrapper>
        <div className="flex flex-col gap-8">
          <DevelopingAccordion
            value="printing"
            imageSrc="/services/print.png"
            imageAlt="Печать фотографий"
            title="Печать фотографий"
          >
            <DevelopingTable data={printingData} showResolution />
            <DevelopingDescriptionBlock
              title="ВХОДИТ В СТОИМОСТЬ по всем тарифам:"
              items={includedInCost}
            />
            <DevelopingDescriptionBlock
              title="ДОПОЛНИТЕЛЬНО можно заказать:"
              items={additionalOptions}
            />
          </DevelopingAccordion>

          <DevelopingAccordion
            value="large-format-printing"
            imageSrc="/services/plotter.png"
            imageAlt="Широкоформатная печать"
            title="Широкоформатная печать"
          >
            <DevelopingTable
              data={[
                {
                  type: 'service',
                  service: 'Печать на холсте 60x90 см',
                  resolution: '300 dpi',
                  price: '1500 руб/шт',
                },
                {
                  type: 'service',
                  service: 'Печать на холсте 90x120 см',
                  resolution: '300 dpi',
                  price: '2500 руб/шт',
                },
              ]}
              showResolution
            />
            <DevelopingDescriptionBlock
              title="ВХОДИТ В СТОИМОСТЬ по всем тарифам:"
              items={[
                { description: 'Качественная печать на холсте' },
                { description: 'Цветокоррекция (базовая)' },
              ]}
            />
            <DevelopingDescriptionBlock
              title="ДОПОЛНИТЕЛЬНО можно заказать:"
              items={[
                {
                  description: 'Оформление в багетную рамку',
                  price: 'от 1000 руб',
                },
                { description: 'Ламинация', price: 'от 300 руб' },
              ]}
            />
          </DevelopingAccordion>
          <ClubBanner />
        </div>
      </PageWrapper>
    </main>
  );
}
