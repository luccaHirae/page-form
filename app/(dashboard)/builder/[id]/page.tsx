import { getFormById } from '@/actions/form';
import { FormBuilder } from '@/components/form-builder';

interface BuilderPageProps {
  params: {
    id: string;
  };
}

export default async function BuilderPage({ params }: BuilderPageProps) {
  const { id } = await params;

  const form = await getFormById(Number(id));

  if (!form) throw new Error('Form not found.');

  return <FormBuilder form={form} />;
}
