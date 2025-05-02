import type { Metadata } from 'next';
import { Comfortaa } from 'next/font/google';
import { Footer } from '@/components/widgets/main/footer/Footer';
import './globals.css';
import { ReduxProvider } from './providers';
import { Header } from '@/components/widgets/main';
import { CookieConsent } from '@/components/widgets/main/cookie-consent/CookieConsent';
import { Toaster } from '@/components/shared/ui/toaster';
import Script from 'next/script';

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
      <head>
        <meta name="yandex-verification" content="29ab4f8c312864f9" />
        <script type="text/javascript">
          {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(101549698, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
   });`}
        </script>
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/101549698"
              style={{ position: 'absolute', left: '-9999px' }}
              alt=""
            />
          </div>
        </noscript>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-JW13CTJK63"
        ></Script>
        <script>
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-JW13CTJK63');`}
        </script>
      </head>
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
