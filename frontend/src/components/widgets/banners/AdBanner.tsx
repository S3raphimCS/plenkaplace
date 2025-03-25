'use client';
import { Badge } from '@/components/shared/ui/badge';
import Image from 'next/image';
import Link from 'next/link';

interface AdBannerProps {
  title: string;
  badgeText: string;
  imageSrc: string;
  href: string;
  mobileImageSrc: string;
  bgColor?: string;
  figureFillColor?: string;
  figureViewbox?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  title,
  badgeText,
  imageSrc,
  href,
  mobileImageSrc,
  figureFillColor = '',
  figureViewbox = '0 0 905 235',
  bgColor = '#bf3a2b',
}) => {
  return (
    <div className="relative mx-auto w-full max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-10">
      <div
        className="relative hidden min-h-[180px] items-center justify-between overflow-hidden rounded-[15px] p-6 sm:flex"
        style={{ backgroundColor: bgColor }}
      >
        <div className="absolute inset-0 z-10">
          <svg
            width="100%"
            height="100%"
            viewBox={figureViewbox}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M382.599 2.00426L168.111 0L0 2.00426L236.041 124.264L182.137 235H382.631H766.167L905 98.71L778.189 5.01066H545.895L369.445 146.311L382.599 2.00426Z"
              fill="#F9D939"
            />
          </svg>
        </div>

        <div className="z-20 flex max-w-[35%] flex-col gap-3 px-4 text-white">
          <h2 className="font-comfortaa text-lg font-semibold sm:text-xl lg:text-3xl">
            {title}
          </h2>
          <div className="flex items-center gap-2">
            <Link href={href}>
              <Badge className="text-md cursor-pointer bg-[#fff0e0] sm:text-sm lg:text-xl">
                {badgeText}
              </Badge>
            </Link>
          </div>
        </div>

        <div className="relative z-10 w-[45%]">
          <Image
            className="rounded-2xl object-cover"
            src={imageSrc}
            alt="Баннер"
            width={400}
            height={533}
            // style={{
            //   transform: 'rotate(-20.17deg)',
            //   transformOrigin: 'top right',
            // }}
          />
        </div>
      </div>

      <div
        className="relative flex flex-col items-center overflow-hidden rounded-[15px] p-4 text-center sm:hidden"
        style={{ backgroundColor: bgColor }}
      >
        <div className="absolute inset-0 z-10">
          <svg
            className={`${figureFillColor} h-full w-full`}
            viewBox={figureViewbox}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M363.051 3.19461C366.488 1.56135 370.163 0.660156 373.967 0.660156H1197.43C1197.43 0.660156 731.416 47.4302 711.677 112.879C705.385 133.74 728.362 157.451 757.861 178.254C778.536 192.833 769.154 232.837 743.856 232.837C540.795 232.837 135.315 232.837 106.973 232.837C69.0508 232.837 -90.7638 -3.59642 72.921 33.5519C217.683 66.4056 337.323 15.4219 363.051 3.19461Z"
              fill="current"
            />
          </svg>
        </div>

        <h2 className="font-comfortaa relative z-10 text-lg font-semibold text-white">
          {title}
        </h2>
        <Image
          className="relative z-10 mt-4 w-3/5 rounded-[15px] object-cover"
          src={mobileImageSrc}
          alt="Баннер"
          width={230}
          height={210}
        />
        <div className="relative z-10 mt-4 flex items-center gap-2.5">
          <Link href={href}>
            <Badge className="cursor-pointer bg-[#fff0e0] text-xs">
              {badgeText}
            </Badge>
          </Link>
        </div>
      </div>
    </div>
  );
};
