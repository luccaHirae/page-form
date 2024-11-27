import { TextFieldFormElement } from '@/components/fields/text-field';

export type ElementsType = 'TextField';

export type FormElementInstace = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export type FormElement = {
  type: ElementsType;
  construct: (id: string) => FormElementInstace;
  designerButtonElement: {
    icon: React.ElementType;
    label: string;
  };
  designerComponent: React.FC<{
    elementInstance: FormElementInstace;
  }>;
  formComponent: React.FC;
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstace;
  }>;
};

type FormElementsType = {
  [key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
};
