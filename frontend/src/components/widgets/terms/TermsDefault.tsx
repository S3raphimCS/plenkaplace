import { paths } from '@/lib/paths';
import Link from 'next/link';

export const TermsDefault: React.FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl font-bold">Пользовательское соглашение</h1>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">1. Общие положения</h2>
        <p className="text-neutral-700">
          Настоящее Пользовательское соглашение (далее — «Соглашение»)
          регулирует отношения между вами (пользователем) и нашей компанией
          (далее — «Мы» или «Компания») в связи с использованием нашего сайта и
          услуг.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">2. Условия использования</h2>
        <p className="text-neutral-700">
          Используя наш сайт, вы соглашаетесь с условиями настоящего Соглашения.
          Если вы не согласны с этими условиями, пожалуйста, не используйте наш
          сайт.
        </p>
        <ul className="list-disc pl-6 text-neutral-700">
          <li>Вы обязуетесь использовать сайт только в законных целях.</li>
          <li>
            Запрещается размещать незаконный, оскорбительный или вредоносный
            контент.
          </li>
          <li>
            Мы оставляем за собой право блокировать доступ к сайту в случае
            нарушения условий Соглашения.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">
          3. Интеллектуальная собственность
        </h2>
        <p className="text-neutral-700">
          Все материалы, размещенные на сайте, включая тексты, изображения,
          логотипы и программный код, являются собственностью Компании или
          используются с разрешения правообладателей.
        </p>
        <p className="text-neutral-700">
          Запрещается копирование, распространение или использование материалов
          сайта без письменного разрешения Компании.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">
          4. Ограничение ответственности
        </h2>
        <p className="text-neutral-700">Мы не несем ответственности за:</p>
        <ul className="list-disc pl-6 text-neutral-700">
          <li>
            Любые убытки, возникшие в результате использования или невозможности
            использования сайта.
          </li>
          <li>
            Действия третьих лиц, включая взлом или несанкционированный доступ к
            данным.
          </li>
          <li>
            Точность, полноту или актуальность информации, предоставленной на
            сайте.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">5. Изменения в соглашении</h2>
        <p className="text-neutral-700">
          Мы оставляем за собой право вносить изменения в настоящее Соглашение.
          Все изменения вступают в силу с момента их публикации на сайте.
          Рекомендуем периодически проверять Соглашение на наличие обновлений.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">6. Контакты</h2>
        <p className="text-neutral-700">
          Если у вас есть вопросы или замечания по поводу настоящего Соглашения,
          пожалуйста, свяжитесь с нами:
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
    </div>
  );
};
