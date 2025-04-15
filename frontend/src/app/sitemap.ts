import { MetadataRoute } from 'next';
import { paths } from '@/lib/paths';
import { Api, NewsList } from '@/lib/api';
import { Product } from '@/components/entity';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = `${process.env.NEXT_PUBLIC_ENABLED_PROTO}://${process.env.NEXT_PUBLIC_DOMAIN_NAME!}`;

  const staticPages = Object.values(paths)
    .filter(
      (path) =>
        typeof path === 'string' &&
        !path.startsWith('https') &&
        ![
          '/catalog',
          'mailto:danil.payuk.57@gmail.com',
          'tel:+7 (909) 842 58-32',
        ].includes(path)
    )
    .map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

  const productIds = await fetchProducts();
  const blogIds = await fetchBlogPosts();

  const dynamicPages = [
    ...productIds.map((id) => ({
      url: `${baseUrl}${paths.product(id)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...blogIds.map((id) => ({
      url: `${baseUrl}${paths.blog_news(id)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];

  return [...staticPages, ...dynamicPages];
}

async function fetchProducts(): Promise<string[]> {
  try {
    const api = new Api();
    const response = await api.shop.shopProductsList();
    return response.data.results.map((product: Product) =>
      product.slug!.toString()
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return [];
  }
}

async function fetchBlogPosts(): Promise<string[]> {
  try {
    const api = new Api();
    const response = await api.news.newsList();
    return response.data.results.map((post: NewsList) => post.id!.toString());
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return [];
  }
}
