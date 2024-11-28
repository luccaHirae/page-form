interface FormsLayoutProps {
  children: React.ReactNode;
}

export default function FormsLayout({ children }: FormsLayoutProps) {
  return (
    <div className='flex flex-col w-full flex-grow mx-auto'>{children}</div>
  );
}
