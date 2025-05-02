import { PageWrapper } from '@/components/shared/PageWrapper';
import { HeaderBanner } from '@/components/widgets/banners';
import { paths } from '@/lib/paths';
import { Metadata } from 'next';
import { clubPageMetadata } from './seo';

export const generateMetadata = (): Metadata => clubPageMetadata;

export default function PlenkaClubPage() {
  return (
    <main className="my-6 flex flex-col gap-6">
      <HeaderBanner
        className="text-white"
        imageSrc="/source/catalog.png"
        title="Клуб Plenka Place"
        description="Скидки, тусовки и плёночная движуха!"
        imageClassName="brightness-50"
        breadcrumbs={[
          { href: paths.home, label: 'Главная', color: 'white' },
          { href: paths.club, label: 'Клуб Plenka Place', color: 'white' },
        ]}
      />
      <PageWrapper>
        <div className="flex flex-col gap-12 px-4 py-12 sm:px-10 lg:px-40">
          <section className="flex flex-col items-center gap-6 text-center">
            <h2 className="text-3xl font-bold">
              Клуб Plenka Place – это про скидки, тусовки и плёночную движуху!
            </h2>
            <p className="max-w-2xl text-lg text-gray-600">
              Добро пожаловать в сообщество, где плёночная фотография — это не
              просто хобби, а стиль жизни. Участвуй в клубе, лови крутые скидки,
              находи единомышленников и вдохновляйся!
            </p>
          </section>

          <section className="flex flex-col gap-8">
            <h3 className="text-2xl font-bold">Скидки для участников клуба</h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg bg-[#f8f8f8] p-6">
                <h4 className="mb-2 text-xl font-semibold">
                  Скидки на плёнку, камеры и проявку
                </h4>
                <p className="text-gray-600">Трать меньше – снимай больше!</p>
              </div>
              <div className="rounded-lg bg-[#f8f8f8] p-6">
                <h4 className="mb-2 text-xl font-semibold">
                  Коллаборации с модными местами
                </h4>
                <p className="text-gray-600">
                  Кофе дешевле, вход в бар по спеццене, а мерч по скидке.
                </p>
              </div>
              <div className="rounded-lg bg-[#f8f8f8] p-6">
                <h4 className="mb-2 text-xl font-semibold">Уникальные акции</h4>
                <p className="text-gray-600">
                  Например, Плёночный день в кафе – скидка на заказ + сюрприз
                  для участников клуба.
                </p>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-8">
            <h3 className="text-2xl font-bold">Полезная база знаний</h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg bg-[#f8f8f8] p-6">
                <h4 className="mb-2 text-xl font-semibold">
                  Как выбрать плёнку и камеру?
                </h4>
                <p className="text-gray-600">
                  Ломо, Cinestill, Kodak – разберёмся, что тебе подойдёт.
                </p>
              </div>
              <div className="rounded-lg bg-[#f8f8f8] p-6">
                <h4 className="mb-2 text-xl font-semibold">Инструкции</h4>
                <p className="text-gray-600">
                  Как заряжать плёнку, выставлять экспозицию, делать кадры,
                  чтобы не было обидно за плёнку.
                </p>
              </div>
              <div className="rounded-lg bg-[#f8f8f8] p-6">
                <h4 className="mb-2 text-xl font-semibold">Типичные ошибки</h4>
                <p className="text-gray-600">
                  Что делать, если кадры вышли тёмными, плёнка засветилась, а
                  сканы оказались мыльными.
                </p>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-8">
            <h3 className="text-2xl font-bold">Plenka рыночек</h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg bg-[#f8f8f8] p-6">
                <h4 className="mb-2 text-xl font-semibold">
                  Продай, купи или обменяй
                </h4>
                <p className="text-gray-600">
                  Плёнку, фотики, объективы и аксессуары.
                </p>
              </div>
              <div className="rounded-lg bg-[#f8f8f8] p-6">
                <h4 className="mb-2 text-xl font-semibold">Отдай и найди</h4>
                <p className="text-gray-600">
                  Иногда люди просто отдают ненужное, и ты можешь забрать
                  классную вещь бесплатно!
                </p>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-8">
            <h3 className="text-2xl font-bold">Афиша мероприятий</h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg bg-[#f8f8f8] p-6">
                <h4 className="mb-2 text-xl font-semibold">
                  Пленочные вечеринки
                </h4>
                <p className="text-gray-600">
                  Закрытые тусовки для тех, кто снимает на плёнку.
                </p>
              </div>
              <div className="rounded-lg bg-[#f8f8f8] p-6">
                <h4 className="mb-2 text-xl font-semibold">Плёночный квест</h4>
                <p className="text-gray-600">
                  Объединяем фотографию и игру. Участники получают задания:
                  снять загадочные места города, зафиксировать момент или
                  создать серию кадров в одном стиле.
                </p>
              </div>
              <div className="rounded-lg bg-[#f8f8f8] p-6">
                <h4 className="mb-2 text-xl font-semibold">
                  Ночная пленочная охота
                </h4>
                <p className="text-gray-600">
                  Гуляем по городу, снимаем неон, световые блики, людей в
                  клубах, атмосферу улиц.
                </p>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-8">
            <h3 className="text-2xl font-bold">Фото с историей</h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg bg-[#f8f8f8] p-6">
                <h4 className="mb-2 text-xl font-semibold">Архивные кадры</h4>
                <p className="text-gray-600">
                  Фотки из детства, плёнка 90-х, семейные альбомы.
                </p>
              </div>
              <div className="rounded-lg bg-[#f8f8f8] p-6">
                <h4 className="mb-2 text-xl font-semibold">
                  Современные истории
                </h4>
                <p className="text-gray-600">
                  Кадры из путешествий, знаковые моменты жизни.
                </p>
              </div>
              <div className="rounded-lg bg-[#f8f8f8] p-6">
                <h4 className="mb-2 text-xl font-semibold">
                  Голосование за лучшее фото месяца
                </h4>
                <p className="text-gray-600">
                  Делимся, голосуем, вдохновляемся.
                </p>
              </div>
            </div>
          </section>
        </div>
      </PageWrapper>
    </main>
  );
}
