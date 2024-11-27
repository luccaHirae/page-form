'use client';

import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { PreviewDialogButton } from '@/components/preview-dialog-button';
import { SaveFormButton } from '@/components/save-form-button';
import { PublishFormButton } from '@/components/publish-form-button';
import { Designer } from '@/components/designer';
import { DragOverlayWrapper } from '@/components/drag-overlay-wrapper';
import { type Form } from '@prisma/client';

interface FormBuilderProps {
  form: Form;
}

export const FormBuilder = ({ form }: FormBuilderProps) => {
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
                <PublishFormButton />
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
