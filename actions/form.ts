'use server';

import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { formSchema } from '@/schemas';
import { type FormValues } from '@/types';

class UserNotFoundError extends Error {}

export const getFormStats = async () => {
  const user = await currentUser();

  if (!user) throw new UserNotFoundError();

  const stats = await prisma.form.aggregate({
    where: {
      userId: user.id,
    },
    _sum: {
      views: true,
      submissions: true,
    },
  });

  const views = stats._sum.views ?? 0;
  const submissions = stats._sum.submissions ?? 0;

  let submissionRate = 0;

  if (views > 0) {
    submissionRate = (submissions / views) * 100;
  }

  const bounceRate = 100 - submissionRate;

  return {
    views,
    submissions,
    submissionRate,
    bounceRate,
  };
};

export const createForm = async (data: FormValues) => {
  const validation = formSchema.safeParse(data);

  if (!validation.success) {
    throw new Error('Please provide valid form data.');
  }

  const user = await currentUser();

  if (!user) throw new UserNotFoundError();

  const { name, description } = data;

  const form = await prisma.form.create({
    data: {
      name,
      description,
      userId: user.id,
    },
  });

  if (!form) {
    throw new Error('Failed to create form.');
  }

  return form.id;
};

export const getForms = async () => {
  const user = await currentUser();

  if (!user) throw new UserNotFoundError();

  return await prisma.form.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });
};
