'use client';

import { Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface ShareFormLinkProps {
  shareUrl: string;
}

export const ShareFormLink = ({ shareUrl }: ShareFormLinkProps) => {
  const { toast } = useToast();

  const shareLink = `${window?.location?.origin}/submit/${shareUrl}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);

    toast({
      title: 'Copied!',
      description: 'link copied to your clipboard.',
    });
  };

  return (
    <div className='flex flex-grow gap-4 items-center'>
      <Input value={shareLink} readOnly />

      <Button onClick={handleCopyLink} className='w-[250px]'>
        <Share className='mr-2 size-4' />
        Share link
      </Button>
    </div>
  );
};
