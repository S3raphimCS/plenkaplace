import AccessoriesClientPage from '@/components/pages/shop/AccessoriesClientPage';
import { Metadata } from 'next';
import { accessoriesPageMetadata } from './seo';

export const generateMetadata = (): Metadata => accessoriesPageMetadata;

export default function AccessoriesPage() {
  return <AccessoriesClientPage />;
}
