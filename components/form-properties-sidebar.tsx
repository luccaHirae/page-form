import { X } from 'lucide-react';
import { useDesigner } from '@/hooks/use-designer';
import { FormElements } from '@/components/form-elements';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export const FormPropertiesSidebar = () => {
  const { selectedElement, setSelectedElement } = useDesigner();

  if (!selectedElement) return null;

  const PropertiesForm =
    FormElements[selectedElement?.type].propertiesComponent;

  const handleClose = () => {
    setSelectedElement(null);
  };

  return (
    <div className='flex flex-col p-2'>
      <div className='flex justify-between items-center'>
        <p className='text-sm text-foreground/70'>Element properties</p>

        <Button onClick={handleClose} size='icon' variant='ghost'>
          <X />
        </Button>
      </div>

      <Separator className='mb-4' />

      <PropertiesForm elementInstance={selectedElement} />
    </div>
  );
};
