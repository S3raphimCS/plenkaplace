import { Metadata } from 'next';
import { filmShopPageMetadata } from './seo';
import FilmShopClientPage from '@/components/pages/shop/FilmShopClientPage';

export const generateMetadata = (): Metadata => filmShopPageMetadata;

export default function FilmShopPage() {
  return <FilmShopClientPage />;
}
