import { getFormById } from '@/actions/form';
import { FormBuilder } from '@/components/form-builder';

interface BuilderPageProps {
  params: {
    id: string;
  };
}

export default async function BuilderPage({ params }: BuilderPageProps) {
  const form = await getFormById(Number(params?.id));

  if (!form) throw new Error('Form not found.');

  return <FormBuilder form={form} />;
}
