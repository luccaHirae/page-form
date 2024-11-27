'use client';

import { DragEndEvent, useDndMonitor, useDroppable } from '@dnd-kit/core';
import { LoaderCircle } from 'lucide-react';
import { DesignerSidebar } from '@/components/designer-sidebar';
import { useDesigner } from '@/hooks/use-designer';
import { ElementsType, FormElements } from '@/components/form-elements';
import { DesignerElementWrapper } from '@/components/designer-element-wrapper';
import { cn, generateId } from '@/lib/utils';

export const Designer = () => {
  const {
    elements,
    isLoaded,
    addElement,
    removeElement,
    selectedElement,
    setSelectedElement,
  } = useDesigner();

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
      const isDroppingOverDesignerDropArea =
        over?.data?.current?.isDesignerDropArea;

      const isDroppingElementFromSidebarOverDropArea =
        isDesignerButtonElement && isDroppingOverDesignerDropArea;

      // First scenario: dropping an element from the sidebar over the designer drop area
      if (isDroppingElementFromSidebarOverDropArea) {
        const type = active?.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          generateId()
        );

        addElement(elements.length, newElement);

        return;
      }

      const isDroppingOverDesignerElementTopHalf =
        over?.data?.current?.isTopHalfDesignerElement;

      const isDroppingOverDesignerElementBottomHalf =
        over?.data?.current?.isBottomHalfDesignerElement;

      const isDroppingOverDesignerElement =
        isDroppingOverDesignerElementTopHalf ||
        isDroppingOverDesignerElementBottomHalf;

      const isDroppingElementFromSidebarOverElement =
        isDesignerButtonElement && isDroppingOverDesignerElement;

      // Second scenario: dropping an element from the sidebar over another element
      if (isDroppingElementFromSidebarOverElement) {
        const type = active?.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          generateId()
        );

        const overId = over?.data?.current?.elementId;

        const overElementIndex = elements.findIndex((el) => el.id === overId);

        if (overElementIndex === -1) {
          throw new Error('Element not found');
        }

        let newElementIndex = overElementIndex;

        if (isDroppingOverDesignerElementBottomHalf) {
          newElementIndex = overElementIndex + 1;
        }

        addElement(newElementIndex, newElement);

        return;
      }

      const isDraggingDesignerElement =
        active?.data?.current?.isDesignerElement;

      const isDraggingDesignerElementOverDesignerElement =
        isDroppingOverDesignerElement && isDraggingDesignerElement;

      // Third scenario: reordering elements
      if (isDraggingDesignerElementOverDesignerElement) {
        const activeId = active?.data?.current?.elementId;
        const overId = over?.data?.current?.elementId;

        const activeElementIndex = elements.findIndex(
          (el) => el.id === activeId
        );
        const overElementIndex = elements.findIndex((el) => el.id === overId);

        if (activeElementIndex === -1 || overElementIndex === -1) {
          throw new Error('Element not found');
        }

        const activeElement = { ...elements[activeElementIndex] };

        removeElement(activeElement.id);

        const newElementIndex = overElementIndex;

        // TODO: fix reordering when dropping over an empty drop area
        // if (isDroppingOverDesignerElementBottomHalf) {
        //   newElementIndex = overElementIndex + 1;
        // }

        addElement(newElementIndex, activeElement);
      }
    },
  });

  const handleUnselectElement = () => {
    if (selectedElement) setSelectedElement(null);
  };

  const isDropAreaEmpty =
    !droppable.isOver && elements.length === 0 && isLoaded;
  const isDraggingOverEmptyDropArea =
    droppable.isOver && elements.length === 0 && isLoaded;

  return (
    <div className='flex w-full h-full'>
      <div onClick={handleUnselectElement} className='p-4 w-full'>
        <div
          ref={droppable.setNodeRef}
          className={cn(
            'bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto',
            droppable.isOver && 'ring-2 ring-primary/20'
          )}
        >
          {isDropAreaEmpty && (
            <p className='text-3xl text-muted-foreground flex flex-grow items-center font-bold'>
              Drop here
            </p>
          )}

          {isDraggingOverEmptyDropArea && (
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

          {!isLoaded && (
            <div className='flex flex-col items-center justify-center w-full h-full'>
              <LoaderCircle className='size-8 animate-spin' />
            </div>
          )}
        </div>
      </div>

      <DesignerSidebar />
    </div>
  );
};
