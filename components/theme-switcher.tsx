'use client';

import { useTheme } from 'next-themes';
import { LaptopIcon, MoonIcon, SunIcon } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Tabs defaultValue={theme}>
      <TabsList className='border'>
        <TabsTrigger
          onClick={() => setTheme('light')}
          value='light'
          title='Light theme'
        >
          <SunIcon className='h-[1.2rem] w-[1.2rem]' />
        </TabsTrigger>

        <TabsTrigger
          onClick={() => setTheme('dark')}
          value='dark'
          title='Dark theme'
        >
          <MoonIcon className='h-[1.2rem] w-[1.2rem] rotate-90 transition-all dark:rotate-0' />
        </TabsTrigger>

        <TabsTrigger
          onClick={() => setTheme('system')}
          value='system'
          title='System theme'
        >
          <LaptopIcon className='h-[1.2rem] w-[1.2rem]' />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
