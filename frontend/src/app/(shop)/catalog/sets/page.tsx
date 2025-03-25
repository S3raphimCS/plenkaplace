import SetsShopClientPage from '@/components/pages/shop/SetsShopClientPage';
import { Metadata } from 'next';
import { setsShopPageMetadata } from './seo';

export const generateMetadata = (): Metadata => setsShopPageMetadata;

export default function SetsShopPage() {
  return <SetsShopClientPage />;
}
