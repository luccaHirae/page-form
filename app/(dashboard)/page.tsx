import { Suspense } from 'react';
import { getFormStats } from '@/actions/form';
import { Separator } from '@/components/ui/separator';
import { CardStatsList } from '@/app/(dashboard)/components/card-stats-list';
import { CreateFormButton } from '@/app/(dashboard)/components/create-form-button';
import { FormCardList } from '@/app/(dashboard)/components/form-card-list';
import { FormCardSkeleton } from '@/app/(dashboard)/components/form-card-skeleton';

export default async function Home() {
  const stats = await getFormStats();

  return (
    <div className='container p-4 mx-auto'>
      <Suspense fallback={<CardStatsList loading={true} />}>
        <CardStatsList data={stats} loading={false} />
      </Suspense>

      <Separator className='my-6' />

      <h2 className='text-4xl font-bold col-span-2'>Your forms</h2>

      <Separator className='my-6' />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <CreateFormButton />

        <Suspense
          fallback={[1, 2, 3, 4, 5].map((el) => (
            <FormCardSkeleton key={el} />
          ))}
        >
          <FormCardList />
        </Suspense>
      </div>
    </div>
  );
}
