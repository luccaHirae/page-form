'use client';

import dynamic from 'next/dynamic';
import {
  ThemeProvider as StaticThemeProvider,
  ThemeProviderProps,
} from 'next-themes';

// necessary to prevent an hydration error
// other solution could be adding the 'suppressHydrationWarning' prop to the <html> tag
// read more: https://github.com/shadcn-ui/ui/issues/5552
const DynamicThemeProvider = dynamic(
  () => import('next-themes').then((mod) => mod.ThemeProvider),
  {
    ssr: false,
  }
);

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const NextThemesProvider =
    process.env.NODE_ENV === 'production'
      ? StaticThemeProvider
      : DynamicThemeProvider;

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
