import { getForms } from '@/actions/form';
import { FormCard } from '@/app/(dashboard)/components/form-card';

export const FormCardList = async () => {
  const forms = await getForms();

  return (
    <>
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
};
