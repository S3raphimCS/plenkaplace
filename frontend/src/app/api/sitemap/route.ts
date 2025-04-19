import { NextResponse } from 'next/server';
import { paths } from '@/lib/paths';
import { Api, NewsList } from '@/lib/api';
import { Product } from '@/components/entity';

const BASE_URL = `${process.env.NEXT_PUBLIC_ENABLED_PROTO}://${process.env.NEXT_PUBLIC_DOMAIN_NAME!}`;
const CACHE_DURATION_MS = 60 * 60 * 1000; 

let cachedSitemap: string | null = null;
let lastGenerated: number | null = null;

export async function GET() {
  const now = Date.now();

  if (cachedSitemap && lastGenerated && now - lastGenerated < CACHE_DURATION_MS) {
    return new NextResponse(cachedSitemap, {
      status: 200,
      headers: { 'Content-Type': 'application/xml' },
    });
  }

  try {
    const [productIds, blogIds] = await Promise.all([
      fetchWithTimeout(fetchProducts(), 10000),
      fetchWithTimeout(fetchBlogPosts(), 10000),
    ]);

    const staticPaths = Object.values(paths)
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
      .map((path) => `${BASE_URL}${path}`);

    const productUrls = productIds.map((id) => `${BASE_URL}${paths.product(id)}`);
    const blogUrls = blogIds.map((id) => `${BASE_URL}${paths.blog_news(id)}`);

    const allUrls = [...staticPaths, ...productUrls, ...blogUrls];
    const sitemap = generateSitemap(allUrls);

    cachedSitemap = sitemap;
    lastGenerated = now;

    return new NextResponse(sitemap, {
      status: 200,
      headers: { 'Content-Type': 'application/xml' },
    });
  } catch {
    return new NextResponse('Failed to generate sitemap', { status: 500 });
  }
}


async function fetchWithTimeout<T>(promise: Promise<T>, timeout = 5000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), timeout)
    ),
  ]);
}

async function fetchProducts(): Promise<string[]> {
  try {
    const api = new Api();
    const response = await api.shop.shopProductsList();
    return response.data.results.map((product: Product) =>
      product.slug!.toString()
    );
  } catch {
    return [];
  }
}

async function fetchBlogPosts(): Promise<string[]> {
  try {
    const api = new Api();
    const response = await api.news.newsList();
    return response.data.results.map((post: NewsList) => post.id!.toString());
  } catch {
    return [];
  }
}

function generateSitemap(urls: string[]): string {
  const updatedDate = new Date().toISOString();

  const urlSet = urls
    .map(
      (url) => `
  <url>
    <loc>${url}</loc>
    <lastmod>${updatedDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urlSet}
</urlset>`;
}
