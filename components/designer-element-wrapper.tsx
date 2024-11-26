import { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Trash } from 'lucide-react';
import { useDesigner } from '@/hooks/use-designer';
import { FormElementInstace, FormElements } from '@/components/form-elements';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DesignerElementWrapperProps {
  element: FormElementInstace;
}

export const DesignerElementWrapper = ({
  element,
}: DesignerElementWrapperProps) => {
  const { removeElement } = useDesigner();

  const [isMouseOver, setIsMouseOver] = useState(false);

  const topHalf = useDroppable({
    id: element.id + '-top',
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });

  const bottomHalf = useDroppable({
    id: element.id + '-bottom',
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  });

  const handleClick = () => {
    removeElement(element.id);
  };

  const DesignerElement = FormElements[element.type].designerComponent;

  return (
    <div
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      className='relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset'
    >
      <div
        ref={topHalf.setNodeRef}
        className='absolute w-full h-1/2 rounded-t-md'
      ></div>
      <div
        ref={bottomHalf.setNodeRef}
        className='absolute w-full bottom-0 h-1/2 rounded-b-md'
      ></div>

      {isMouseOver && (
        <>
          <div className='absolute right-0 h-full'>
            <Button
              onClick={handleClick}
              variant='outline'
              className='flex justify-center h-full border rounded-md rounded-l-none bg-red-500'
            >
              <Trash className='size-6' />
            </Button>
          </div>

          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse'>
            <p className='text-muted-foreground text-sm'>
              Click to display properties or drag to move
            </p>
          </div>
        </>
      )}

      <div
        className={cn(
          'flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100',
          isMouseOver && 'opacity-30'
        )}
      >
        <DesignerElement elementInstance={element} />
      </div>
    </div>
  );
};
