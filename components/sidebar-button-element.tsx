import { useDraggable } from '@dnd-kit/core';
import { FormElement } from '@/components/form-elements';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarButtonElementProps {
  formElement: FormElement;
}

export const SidebarButtonElement = ({
  formElement,
}: SidebarButtonElementProps) => {
  const { icon: Icon, label } = formElement.designerButtonElement;

  const draggable = useDraggable({
    id: `designer-button-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerButtonElement: true,
    },
  });

  return (
    <Button
      ref={draggable.setNodeRef}
      variant='outline'
      className={cn(
        'flex flex-col gap-2 h-[120px] w-[120px] cursor-grab',
        draggable.isDragging && 'ring-2 ring-primary'
      )}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon className='!size-8 text-primary cursor-grab' />
      <p className='text-xs'>{label}</p>
    </Button>
  );
};

export const SidebarButtonElementDragOverlay = ({
  formElement,
}: SidebarButtonElementProps) => {
  const { icon: Icon, label } = formElement.designerButtonElement;

  return (
    <Button
      variant='outline'
      className='flex flex-col gap-2 h-[120px] w-[120px] cursor-grab'
    >
      <Icon className='!size-8 text-primary cursor-grab' />
      <p className='text-xs'>{label}</p>
    </Button>
  );
};
