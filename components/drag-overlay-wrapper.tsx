import { useState } from 'react';
import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import { SidebarButtonElementDragOverlay } from '@/components/sidebar-button-element';
import { type ElementsType, FormElements } from '@/components/form-elements';

export const DragOverlayWrapper = () => {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);

  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });

  if (!draggedItem) return null;

  let node = <div>No drag overlay</div>;

  const isSidebarButtonElement =
    draggedItem?.data?.current?.isDesignerButtonElement;

  if (isSidebarButtonElement) {
    const type = draggedItem?.data?.current?.type as ElementsType;

    node = <SidebarButtonElementDragOverlay formElement={FormElements[type]} />;
  }

  return <DragOverlay>{node}</DragOverlay>;
};
