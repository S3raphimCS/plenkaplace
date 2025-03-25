import TermsClientPage from '@/components/pages/help/terms/TermsClientPage';
import { Metadata } from 'next';
import { termsPageMetadata } from './seo';

export const generateMetadata = (): Metadata => termsPageMetadata;

export default function TermsPage() {
  return <TermsClientPage />;
}
