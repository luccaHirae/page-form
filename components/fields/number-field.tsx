'use client';

import { useEffect, useState } from 'react';
import { FileDigit } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDesigner } from '@/hooks/use-designer';
import { propertiesSchema } from '@/schemas';
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

const type: ElementsType = 'NumberField';

const extraAttributes = {
  label: 'Number Field',
  helperText: 'This is a number field',
  required: false,
  placeholder: '0',
};

export const NumberFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    icon: FileDigit,
    label: 'Number Field',
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
      return currentValue.trim().length > 0;
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
  const { label, helperText, required, placeholder } = element.extraAttributes;

  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label>
        {label}
        {required && ' *'}
      </Label>

      <Input type='number' readOnly disabled placeholder={placeholder} />

      {helperText && (
        <p className='text-muted-foreground text-[0.8rem]'>{helperText}</p>
      )}
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
  const { label, helperText, required, placeholder } = element.extraAttributes;

  const [value, setValue] = useState(defaultValue ?? '');
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isValid = NumberFieldFormElement.validate(element, e.target.value);

    if (isValid) {
      setError(false);
    }

    setValue(e.target.value);
  };

  const handleValueBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const isValid = NumberFieldFormElement.validate(element, e.target.value);

    if (!isValid) {
      setError(true);
      return;
    }

    if (submitValue) {
      submitValue(element.id, e.target.value);
    }
  };

  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label className={cn(error && 'text-red-500')}>
        {label}
        {required && ' *'}
      </Label>

      <Input
        type='number'
        placeholder={placeholder}
        value={value}
        onChange={handleValueChange}
        onBlur={handleValueBlur}
        className={cn(error && 'border-red-500')}
      />

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
  );
}

type formPropertiesType = z.infer<typeof propertiesSchema>;

function PropertiesComponent({ elementInstance }: TextFieldProps) {
  const { updateElement } = useDesigner();

  const element = elementInstance as CustomInstance;
  const { label, helperText, required, placeholder } = element.extraAttributes;

  const form = useForm<formPropertiesType>({
    resolver: zodResolver(propertiesSchema),
    mode: 'onBlur',
    defaultValues: {
      label,
      helperText,
      required,
      placeholder,
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
          name='placeholder'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Placeholder</FormLabel>

              <FormControl>
                <Input
                  onKeyDown={handleInputKeyDown}
                  id={field.name}
                  {...field}
                />
              </FormControl>

              <FormDescription>
                The placeholder of the field. <br /> It will be displayed inside
                the field.
              </FormDescription>

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
