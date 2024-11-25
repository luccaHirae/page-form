import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const PreviewDialogButton = () => {
  return (
    <Button variant='outline' className='gap-2'>
      <Eye className='size-6' />
      Preview
    </Button>
  );
};
