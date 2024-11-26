'use client';

import { DragEndEvent, useDndMonitor, useDroppable } from '@dnd-kit/core';
import { DesignerSidebar } from '@/components/designer-sidebar';
import { useDesigner } from '@/hooks/use-designer';
import { ElementsType, FormElements } from '@/components/form-elements';
import { DesignerElementWrapper } from '@/components/designer-element-wrapper';
import { cn, generateId } from '@/lib/utils';

export const Designer = () => {
  const { elements, addElement } = useDesigner();

  const droppable = useDroppable({
    id: 'designer-drop-area',
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;

      if (!active || !over) return;

      const isDesignerButtonElement =
        active?.data?.current?.isDesignerButtonElement;

      if (isDesignerButtonElement) {
        const type = active?.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          generateId()
        );

        addElement(0, newElement);
      }
    },
  });

  return (
    <div className='flex w-full h-full'>
      <div className='p-4 w-full'>
        <div
          ref={droppable.setNodeRef}
          className={cn(
            'bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto',
            droppable.isOver && 'ring-2 ring-primary/20'
          )}
        >
          {!droppable.isOver && elements.length === 0 && (
            <p className='text-3xl text-muted-foreground flex flex-grow items-center font-bold'>
              Drop here
            </p>
          )}

          {droppable.isOver && elements.length === 0 && (
            <div className='p-4 w-full'>
              <div className='h-[120px] rounded-md bg-primary/20'></div>
            </div>
          )}

          {elements.length > 0 && (
            <div className='flex flex-col w-full gap-2 p-4'>
              {elements.map((element) => (
                <DesignerElementWrapper key={element.id} element={element} />
              ))}
            </div>
          )}
        </div>
      </div>

      <DesignerSidebar />
    </div>
  );
};
