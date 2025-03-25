import type { Metadata } from 'next';
import { Comfortaa } from 'next/font/google';
import { Footer } from '@/components/widgets/main/footer/Footer';
import './globals.css';
import { ReduxProvider } from './providers';
import { Header } from '@/components/widgets/main';
import { CookieConsent } from '@/components/widgets/main/cookie-consent/CookieConsent';
import { Toaster } from '@/components/shared/ui/toaster';

const comfortaa = Comfortaa({
  variable: '--font-comfortaa',
  subsets: ['cyrillic', 'latin'],
});

export const metadata: Metadata = {
  title: 'PlenkaPlace – Всё для плёночной фотографии',
  description:
    'PlenkaPlace — ваш проводник в мир плёночной фотографии. Широкий выбор фотоаппаратов, плёнки, аксессуаров и наборов. Услуги проявки, оцифровки и печати.',
  authors: [
    { name: 'Merkucios', url: 'https://medvedev-andrew-dev.vercel.app' },
  ],
  creator: 'Merkucios',
  keywords: [
    'плёнка',
    'фотография',
    'PlenkaPlace',
    'плёночные камеры',
    'проявка плёнки',
    'оцифровка фото',
  ],
  openGraph: {
    title: 'PlenkaPlace – Всё для плёночной фотографии',
    description:
      'PlenkaPlace — ваш проводник в мир плёночной фотографии. Широкий выбор фотоаппаратов, плёнки, аксессуаров и наборов.',
    url: 'https://plenkaplace.com',
    siteName: 'PlenkaPlace',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'PlenkaPlace',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  icons: {
    icon: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${comfortaa.variable} antialiased`}>
        <ReduxProvider>
          <Header />
          {children}
          <Footer />
          <CookieConsent />
          <Toaster />
        </ReduxProvider>
      </body>
    </html>
  );
}
