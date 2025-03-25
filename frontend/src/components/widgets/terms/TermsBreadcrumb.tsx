import { CustomBreadcrumb } from '@/components/shared/CustomBreadcrumb';
import { paths } from '@/lib/paths';

const breadcrumbItems = [
  { label: 'Главная', href: paths.home, active: false },
  { label: 'Пользовательское соглашение', href: paths.privacy, active: true },
];

export const TermsBreadcrumb = () => {
  return <CustomBreadcrumb items={breadcrumbItems} />;
};
