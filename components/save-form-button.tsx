import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const SaveFormButton = () => {
  return (
    <Button variant='outline' className='gap-2'>
      <Save className='size-4' />
      Save
    </Button>
  );
};
