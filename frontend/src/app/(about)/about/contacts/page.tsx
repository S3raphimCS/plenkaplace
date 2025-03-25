import ContactsClientPage from '@/components/pages/about/contacts/ContactsClientPage';
import { Metadata } from 'next';
import { clubPageMetadata } from '../club/seo';

export const generateMetadata = (): Metadata => clubPageMetadata;

export default function ContactsPage() {
  return <ContactsClientPage />;
}
