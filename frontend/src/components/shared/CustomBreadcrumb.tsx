import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/shared/ui/breadcrumb';
import { ChevronRight } from 'lucide-react';
import React from 'react';

interface BreadcrumbItem {
  label: string;
  href: string;
  active?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const CustomBreadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  className,
}) => {
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList className="flex items-center gap-4">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem className="inline-flex items-center gap-2">
              <BreadcrumbLink
                href={item.href}
                className={`relative w-fit ${item.active ? 'text-black-900' : 'text-black-600'}`}
              >
                {item.label}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {!item.active && index < items.length - 1 && (
              <BreadcrumbSeparator>
                <ChevronRight className="h-3 w-3"></ChevronRight>
              </BreadcrumbSeparator>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
