'use client';
import { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/shared/ui/accordion';
import { paths } from '@/lib/paths';
import Link from 'next/link';
import { Api, DeliveryMethod } from '@/lib/api';
import { Skeleton } from '@/components/shared/ui/skeleton';

const api = new Api();

export const DeliveryAccordion = () => {
  const [deliveryMethods, setDeliveryMethods] = useState<DeliveryMethod[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeliveryMethods = async () => {
      try {
        const response = await api.shop.shopDeliveryMethodsList();
        setDeliveryMethods(response.data.results);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveryMethods();
  }, []);

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="delivery">
        <AccordionTrigger className="text-lg font-medium">
          Информация о доставке
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            ) : (
              <ul className="list-disc space-y-2 pl-6">
                {deliveryMethods.map((method) => (
                  <li key={method.id}>
                    <strong>{method.title}</strong> - {method.description}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="warranty">
        <AccordionTrigger className="text-lg font-medium">
          Гарантия
        </AccordionTrigger>
        <AccordionContent>
          <p className="text-sm text-gray-700">
            Мы предоставляем гарантию на 14 дней. В случае выявления
            неисправности производим замену на аналогичную модель или
            осуществляем возврат заказа, на усмотрение покупателя. Открыть более
            подробную информацию.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="additional-info">
        <AccordionTrigger className="text-lg font-medium">
          Дополнительная информация
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              По любым вопросам вы можете связаться с нами в Telegram, WhatsApp,
              через почту или с помощью чата, прямо на сайте.
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <Link
                  href={paths.telegram_public}
                  className="hover:text-blue-500"
                >
                  Telegram: @plenkaplace
                </Link>
              </li>
              <li>
                <Link href={paths.telephone} className="hover:text-green-600">
                  WhatsApp: +7 (909) 842 58-32 (Только сообщения)
                </Link>
              </li>
            </ul>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
