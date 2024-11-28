import { TextFieldFormElement } from '@/components/fields/text-field';
import { TitleFieldFormElement } from '@/components/fields/title-field';

export type ElementsType = 'TextField' | 'TitleField';

export type SubmitValue = (key: string, value: string) => void;

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
  formComponent: React.FC<{
    elementInstance: FormElementInstace;
    submitValue?: SubmitValue;
    isInvalid?: boolean;
    defaultValue?: string;
  }>;
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstace;
  }>;
  validate: (formElement: FormElementInstace, currentValue: string) => boolean;
};

type FormElementsType = {
  [key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
  TitleField: TitleFieldFormElement,
};
