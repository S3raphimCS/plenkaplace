import CamerasShopClientPage from '@/components/pages/shop/CamerasShopClientPage';
import { Metadata } from 'next';
import { camerasShopPageMetadata } from './seo';

export const generateMetadata = (): Metadata => camerasShopPageMetadata;

export default function CamerasShopPage() {
  return <CamerasShopClientPage />;
}
