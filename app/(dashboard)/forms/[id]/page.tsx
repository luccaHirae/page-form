import { getFormById } from '@/actions/form';

interface FormsPageProps {
  params: {
    id: string;
  };
}

export default async function FormsPage({ params }: FormsPageProps) {
  const form = await getFormById(Number(params?.id));

  if (!form) throw new Error('Form not found.');

  return (
    <div>
      <h1>{form.name}</h1>
    </div>
  );
}
