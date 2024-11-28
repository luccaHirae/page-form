import {
  ArrowBigLeftDash,
  FormInput,
  MousePointerClick,
  View,
} from 'lucide-react';
import { getFormStats } from '@/actions/form';
import { CardStats } from '@/app/(dashboard)/components/card-stats';

interface StatsCardListProps {
  data?: Awaited<ReturnType<typeof getFormStats>>;
  loading: boolean;
}

export const CardStatsList = ({ data, loading }: StatsCardListProps) => {
  return (
    <div className='w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
      <CardStats
        title='Total views'
        icon={<View className='text-blue-600' />}
        helperText='All time views'
        value={data?.views.toLocaleString() ?? '0'}
        loading={loading}
        className='shadow-md shadow-blue-600'
      />

      <CardStats
        title='Total submissions'
        icon={<FormInput className='text-yellow-600' />}
        helperText='All time submissions'
        value={data?.submissions.toLocaleString() ?? '0'}
        loading={loading}
        className='shadow-md shadow-yellow-600'
      />

      <CardStats
        title='Submission rate'
        icon={<MousePointerClick className='text-green-600' />}
        helperText='Views to submissions conversion rate'
        value={`${data?.submissionRate.toLocaleString() ?? 0}%`}
        loading={loading}
        className='shadow-md shadow-green-600'
      />

      <CardStats
        title='Bounce rate'
        icon={<ArrowBigLeftDash className='text-red-600' />}
        helperText='Views without submissions'
        value={`${data?.bounceRate.toLocaleString() ?? 0}%`}
        loading={loading}
        className='shadow-md shadow-red-600'
      />
    </div>
  );
};
