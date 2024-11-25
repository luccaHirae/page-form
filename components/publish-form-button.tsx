import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const PublishFormButton = () => {
  return (
    <Button className='gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400 hover:from-indigo-500 hover:to-cyan-500 transition-colors'>
      <Upload className='size-4' />
      Publish
    </Button>
  );
};
