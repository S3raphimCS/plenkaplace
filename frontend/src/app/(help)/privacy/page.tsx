import { Metadata } from 'next';
import { privacyPageMetadata } from './seo';
import PrivacyClientPage from '@/components/pages/help/privacy/PrivacyClientPage';

export const generateMetadata = (): Metadata => privacyPageMetadata;

export default function PrivacyPage() {
  return <PrivacyClientPage />;
}
