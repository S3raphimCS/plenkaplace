'use client';
import dynamic from 'next/dynamic';

export const LazyMapSection = dynamic(
  () =>
    import('@/components/widgets/contacts/map/MapSection').then(
      (mod) => mod.MapSection
    ),
  {
    ssr: false,
  }
);
