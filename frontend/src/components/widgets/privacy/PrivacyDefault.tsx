import { paths } from '@/lib/paths';
import Link from 'next/link';

export const PrivacyDefault: React.FC = () => {
  return (
    <div className="my-4 flex flex-col gap-8">
      <h1 className="text-4xl font-bold">Политика конфиденциальности</h1>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">1. Введение</h2>
        <p className="text-neutral-700">
          Настоящая Политика конфиденциальности описывает, как мы собираем,
          используем и защищаем вашу личную информацию при использовании нашего
          сайта и услуг. Мы стремимся обеспечить защиту ваших данных и
          соблюдение ваших прав на конфиденциальность.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">2. Какие данные мы собираем</h2>
        <p className="text-neutral-700">
          Мы можем собирать следующие типы данных:
        </p>
        <ul className="list-disc pl-6 text-neutral-700">
          <li>
            Личная информация: имя, адрес электронной почты, номер телефона.
          </li>
          <li>
            Информация о платежах: данные банковской карты или другие платежные
            реквизиты.
          </li>
          <li>
            Технические данные: IP-адрес, тип браузера, данные об устройстве.
          </li>
          <li>
            Данные об использовании: информация о том, как вы используете наш
            сайт и услуги.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">
          3. Как мы используем ваши данные
        </h2>
        <p className="text-neutral-700">
          Мы используем ваши данные для следующих целей:
        </p>
        <ul className="list-disc pl-6 text-neutral-700">
          <li>Предоставление и улучшение наших услуг.</li>
          <li>Обработка заказов и платежей.</li>
          <li>Коммуникация с вами, включая ответы на запросы и уведомления.</li>
          <li>
            Анализ использования сайта для улучшения его функциональности.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">4. Защита данных</h2>
        <p className="text-neutral-700">
          Мы принимаем все необходимые меры для защиты ваших данных от
          несанкционированного доступа, изменения, раскрытия или уничтожения.
          Это включает использование шифрования, регулярное тестирование наших
          систем и обучение сотрудников.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">
          5. Передача данных третьим лицам
        </h2>
        <p className="text-neutral-700">
          Мы не передаем ваши данные третьим лицам, за исключением случаев,
          когда это необходимо для предоставления услуг (например, платежные
          системы) или требуется по закону.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">6. Ваши права</h2>
        <p className="text-neutral-700">Вы имеете право:</p>
        <ul className="list-disc pl-6 text-neutral-700">
          <li>Запросить доступ к вашим личным данным.</li>
          <li>Исправить неточные или неполные данные.</li>
          <li>
            Удалить ваши данные, если они больше не нужны для целей, для которых
            были собраны.
          </li>
          <li>Ограничить или возразить против обработки ваших данных.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">7. Изменения в политике</h2>
        <p className="text-neutral-700">
          Мы можем обновлять нашу Политику конфиденциальности время от времени.
          Любые изменения будут опубликованы на этой странице, и, если это
          необходимо, мы уведомим вас по электронной почте.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">8. Контакты</h2>
        <p className="text-neutral-700">
          Если у вас есть вопросы или замечания по поводу нашей Политики
          конфиденциальности, пожалуйста, свяжитесь с нами:
        </p>
        <ul className="list-disc pl-6 text-neutral-700">
          <Link href={paths.email}>
            <li className="hover:text-blue-500">
              Электронная почта: {paths.email.split('mailto:')}
            </li>
          </Link>
          <Link href={paths.telephone}>
            <li className="hover:text-red-400">
              Телефон: {paths.telephone.split('tel:')}
            </li>
          </Link>
          <li>Адрес: г. Владивосток, ул. Гоголя 19</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">9. Куки-политика</h2>
        <p className="text-neutral-700">
          Мы используем файлы cookie для улучшения вашего опыта на нашем сайте.
          Файлы cookie — это небольшие текстовые файлы, которые хранятся на
          вашем устройстве и помогают нам анализировать использование сайта, а
          также предоставлять персонализированные услуги.
        </p>
        <p className="text-neutral-700">
          Мы используем следующие типы файлов cookie:
        </p>
        <ul className="list-disc pl-6 text-neutral-700">
          <li>
            <strong>Необходимые файлы cookie</strong>: для обеспечения работы
            сайта и доступа к его функциям.
          </li>
          <li>
            <strong>Функциональные файлы cookie</strong>: для сохранения ваших
            предпочтений и настроек.
          </li>
          <li>
            <strong>Аналитические файлы cookie</strong>: для сбора данных об
            использовании сайта и улучшения его функциональности.
          </li>
          <li>
            <strong>Рекламные файлы cookie</strong>: для показа
            персонализированной рекламы.
          </li>
        </ul>
        <p className="text-neutral-700">
          Вы можете управлять файлами cookie через настройки вашего браузера.
          Если вы откажетесь от использования файлов cookie, некоторые функции
          сайта могут не работать корректно.
        </p>
      </section>
    </div>
  );
};
