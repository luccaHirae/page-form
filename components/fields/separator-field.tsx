'use client';

import { SeparatorHorizontal } from 'lucide-react';
import { ElementsType, FormElement } from '@/components/form-elements';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const type: ElementsType = 'SeparatorField';

export const SeparatorFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
  }),
  designerButtonElement: {
    icon: SeparatorHorizontal,
    label: 'Separator Field',
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: () => true,
};

function DesignerComponent() {
  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label className='text-muted-foreground'>Separator field</Label>

      <Separator />
    </div>
  );
}

function FormComponent() {
  return <Separator />;
}

function PropertiesComponent() {
  return <p>No properties available for this element</p>;
}
