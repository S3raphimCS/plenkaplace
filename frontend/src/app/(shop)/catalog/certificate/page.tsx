import CertificateShopClientPage from '@/components/pages/shop/CertificateShopClientPage';
import { Metadata } from 'next';
import { certificatePageMetadata } from './seo';

export const generateMetadata = (): Metadata => certificatePageMetadata;

export default function CertificateShopPage() {
  return <CertificateShopClientPage />;
}
