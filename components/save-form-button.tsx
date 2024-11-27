import { useTransition } from 'react';
import { Loader, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDesigner } from '@/hooks/use-designer';
import { useToast } from '@/hooks/use-toast';
import { updateFormContent } from '@/actions/form';

interface SaveFormButtonProps {
  formId: number;
}

export const SaveFormButton = ({ formId }: SaveFormButtonProps) => {
  const { elements } = useDesigner();
  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();

  const saveFormContent = async () => {
    try {
      const stringifiedElements = JSON.stringify(elements);

      await updateFormContent(formId, stringifiedElements);

      toast({
        title: 'Success',
        description: 'Form saved successfully.',
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }

      toast({
        title: 'Error',
        description: 'Failed to save form.',
        variant: 'destructive',
      });
    }
  };

  const handleSave = () => {
    startTransition(saveFormContent);
  };

  return (
    <Button
      disabled={isPending}
      onClick={handleSave}
      variant='outline'
      className='gap-2'
    >
      <Save className='size-4' />
      Save
      {isPending && <Loader className='animate-spin' />}
    </Button>
  );
};
