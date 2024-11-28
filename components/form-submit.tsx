'use client';

import { useCallback, useRef, useState, useTransition } from 'react';
import { Loader, MousePointerClick } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { FormElementInstace, FormElements } from '@/components/form-elements';
import { submitForm } from '@/actions/form';

interface FormSubmitProps {
  formUrl: string;
  formContent: FormElementInstace[];
}

export const FormSubmit = ({ formUrl, formContent }: FormSubmitProps) => {
  const { toast } = useToast();

  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});

  const [renderKey, setRenderKey] = useState(new Date().getTime());
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [isPending, startTransition] = useTransition();

  const validateForm: () => boolean = useCallback(() => {
    for (const field of formContent) {
      const formValue = formValues.current[field.id] ?? '';

      const isValid = FormElements[field.type].validate(field, formValue);

      if (!isValid) {
        formErrors.current[field.id] = true;
      }
    }

    if (Object.keys(formErrors.current).length > 0) {
      return false;
    }

    return true;
  }, [formContent]);

  const submitValue = useCallback((key: string, value: string) => {
    formValues.current[key] = value;
  }, []);

  const handleSubmitForm = async () => {
    formErrors.current = {};

    const isFormValid = validateForm();

    if (!isFormValid) {
      setRenderKey(new Date().getTime());

      toast({
        title: 'Invalid fields',
        description: 'Please check the form fields and try again.',
        variant: 'destructive',
      });

      return;
    }

    try {
      const stringifiedFormValues = JSON.stringify(formValues.current);

      await submitForm(formUrl, stringifiedFormValues);

      setHasSubmitted(true);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }

      toast({
        title: 'Error',
        description: 'An error occurred while submitting the form.',
        variant: 'destructive',
      });
    }
  };

  const handleSubmit = () => startTransition(handleSubmitForm);

  if (hasSubmitted) {
    return (
      <div className='flex justify-center w-full h-full items-center p-8'>
        <div className='max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded'>
          <h1 className='text-2xl font-bold'>Form submitted successfully!</h1>

          <p className='text-muted-foreground'>
            Thank you for submitting the form. You can close this window now.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='flex justify-center w-full h-full items-center p-8'>
      <div
        key={renderKey}
        className='max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded'
      >
        {formContent.map((element) => {
          const FormElement = FormElements[element.type].formComponent;

          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              submitValue={submitValue}
              isInvalid={formErrors.current[element.id]}
              defaultValue={formValues.current[element.id]}
            />
          );
        })}

        <Button disabled={isPending} onClick={handleSubmit} className='mt-8'>
          {isPending ? (
            <Loader className='animate-spin' />
          ) : (
            <>
              <MousePointerClick className='mr-2' />
              Submit
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
