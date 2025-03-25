import { CustomBreadcrumb } from '@/components/shared/CustomBreadcrumb';
import { paths } from '@/lib/paths';
import React from 'react';

const breadcrumbItems = [
  { label: 'Главная', href: paths.home, active: false },
  { label: 'Контакты', href: paths.contacts, active: true },
];

export const ContactsBreadcrumb = () => {
  return <CustomBreadcrumb items={breadcrumbItems} />;
};
