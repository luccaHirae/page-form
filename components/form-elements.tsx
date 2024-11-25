import { TextFieldFormElement } from '@/components/fields/text-field';

export type ElementsType = 'TextField';

export type FormElementInstace = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, unknown>;
};

export type FormElement = {
  type: ElementsType;
  construct: (id: string) => FormElementInstace;
  designerButtonElement: {
    icon: React.ElementType;
    label: string;
  };
  designerComponent: React.FC;
  formComponent: React.FC;
  propertiesComponent: React.FC;
};

type FormElementsType = {
  [key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
};
