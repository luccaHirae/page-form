'use client';

import { useEffect, useState } from 'react';
import { Calendar1 } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
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
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

const type: ElementsType = 'DateField';

const extraAttributes = {
  label: 'Date Field',
  helperText: 'Pick a date',
  required: false,
};

export const DateFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    icon: Calendar1,
    label: 'Date Field',
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
  const { label, helperText, required } = element.extraAttributes;

  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label>
        {label}
        {required && ' *'}
      </Label>

      <Button
        variant='outline'
        className='w-full justify-start text-left font-normal'
      >
        <Calendar1 className='mr-2 size-4' />
        <span>Pick a date</span>
      </Button>

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
  const { label, helperText, required } = element.extraAttributes;

  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : undefined
  );
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const handleSelect = (date: Date | undefined) => {
    setDate(date);

    if (!submitValue) return;

    const value = date?.toUTCString() ?? '';
    const isValid = DateFieldFormElement.validate(element, value);
    setError(!isValid);
    submitValue(element.id, value);
  };

  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label className={cn(error && 'text-red-500')}>
        {label}
        {required && ' *'}
      </Label>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            className={cn(
              'w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground',
              error && 'border-red-500'
            )}
          >
            <Calendar1 className='mr-2 size-4' />
            {date ? format(date, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>

        <PopoverContent align='start' className='w-auto p-0'>
          <Calendar
            mode='single'
            selected={date}
            onSelect={handleSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>

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
