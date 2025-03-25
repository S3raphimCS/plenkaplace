type Id = string | number | null | undefined;

export const paths = {
  home: '/',
  catalog: '/catalog',
  cameras: '/catalog/cameras',
  film: '/catalog/film',
  accessories: '/catalog/accessories',
  sets: '/catalog/sets',
  certificate: '/catalog/certificate',

  development: '/services/developing',
  printing: '/services/printing',

  about: '/about',
  club: '/about/club',
  warranty: '/about/warranty',
  delivery: '/about/delivery',
  contacts: '/about/contacts',

  privacy: '/privacy',
  terms: '/terms',

  blog: '/blog',

  cart_checkout: '/cart-checkout',

  email: 'mailto:danil.payuk.57@gmail.com',
  telephone: 'tel:+7 (909) 842 58-32',
  telegram: 'https://t.me/plenka_mag',
  telegram_public: 'https://t.me/plenkaplace',
  instagram: 'https://instagram.com/plenka_place',
  telegram_business_account: 'https://t.me/plenkamagazine',

  blog_news: (id: Id): string => `/blog/${id}`,
  product: (id: Id): string => `/product/${id}`,
};
