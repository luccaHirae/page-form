'use client';

import { useEffect, useState } from 'react';
import { CirclePlus, CircleX, List } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDesigner } from '@/hooks/use-designer';
import { useToast } from '@/hooks/use-toast';
import { selectPropertiesSchema } from '@/schemas';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const type: ElementsType = 'SelectField';

const extraAttributes = {
  label: 'Select Field',
  helperText: 'This is a select field',
  required: false,
  placeholder: 'Select an option',
  options: [],
};

export const SelectFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    icon: List,
    label: 'Select Field',
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

      <Select>
        <SelectTrigger className='w-full'>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </Select>

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
  const { label, helperText, required, placeholder, options } =
    element.extraAttributes;

  const [value, setValue] = useState(defaultValue ?? '');
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const handleValueChange = (value: string) => {
    setValue(value);

    if (!submitValue) return;

    const isValid = SelectFieldFormElement.validate(element, value);
    setError(!isValid);
    submitValue(element.id, value);
  };

  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label className={cn(error && 'text-red-500')}>
        {label}
        {required && ' *'}
      </Label>

      <Select onValueChange={handleValueChange} defaultValue={value}>
        <SelectTrigger className={cn('w-full', error && 'border-red-500')}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

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

type formPropertiesType = z.infer<typeof selectPropertiesSchema>;

function PropertiesComponent({ elementInstance }: TextFieldProps) {
  const { updateElement, setSelectedElement } = useDesigner();
  const { toast } = useToast();

  const element = elementInstance as CustomInstance;
  const { label, helperText, required, placeholder, options } =
    element.extraAttributes;

  const form = useForm<formPropertiesType>({
    resolver: zodResolver(selectPropertiesSchema),
    mode: 'onSubmit',
    defaultValues: {
      label,
      helperText,
      required,
      placeholder,
      options,
    },
  });

  const applyChanges = (values: formPropertiesType) => {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        ...values,
      },
    });

    toast({
      title: 'Success',
      description: 'Changes saved successfully',
    });

    setSelectedElement(null);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') e.currentTarget.blur();
  };

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element.extraAttributes, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(applyChanges)} className='space-y-3'>
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

        <Separator />

        <FormField
          control={form.control}
          name='options'
          render={({ field }) => (
            <FormItem>
              <div className='flex justify-between items-center'>
                <FormLabel htmlFor={field.name}>Options</FormLabel>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    form.setValue('options', field.value.concat('New option'));
                  }}
                  variant='outline'
                  className='gap-2'
                >
                  <CirclePlus />
                  Add
                </Button>
              </div>

              <div className='flex flex-col gap-2'>
                {form.watch('options').map((option, index) => (
                  <div
                    key={index}
                    className='flex items-center justify-between gap-1'
                  >
                    <Input
                      placeholder=''
                      value={option}
                      onChange={(e) => {
                        field.value[index] = e.target.value;
                        field.onChange(field.value);
                      }}
                    />

                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={(e) => {
                        e.preventDefault();
                        // form.setValue('options', field.value.filter((_, i) => i !== index));
                        const newOptions = [...field.value];
                        newOptions.splice(index, 1);
                        field.onChange(newOptions);
                      }}
                    >
                      <CircleX />
                    </Button>
                  </div>
                ))}
              </div>

              <FormDescription>
                The helper text of the field. <br /> It will be displayed below
                the field.
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />

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

        <Separator />

        <Button type='submit' className='w-full'>
          Save
        </Button>
      </form>
    </Form>
  );
}
