import Link from 'next/link';
import { formatDistance } from 'date-fns';
import { ArrowRight, Edit, FormInput, View } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { type Form } from '@prisma/client';

interface FormCardProps {
  form: Form;
}

export const FormCard = ({ form }: FormCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 justify-between'>
          <span className='truncate font-bold'>{form.name}</span>

          {form.published ? (
            <Badge>Published</Badge>
          ) : (
            <Badge variant='destructive'>Draft</Badge>
          )}
        </CardTitle>

        <CardDescription className='flex items-center justify-between text-muted-foreground text-sm'>
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true,
          })}

          {!form.published && (
            <span className='flex items-center gap-2'>
              <View className='size-4 text-muted-foreground' />
              <span title='views'>{form.views.toLocaleString()}</span>

              <FormInput className='size-4 text-muted-foreground' />
              <span title='submissions'>
                {form.submissions.toLocaleString()}
              </span>
            </span>
          )}
        </CardDescription>
      </CardHeader>

      <CardContent className='h-[20px] truncate text-sm text-muted-foreground'>
        {form.description ?? 'No description'}
      </CardContent>

      <CardFooter>
        {form.published ? (
          <Button
            variant='secondary'
            asChild
            className='w-full mt-2 text-md gap-4'
          >
            <Link href={`/forms/${form.id}`}>
              View submissions
              <ArrowRight />
            </Link>
          </Button>
        ) : (
          <Button
            variant='secondary'
            asChild
            className='w-full mt-2 text-md gap-4'
          >
            <Link href={`/builder/${form.id}`}>
              Edit form
              <Edit />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
