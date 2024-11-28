'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface FormsErrorProps {
  error: Error;
}

export default function FormsError({ error }: FormsErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='flex flex-col items-center justify-center w-full h-full gap-4'>
      <h2 className='text-destructive text-4xl'>Something went wrong</h2>

      <p className='text-destructive text-lg'>
        {error.message ?? 'An unexpected error occurred'}
      </p>

      <Button asChild>
        <Link href='/'>Go back to dashboard</Link>
      </Button>
    </div>
  );
}
