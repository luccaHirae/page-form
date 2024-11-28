import {
  ArrowBigLeftDash,
  FormInput,
  MousePointerClick,
  View,
} from 'lucide-react';
import { getFormById } from '@/actions/form';
import { VisitButton } from '@/app/(dashboard)/components/visit-button';
import { CardStats } from '@/app/(dashboard)/components/card-stats';
import { SubmissionsTable } from '@/app/(dashboard)/components/submissions-table';
import { ShareFormLink } from '@/components/share-form-link';

interface FormsPageProps {
  params: {
    id: string;
  };
}

export default async function FormsPage({ params }: FormsPageProps) {
  const form = await getFormById(Number(params?.id));

  if (!form) throw new Error('Form not found.');

  const { views, submissions } = form;

  let submissionRate = 0;

  if (views > 0) {
    submissionRate = (submissions / views) * 100;
  }

  const bounceRate = 100 - submissionRate;

  return (
    <>
      <div className='py-10 border-b border-muted'>
        <div className='flex justify-between container mx-auto'>
          <h1 className='text-4xl font-bold truncate'>{form.name}</h1>

          <VisitButton shareUrl={form.shareUrl} />
        </div>
      </div>

      <div className='py-4 border-b border-muted'>
        <div className='container mx-auto flex gap-2 items-center justify-between'>
          <ShareFormLink shareUrl={form.shareUrl} />
        </div>
      </div>

      <div className='w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container mx-auto'>
        <CardStats
          title='Total views'
          icon={<View className='text-blue-600' />}
          helperText='All time views'
          value={views.toLocaleString() ?? '0'}
          loading={false}
          className='shadow-md shadow-blue-600'
        />

        <CardStats
          title='Total submissions'
          icon={<FormInput className='text-yellow-600' />}
          helperText='All time submissions'
          value={submissions.toLocaleString() ?? '0'}
          loading={false}
          className='shadow-md shadow-yellow-600'
        />

        <CardStats
          title='Submission rate'
          icon={<MousePointerClick className='text-green-600' />}
          helperText='Views to submissions conversion rate'
          value={`${submissionRate.toLocaleString() ?? 0}%`}
          loading={false}
          className='shadow-md shadow-green-600'
        />

        <CardStats
          title='Bounce rate'
          icon={<ArrowBigLeftDash className='text-red-600' />}
          helperText='Views without submissions'
          value={`${bounceRate.toLocaleString() ?? 0}%`}
          loading={false}
          className='shadow-md shadow-red-600'
        />
      </div>

      <div className='container mx-auto pt-10'>
        <SubmissionsTable formId={form.id} />
      </div>
    </>
  );
}
