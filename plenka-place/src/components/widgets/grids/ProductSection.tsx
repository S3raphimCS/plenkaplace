import Image from 'next/image';
import { Card, CardContent } from '@/components/shared/ui/card';
import Link from 'next/link';

const products = [
  {
    title: 'Фотоаппараты',
    imageSrc: '/grid/camera.png',
    bgColor: 'bg-[#f5a300]/20',
    link: '/products/cameras',
    isFullHeight: true,
  },
  {
    title: 'Пленка',
    imageSrc: '/grid/film.png',
    link: '/products/film',
  },
  {
    title: 'Аксессуары',
    imageSrc: '/grid/battery.png',
    link: '/products/accessories',
  },
];

export const ProductSection: React.FC = () => {
  return (
    <div className="flex w-full max-w-[1440px] flex-col items-center justify-center gap-6 bg-[#fff0e0] px-6 md:flex-row md:px-40">
      <Card className="relative w-full max-w-[548px] bg-[#f5a300]/20 md:h-[664px]">
        <CardContent className="flex flex-col items-start justify-start gap-3 p-8">
          <h3 className="font-comfortaa text-2xl font-medium text-[#100e15] md:text-[40px]">
            Фотоаппараты
          </h3>
          <Link
            href="/products/cameras"
            className="flex items-center gap-1 border-b border-[#100e15]"
          >
            <span className="font-comfortaa text-lg font-medium text-[#100e15]">
              Купить
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.167 10H15.834"
                stroke="#100E15"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.833 15L15.833 10"
                stroke="#100E15"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.833 5L15.833 10"
                stroke="#100E15"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </CardContent>
        <div className="mt-4 h-[319px] w-full overflow-hidden md:mt-auto">
          <Image
            src="/grid/camera.png"
            alt="Фотоаппараты"
            width={548}
            height={319}
            className="p-12"
          />
        </div>
      </Card>

      <div className="flex w-full max-w-[548px] flex-col gap-6">
        {products.slice(1).map((product, index) => (
          <Card
            key={index}
            className="relative flex flex-col bg-[#f5a300]/20 md:h-[319px] md:flex-row"
          >
            <CardContent className="flex flex-col items-start justify-center gap-3 p-8 md:w-1/2">
              <h3 className="font-comfortaa text-2xl font-medium text-[#100e15] md:text-[40px]">
                {product.title}
              </h3>
              <Link
                href={product.link}
                className="flex items-center gap-1 border-b border-[#100e15]"
              >
                <span className="font-comfortaa font-me dium text-lg text-[#100e15]">
                  Купить
                </span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.167 10H15.834"
                    stroke="#100E15"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.833 15L15.833 10"
                    stroke="#100E15"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.833 5L15.833 10"
                    stroke="#100E15"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </CardContent>
            <div className="h-[319px] w-full overflow-hidden md:w-1/2">
              <Image
                src={product.imageSrc}
                alt={product.title}
                width={548}
                height={319}
                className="object-cover p-12"
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
