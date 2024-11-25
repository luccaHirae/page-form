import { LoaderCircle } from 'lucide-react';

export default function BuilderLoading() {
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <LoaderCircle className='animate-spin size-12' />
    </div>
  );
}