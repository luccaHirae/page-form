import { Suspense } from 'react';
import { getFormStats } from '@/actions/form';
import { Separator } from '@/components/ui/separator';
import { CardStatsList } from '@/app/(dashboard)/components/card-stats-list';
import { CreateFormButton } from '@/app/(dashboard)/components/create-form-button';

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

      <CreateFormButton />
    </div>
  );
}
