import { Skeleton } from '@/components/shared/ui/skeleton';
import { Card, CardContent } from '@/components/shared/ui/card';

export const BlogPostCardSkeleton = () => {
  return (
    <Card className="border-none bg-transparent shadow-none">
      <CardContent className="flex flex-col items-start gap-6 p-0">
        <Skeleton
          className="h-[250px] w-full md:h-[325px]"
          style={{ background: 'linear-gradient(90deg, #ccc, #ddd)' }}
        />

        <div className="flex w-full flex-col items-start gap-2">
          <Skeleton className="h-6 w-full rounded" />
          <Skeleton className="h-4 w-1/2 rounded" />
        </div>
      </CardContent>
    </Card>
  );
};
