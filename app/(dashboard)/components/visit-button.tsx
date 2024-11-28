'use client';

import { Button } from '@/components/ui/button';

interface VisitButtonProps {
  shareUrl: string;
}

export const VisitButton = ({ shareUrl }: VisitButtonProps) => {
  const shareLink = `${window?.location?.origin}/submit/${shareUrl}`;

  const handleVisit = () => {
    window?.open(shareLink, '_blank');
  };

  return (
    <Button onClick={handleVisit} className='w-[200px]'>
      Visit
    </Button>
  );
};
