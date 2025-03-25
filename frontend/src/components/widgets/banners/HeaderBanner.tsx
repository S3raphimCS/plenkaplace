import Image from 'next/image';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/shared/ui/breadcrumb';
import { ChevronRight } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';

interface BreadcrumbItemProps {
  href: string;
  label: string;
  color: string;
}

interface HeaderBannerProps {
  className?: string;
  imageSrc: string;
  title: string;
  description: string;
  breadcrumbs: BreadcrumbItemProps[];
  imageClassName?: string;
}

export const HeaderBanner: React.FC<HeaderBannerProps> = ({
  className,
  imageSrc,
  title,
  description,
  breadcrumbs,
  imageClassName,
}) => {
  return (
    <div
      className={cn(
        'relative flex w-full flex-col items-start gap-2',
        className
      )}
    >
      <div className="relative h-[392px] w-full">
        <div className={`absolute inset-0 ${imageClassName}`}>
          <Image
            src={imageSrc}
            alt="Banner"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>
        <div className="absolute left-1/2 top-1/3 flex -translate-x-1/2 transform flex-col items-center gap-6">
          <Breadcrumb>
            <BreadcrumbList className="flex items-center gap-1">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      href={crumb.href}
                      className={`font-sub-text text-${crumb.color} text-sm hover:text-[#c5ffd9] sm:text-base`}
                    >
                      {crumb.label}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {index < breadcrumbs.length - 1 && (
                    <BreadcrumbSeparator>
                      <ChevronRight className="h-3 w-3" />
                    </BreadcrumbSeparator>
                  )}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl">
            {title}
          </h1>

          <p className="font-text text-center text-sm sm:text-base md:text-lg">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
