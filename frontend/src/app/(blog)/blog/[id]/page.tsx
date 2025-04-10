'use client';
import { PageWrapper } from '@/components/shared/PageWrapper';
import { Api, NewsDetail } from '@/lib/api';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Skeleton } from '@/components/shared/ui/skeleton';
import { formatDate } from '@/lib/utils';
import styles from './blogContent.module.css';
import { generateMetadata } from './seo';

const api = new Api();

export default function BlogPostPage() {
  const params = useParams();
  const id = params?.id as string | undefined;

  const [newsData, setNewsData] = useState<NewsDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchNews() {
      if (!id) return; // Проверка на наличие id

      try {
        const response = await api.news.newsRead(Number(id));
        setNewsData(response.data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Ошибка загрузки новости');
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, [id]);

  const metadata = generateMetadata(newsData);

  useEffect(() => {
    if (metadata) {
      //@ts-expect-error: 2322
      document.title = metadata.title;
      const metaDescription = document.querySelector(
        'meta[name="description"]'
      );
      if (metaDescription) {
        metaDescription.setAttribute('content', metadata.description!);
      }

      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords && Array.isArray(metadata.keywords)) {
        metaKeywords.setAttribute('content', metadata.keywords.join(', '));
      }
    }
  }, [metadata]);

  if (loading) {
    return (
      <main className="my-6 flex flex-col gap-6">
        <PageWrapper>
          <div className="mx-auto max-w-4xl space-y-6">
            <Skeleton className="mx-auto h-12 w-3/4" />
            <Skeleton className="mx-auto h-6 w-48" />
            <Skeleton className="h-96 w-full" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </PageWrapper>
      </main>
    );
  }

  if (error) {
    return (
      <main className="my-6 flex flex-col gap-6">
        <PageWrapper>
          <div className="flex flex-col items-center justify-center">
            <Image src={'/error.png'} alt={'Ошибка'} width={300} height={400} />
            <div className="py-6 text-center text-xl text-red-500">{error}</div>
          </div>
        </PageWrapper>
      </main>
    );
  }

  if (!newsData) {
    return (
      <main className="my-6 flex flex-col gap-6">
        <PageWrapper>
          <div className="flex flex-col items-center justify-center">
            <Image
              src={'/blog/new-not-found.png'}
              alt={'Новость не найдена'}
              width={300}
              height={400}
            />
            <div className="py-6 text-center text-xl text-gray-500">
              Новость не найдена
            </div>
          </div>
        </PageWrapper>
      </main>
    );
  }

  return (
    <main className="my-6 flex flex-col gap-6">
      <PageWrapper>
        <article className="prose prose-lg mx-auto max-w-4xl">
          <header className="mb-8">
            {newsData.title && (
              <h1 className="mb-4 text-center text-4xl font-bold">
                {newsData.title}
              </h1>
            )}

            {newsData.published_date && (
              <time className="block text-center text-sm text-gray-500">
                {formatDate(newsData.published_date)}
              </time>
            )}
          </header>

          {newsData.preview && (
            <div className="relative mb-8 h-96 overflow-hidden rounded-xl">
              <Image
                src={newsData.preview}
                alt={newsData.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {newsData.images && newsData.images.length > 0 && (
            <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              {newsData.images.map((image, index) => (
                <div
                  key={index}
                  className="relative h-64 overflow-hidden rounded-lg"
                >
                  <Image
                    src={image.image!}
                    alt={`Изображение ${index + 1} к новости ${newsData.title}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          <div
            className={`${styles.content} `}
            dangerouslySetInnerHTML={{ __html: newsData.text }}
          />
        </article>
      </PageWrapper>
    </main>
  );
}
