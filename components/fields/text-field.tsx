'use client';

import { ElementsType, FormElement } from '@/components/form-elements';
import { Text } from 'lucide-react';

const type: ElementsType = 'TextField';

export const TextFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      label: 'Text Field',
      helperText: 'This is a text field',
      required: false,
      placeholder: 'Enter text here',
    },
  }),
  designerButtonElement: {
    icon: Text,
    label: 'Text Field',
  },
  designerComponent: () => <div>Designer component</div>,
  formComponent: () => <div>Form component</div>,
  propertiesComponent: () => <div>Properties component</div>,
};
