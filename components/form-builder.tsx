'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PreviewDialogButton } from '@/components/preview-dialog-button';
import { SaveFormButton } from '@/components/save-form-button';
import { PublishFormButton } from '@/components/publish-form-button';
import { Designer } from '@/components/designer';
import { DragOverlayWrapper } from '@/components/drag-overlay-wrapper';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useDesigner } from '@/hooks/use-designer';
import { useToast } from '@/hooks/use-toast';
import { type Form } from '@prisma/client';

interface FormBuilderProps {
  form: Form;
}

export const FormBuilder = ({ form }: FormBuilderProps) => {
  const { setElements, setIsLoaded } = useDesigner();
  const { toast } = useToast();

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      // Only start the drag if the user has moved the pointer by 10 pixels
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    const elements = JSON.parse(form.content);
    setElements(elements);
    setIsLoaded(true);
  }, [form.content, setElements, setIsLoaded]);

  const shareUrl = `${window.location.origin}/submit/${form.shareUrl}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);

    toast({
      title: 'Copied!',
      description: 'link copied to your clipboard.',
    });
  };

  if (form.published) {
    return (
      <>
        <div className='flex flex-col items-center justify-center h-full w-full'>
          <div className='max-w-md'>
            <h1 className='text-center text-4xl font-bold text-primary border-b pb-2 mb-10'>
              🎊 Form Published 🎊
            </h1>

            <h2 className='text-2xl'>Share this form</h2>

            <h3 className='text-left text-muted-foreground border-b pb-10'>
              Anyone with the link can view the form and submit responses.
            </h3>

            <div className='my-4 flex flex-col gap-2 items-center w-full border-b pb-4'>
              <Input value={shareUrl} readOnly className='w-full' />

              <Button onClick={handleCopyLink} className='mt-2 w-full'>
                Copy Link
              </Button>
            </div>

            <div className='flex justify-between'>
              <Button variant='link' asChild>
                <Link href='/' className='gap-2'>
                  <ArrowLeft />
                  Back to Dashboard
                </Link>
              </Button>

              <Button variant='link' asChild>
                <Link href={`/forms/${form.id}`} className='gap-2'>
                  Form details
                  <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <DndContext sensors={sensors}>
      <main className='flex flex-col w-full'>
        <nav className='flex justify-between items-center border-b-2 p-4 gap-3'>
          <h2 className='truncate font-medium'>
            <span className='text-muted-foreground mr-2'>Form:</span>
            {form.name}
          </h2>

          <div className='flex items-center gap-2'>
            <PreviewDialogButton />

            {!form.published && (
              <>
                <SaveFormButton formId={form.id} />
                <PublishFormButton formId={form.id} />
              </>
            )}
          </div>
        </nav>

        <div className='flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url(/graph-paper.svg)] bg-[url(/graph-paper-dark.svg)]'>
          <Designer />
        </div>
      </main>

      <DragOverlayWrapper />
    </DndContext>
  );
};
