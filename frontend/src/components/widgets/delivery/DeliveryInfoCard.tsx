import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/shared/ui/card';

export const DeliveryInfoCard = () => {
  return (
    <Card className="bg-[#bf3a2b]">
      <CardHeader>
        <CardTitle>Условия доставки</CardTitle>
        <CardDescription className="text-white">
          Мы предлагаем удобные способы доставки по всей России и за её
          пределами.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>
          <strong>Сроки доставки:</strong> от 2 до 10 рабочих дней в зависимости
          от вашего региона.
        </p>
        <p>
          <strong>Стоимость доставки:</strong> рассчитывается индивидуально в
          зависимости от выбранного способа.
        </p>
        {/* <Button className="mt-4">Подробнее о тарифах</Button> */}
      </CardContent>
    </Card>
  );
};
