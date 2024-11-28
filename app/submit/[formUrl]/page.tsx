import { getFormByUrl } from '@/actions/form';
import { FormElementInstace } from '@/components/form-elements';
import { FormSubmit } from '@/components/form-submit';

interface SubmitPageProps {
  params: {
    formUrl: string;
  };
}

export default async function SubmitPage({ params }: SubmitPageProps) {
  const form = await getFormByUrl(params?.formUrl);

  if (!form) throw new Error('Form not found.');

  const formContent = JSON.parse(form.content) as FormElementInstace[];

  return <FormSubmit formUrl={params.formUrl} formContent={formContent} />;
}
