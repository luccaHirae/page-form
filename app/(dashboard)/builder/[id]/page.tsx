import { getFormById } from '@/actions/form';

interface BuilderPageProps {
  params: {
    id: string;
  };
}

export default async function BuilderPage({ params }: BuilderPageProps) {
  const form = await getFormById(Number(params?.id));

  if (!form) throw new Error('Form not found.');

  return (
    <div>
      <h1>Builder page</h1>

      <p>Form name: {form.name}</p>
    </div>
  );
}
