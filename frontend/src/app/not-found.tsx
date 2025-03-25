import { Logo } from '@/components/entity';
import { Button } from '@/components/shared/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/shared/ui/card';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f5f5] p-4">
      <Card className="w-full max-w-md overflow-hidden rounded-lg bg-white shadow-lg">
        <CardHeader className="relative">
          <div className="absolute inset-0 bg-cover opacity-20"></div>

          <div className="relative z-10 mb-6 flex justify-center">
            <Logo />
          </div>

          <CardTitle className="relative z-10 text-center text-3xl font-bold text-[#333]">
            404 - Кадр не найден
          </CardTitle>
          <CardDescription className="relative z-10 mt-2 text-center text-[#666]">
            Ой! Похоже, вы зашли в тупик. Давайте вернёмся к съёмке!
          </CardDescription>
        </CardHeader>

        <CardContent className="relative z-10 p-6">
          <div className="mb-6 flex justify-center">
            <Image
              src="/grid/camera.png"
              alt="Vintage Camera"
              width={200}
              height={200}
              className="h-auto w-48"
            />
          </div>

          <div className="text-center">
            <Link href="/">
              <Button className="rounded-lg bg-[#bf3a2b] px-6 py-2 font-medium text-white shadow-md transition-colors hover:bg-[#a6342a]">
                Вернуться на главную
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
