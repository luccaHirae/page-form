'use client';

import { useEffect, useState } from 'react';
import { SquareCheckBig } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDesigner } from '@/hooks/use-designer';
import { datePropertiesSchema } from '@/schemas';
import {
  ElementsType,
  FormElement,
  FormElementInstace,
  SubmitValue,
} from '@/components/form-elements';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { Checkbox } from '../ui/checkbox';
import { CheckedState } from '@radix-ui/react-checkbox';

const type: ElementsType = 'CheckboxField';

const extraAttributes = {
  label: 'Checkbox Field',
  helperText: 'This is a checkbox field',
  required: false,
};

export const CheckboxFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    icon: SquareCheckBig,
    label: 'Checkbox Field',
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: (
    formElement: FormElementInstace,
    currentValue: string
  ): boolean => {
    const element = formElement as CustomInstance;

    if (element.extraAttributes.required) {
      return currentValue === 'true';
    }

    return true;
  },
};

type CustomInstance = FormElementInstace & {
  extraAttributes: typeof extraAttributes;
};

interface TextFieldProps {
  elementInstance: FormElementInstace;
}

function DesignerComponent({ elementInstance }: TextFieldProps) {
  const element = elementInstance as CustomInstance;
  const { label, helperText, required } = element.extraAttributes;
  const id = `checkbox-${element.id}`;

  return (
    <div className='flex items-top space-x-2'>
      <Checkbox id={id} />

      <div className='grid gap-1.5 leading-none'>
        <Label htmlFor={id}>
          {label}
          {required && ' *'}
        </Label>

        {helperText && (
          <p className='text-muted-foreground text-[0.8rem]'>{helperText}</p>
        )}
      </div>
    </div>
  );
}

interface FormTextFieldProps {
  elementInstance: FormElementInstace;
  submitValue?: SubmitValue;
  isInvalid?: boolean;
  defaultValue?: string;
}

function FormComponent({
  elementInstance,
  submitValue,
  isInvalid,
  defaultValue,
}: FormTextFieldProps) {
  const element = elementInstance as CustomInstance;
  const { label, helperText, required } = element.extraAttributes;

  const [value, setValue] = useState(defaultValue === 'true');
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const handleCheckboxChange = (checked: CheckedState) => {
    setValue(checked === true);

    if (!submitValue) return;

    const stringChecked = checked.toString();

    const isValid = CheckboxFieldFormElement.validate(element, stringChecked);
    setError(!isValid);
    submitValue(element.id, stringChecked);
  };

  const id = `checkbox-${element.id}`;

  return (
    <div className='flex items-top space-x-2'>
      <Checkbox
        id={id}
        checked={value}
        onCheckedChange={handleCheckboxChange}
        className={cn(error && 'border-red-500')}
      />

      <div className='grid gap-1.5 leading-none'>
        <Label htmlFor={id} className={cn(error && 'text-red-500')}>
          {label}
          {required && ' *'}
        </Label>

        {helperText && (
          <p
            className={cn(
              'text-muted-foreground text-[0.8rem]',
              error && 'text-red-500'
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    </div>
  );
}

// reusing the date properties schema as the checkbox field has the same properties
type formPropertiesType = z.infer<typeof datePropertiesSchema>;

function PropertiesComponent({ elementInstance }: TextFieldProps) {
  const { updateElement } = useDesigner();

  const element = elementInstance as CustomInstance;
  const { label, helperText, required } = element.extraAttributes;

  const form = useForm<formPropertiesType>({
    resolver: zodResolver(datePropertiesSchema),
    mode: 'onBlur',
    defaultValues: {
      label,
      helperText,
      required,
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

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
          name='label'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Label</FormLabel>

              <FormControl>
                <Input
                  onKeyDown={handleInputKeyDown}
                  id={field.name}
                  {...field}
                />
              </FormControl>

              <FormDescription>The label of the field.</FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='helperText'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Helper Text</FormLabel>

              <FormControl>
                <Input
                  onKeyDown={handleInputKeyDown}
                  id={field.name}
                  {...field}
                />
              </FormControl>

              <FormDescription>
                The helper text of the field. <br /> It will be displayed below
                the field.
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='required'
          render={({ field }) => (
            <FormItem className='flex items-center justify-between rounded-lg border p-3 shadow-sm'>
              <div className='space-y-0.5'>
                <FormLabel htmlFor={field.name}>Required</FormLabel>

                <FormDescription>
                  Whether the field is required or not.
                </FormDescription>
              </div>

              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
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
