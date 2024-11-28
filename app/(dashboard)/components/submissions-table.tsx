interface SubmissionsTableProps {
  formId: number;
}

export const SubmissionsTable = ({ formId }: SubmissionsTableProps) => {
  return (
    <div>
      <h1 className='text-2xl font-bold my-4'>Submissions {formId}</h1>
    </div>
  );
};
