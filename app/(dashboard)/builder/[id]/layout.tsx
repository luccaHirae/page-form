interface BuilderLayoutProps {
  children: React.ReactNode;
}

export default function BuilderLayout({ children }: BuilderLayoutProps) {
  return <div className='flex w-full flex-grow mx-auto'>{children}</div>;
}
