import { CustomBreadcrumb } from '@/components/shared/CustomBreadcrumb';
import { paths } from '@/lib/paths';

const breadcrumbItems = [
  { label: 'Главная', href: paths.home, active: false },
  { label: 'Политика конфиденциальности', href: paths.privacy, active: true },
];

export const PrivacyBreadcrumb = () => {
  return <CustomBreadcrumb items={breadcrumbItems} />;
};
