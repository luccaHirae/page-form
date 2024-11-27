import { useTransition } from 'react';
import { Loader, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { publishForm } from '@/actions/form';
import { useRouter } from 'next/navigation';

interface PublishFormButtonProps {
  formId: number;
}

export const PublishFormButton = ({ formId }: PublishFormButtonProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const [isLoading, startTransition] = useTransition();

  const handlePublishForm = async () => {
    try {
      await publishForm(formId);

      toast({
        title: 'Success',
        description: 'Your form has been successfully published.',
      });

      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }

      toast({
        title: 'Error',
        description: 'An error occurred while publishing the form.',
        variant: 'destructive',
      });
    }
  };

  const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    startTransition(handlePublishForm);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className='gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400 hover:from-indigo-500 hover:to-cyan-500 transition-colors'>
          <Upload className='size-4' />
          Publish
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to publish this form?
          </AlertDialogTitle>

          <AlertDialogDescription>
            <span className='font-medium'>
              By publishing this form it will be available to the public and you
              will be able to collect responses.
            </span>
            <br />
            Once you publish this form you will not be able to edit it anymore.
            This action is irreversible.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction disabled={isLoading} onClick={handleConfirm}>
            Proceed
            {isLoading && <Loader className='animate-spin' />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
