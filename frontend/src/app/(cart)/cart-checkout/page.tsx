import { Metadata } from 'next';
import { cartCheckoutMetadata } from './seo';
import CartCheckoutClientPage from '@/components/pages/cart/CartCheckoutClientPage';

export const generateMetadata = (): Metadata => cartCheckoutMetadata;

export default function CartCheckoutPage() {
  return <CartCheckoutClientPage />;
}
