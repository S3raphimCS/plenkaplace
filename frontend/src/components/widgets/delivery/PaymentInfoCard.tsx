import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/shared/ui/card';

export const PaymentInfoCard = () => {
  return (
    <Card className="bg-[#bf3a2b]">
      <CardHeader>
        <CardTitle>Способы оплаты</CardTitle>
        <CardDescription className="text-white">
          Мы принимаем различные способы оплаты для вашего удобства.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="list-disc pl-6">
          <li>Банковские карты (Visa, MasterCard, Мир)</li>
          <li>Наличные при самовывозе</li>
        </ul>
        {/* <Button className="mt-4">Подробнее об оплате</Button> */}
      </CardContent>
    </Card>
  );
};
