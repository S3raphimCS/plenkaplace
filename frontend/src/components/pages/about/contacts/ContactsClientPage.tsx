'use client';
import { PageWrapper } from '@/components/shared/PageWrapper';
import { ContactSection } from '@/components/widgets/contacts/ContactSection';
import { ContactsBreadcrumb } from '@/components/widgets/contacts/ContactsBreadcrumb';
import { ContactsFeatureSection } from '@/components/widgets/contacts/ContactsFeatureSection';
import { FeaturesWidget } from '@/components/widgets/main';

export default function ContactsClientPage() {
  return (
    <main className="my-6 flex flex-col">
      <PageWrapper>
        <ContactsBreadcrumb />
        <div className="mt-6 flex flex-col items-start gap-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl">
            PlenkaPlace — мир винтажной фотографии
          </h1>
          <p className="text-lg">
            Добро пожаловать в PlenkaPlace — уникальный магазин, где оживает
            история фотографии! Мы предлагаем широкий выбор винтажных
            фотоаппаратов, плёнок и аксессуаров, которые помогут вам создавать
            снимки с неповторимым шармом и атмосферой прошлого.
          </p>
          <p className="text-lg">
            Наш магазин — это не просто место для покупок, а настоящий рай для
            любителей аналоговой фотографии. Мы тщательно отбираем каждый товар,
            чтобы предложить вам только качественные и проверенные временем
            камеры, такие как легендарные Zenit, Canon AE-1, Nikon FM2 и многие
            другие. Ассортимент плёнки включает как классические чёрно-белые,
            так и цветные варианты, чтобы вы могли экспериментировать и находить
            свой уникальный стиль.
          </p>
          <p className="text-lg">
            PlenkaPlace — это место, где встречаются прошлое и настоящее. Мы не
            только продаём оборудование, но и делимся знаниями: проводим
            мастер-классы, рассказываем о тонкостях аналоговой съёмки и помогаем
            каждому клиенту найти именно то, что вдохновит на создание шедевров.
          </p>
        </div>
        <ContactsFeatureSection
          aboutText={
            'PlenkaPlace — это больше, чем магазин. Это сообщество энтузиастов, которые ценят аутентичность и красоту аналоговой фотографии. Присоединяйтесь к нам и откройте для себя магию плёнки!'
          }
          imageSrc={'/contact/contact.png'}
          imageAlt={'Винтажные фотоаппараты и плёнка'}
        />
        <ContactSection />
        <FeaturesWidget />
      </PageWrapper>
    </main>
  );
}
