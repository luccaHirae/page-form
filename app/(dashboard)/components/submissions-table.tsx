import { ReactNode } from 'react';
import { format, formatDistance } from 'date-fns';
import { getFormWithSubmissions } from '@/actions/form';
import { ElementsType, FormElementInstace } from '@/components/form-elements';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

interface SubmissionsTableProps {
  formId: number;
}

interface Column {
  id: string;
  label: string;
  required: boolean;
  type: ElementsType;
}

interface Row {
  [key: string]: string;
}

export const SubmissionsTable = async ({ formId }: SubmissionsTableProps) => {
  const form = await getFormWithSubmissions(formId);

  if (!form) throw new Error('Form not found');

  const formElements = JSON.parse(form.content) as FormElementInstace[];

  const columns: Column[] = [];

  formElements.forEach((element) => {
    switch (element.type) {
      case 'TextField':
      case 'NumberField':
      case 'TextAreaField':
      case 'DateField':
      case 'SelectField':
      case 'CheckboxField':
        columns.push({
          id: element.id,
          label: element.extraAttributes?.label || '',
          required: element.extraAttributes?.required || false,
          type: element.type,
        });
        break;
      default:
        break;
    }
  });

  const rows: Row[] = [];

  form.FormSubmission.forEach((submission) => {
    const content = JSON.parse(submission.content);

    rows.push({
      ...content,
      submittedAt: submission.createdAt,
    });
  });

  return (
    <div>
      <h1 className='text-2xl font-bold my-4'>Submissions</h1>

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.id} className='uppercase'>
                  {column.label}
                </TableHead>
              ))}

              <TableHead className='text-muted-foreground text-right uppercase'>
                Submitted At
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <RowCell
                    key={column.id}
                    type={column.type}
                    value={row[column.id]}
                  />
                ))}

                <TableCell className='text-muted-foreground text-right'>
                  {formatDistance(row.submittedAt, new Date(), {
                    addSuffix: true,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

interface RowCellProps {
  type: ElementsType;
  value: string;
}

const RowCell = ({ type, value }: RowCellProps) => {
  let node: ReactNode = value;

  switch (type) {
    case 'DateField':
      if (!value) break;
      const date = new Date(value);
      node = <Badge variant='outline'>{format(date, 'dd/MM/yyyy')}</Badge>;
      break;
    case 'CheckboxField':
      const checked = value === 'true';
      node = <Checkbox checked={checked} disabled />;
      break;
  }

  return <TableCell>{node}</TableCell>;
};
