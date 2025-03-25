'use client';
import { useState, useEffect } from 'react';
import { PageWrapper } from '@/components/shared/PageWrapper';
import { PrivacyDefault } from '@/components/widgets/privacy';
import { PrivacyBreadcrumb } from '@/components/widgets/privacy/PrivacyBreadcrumb';
import { Api, FlatPage } from '@/lib/api';
import { Skeleton } from '@/components/shared/ui/skeleton';

const api = new Api();

export default function PrivacyClientPage() {
  const [privacyInfo, setPrivacyInfo] = useState<FlatPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchPrivacyInfo() {
      try {
        const response = await api.flatpages.flatpagesPrivacyPolicy();

        if (response.data!) {
          setPrivacyInfo(response.data);
        } else {
          setPrivacyInfo(null);
        }
      } catch (err) {
        console.error('Ошибка загрузки политики конфиденциальности:', err);
        setError('Ошибка загрузки политики конфиденциальности');
      } finally {
        setLoading(false);
      }
    }

    fetchPrivacyInfo();
  }, []);

  if (loading) {
    return (
      <main className="my-6 flex flex-col gap-6">
        <PageWrapper>
          <PrivacyBreadcrumb />
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

  if (error || !privacyInfo || !privacyInfo.text) {
    return (
      <main className="my-6 flex flex-col gap-6">
        <PageWrapper>
          <PrivacyBreadcrumb />
          <PrivacyDefault />
        </PageWrapper>
      </main>
    );
  }

  return (
    <main className="my-6 flex flex-col gap-6">
      <PageWrapper className="flex flex-col gap-6">
        <PrivacyBreadcrumb />
        <article className="prose prose-lg mt-6 max-w-4xl">
          <h1 className="text-3xl font-bold">{privacyInfo.description}</h1>
          <div dangerouslySetInnerHTML={{ __html: privacyInfo.text }} />
        </article>
      </PageWrapper>
    </main>
  );
}
