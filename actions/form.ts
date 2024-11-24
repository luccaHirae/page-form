'use server';

import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';

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
