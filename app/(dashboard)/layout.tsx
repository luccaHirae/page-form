import { UserButton } from '@clerk/nextjs';
import { Logo } from '@/components/logo';
import { ThemeSwitcher } from '@/components/theme-switcher';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className='flex flex-col min-h-screen min-w-full bg-background max-h-screen'>
      <nav className='flex items-center justify-between border-b border-border h-[60px] px-4 py-2'>
        <Logo />
        <div className='flex gap-4 items-center'>
          <ThemeSwitcher />
          <UserButton />
        </div>
      </nav>

      <main className='flex w-full flex-grow'>{children}</main>
    </div>
  );
}
