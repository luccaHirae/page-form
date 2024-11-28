'use client';

import { useEffect } from 'react';
import { Type } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDesigner } from '@/hooks/use-designer';
import { paragraphPropertiesSchema } from '@/schemas';
import {
  ElementsType,
  FormElement,
  FormElementInstace,
} from '@/components/form-elements';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const type: ElementsType = 'ParagraphField';

const extraAttributes = {
  text: 'Text here',
};

export const ParagraphFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    icon: Type,
    label: 'Paragraph Field',
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: () => true,
};

type CustomInstance = FormElementInstace & {
  extraAttributes: typeof extraAttributes;
};

interface TextFieldProps {
  elementInstance: FormElementInstace;
}

function DesignerComponent({ elementInstance }: TextFieldProps) {
  const element = elementInstance as CustomInstance;
  const { text } = element.extraAttributes;

  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label className='text-muted-foreground'>Paragraph field</Label>

      <p>{text}</p>
    </div>
  );
}

interface FormTextFieldProps {
  elementInstance: FormElementInstace;
}

function FormComponent({ elementInstance }: FormTextFieldProps) {
  const element = elementInstance as CustomInstance;
  const { text } = element.extraAttributes;

  return <p>{text}</p>;
}

type formPropertiesType = z.infer<typeof paragraphPropertiesSchema>;

function PropertiesComponent({ elementInstance }: TextFieldProps) {
  const { updateElement } = useDesigner();

  const element = elementInstance as CustomInstance;
  const { text } = element.extraAttributes;

  const form = useForm<formPropertiesType>({
    resolver: zodResolver(paragraphPropertiesSchema),
    mode: 'onBlur',
    defaultValues: {
      text,
    },
  });

  const applyChanges = (values: formPropertiesType) => {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        ...values,
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') e.currentTarget.blur();
  };

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element.extraAttributes, form]);

  return (
    <Form {...form}>
      <form
        onBlur={form.handleSubmit(applyChanges)}
        onSubmit={handleSubmit}
        className='space-y-3'
      >
        <FormField
          control={form.control}
          name='text'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Text</FormLabel>

              <FormControl>
                <Textarea
                  rows={5}
                  onKeyDown={handleInputKeyDown}
                  id={field.name}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
