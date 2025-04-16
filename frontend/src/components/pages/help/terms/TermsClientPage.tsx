'use client';
import { useState, useEffect } from 'react';
import { PageWrapper } from '@/components/shared/PageWrapper';
import { TermsBreadcrumb } from '@/components/widgets/terms/TermsBreadcrumb';
import { TermsDefault } from '@/components/widgets/terms/TermsDefault';
import { Skeleton } from '@/components/shared/ui/skeleton';
import { Api, FlatPage } from '@/lib/api';

const api = new Api();

export default function TermsClientPage() {
  const [termsInfo, setTermsInfo] = useState<FlatPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchTermsInfo() {
      try {
        const response = await api.flatpages.flatpagesUserAgreement();

        if (response.data!) {
          setTermsInfo(response.data);
        } else {
          setTermsInfo(null);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Ошибка загрузки пользовательского соглашения');
      } finally {
        setLoading(false);
      }
    }

    fetchTermsInfo();
  }, []);

  if (loading) {
    return (
      <main className="my-6 flex flex-col gap-6">
        <PageWrapper>
          <TermsBreadcrumb />
          <div className="mx-auto max-w-4xl space-y-6">
            <Skeleton className="mx-auto h-10 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />
            <Skeleton className="h-6 w-2/3" />
          </div>
        </PageWrapper>
      </main>
    );
  }

  if (error || !termsInfo || !termsInfo.text) {
    return (
      <main className="my-6 flex flex-col gap-6">
        <PageWrapper>
          <TermsBreadcrumb />
          <TermsDefault />
        </PageWrapper>
      </main>
    );
  }

  return (
    <main className="my-6 flex flex-col gap-6">
      <PageWrapper className="flex flex-col gap-6">
        <TermsBreadcrumb />
        <article className="prose prose-lg mt-6">
          <h1 className="text-3xl font-bold">{termsInfo.description}</h1>
          <div dangerouslySetInnerHTML={{ __html: termsInfo.text }} />
        </article>
      </PageWrapper>
    </main>
  );
}
