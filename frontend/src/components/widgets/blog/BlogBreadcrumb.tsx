import { CustomBreadcrumb } from '@/components/shared/CustomBreadcrumb';
import { paths } from '@/lib/paths';
import React from 'react';

const breadcrumbItems = [
  { label: 'Главная', href: paths.home, active: false },
  { label: 'Блог', href: paths.blog, active: false },
  { label: 'Новость №1', href: paths.contacts, active: true },
];

export const BlogBreadcrumb = () => {
  return <CustomBreadcrumb items={breadcrumbItems} />;
};
