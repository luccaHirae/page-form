import { FormElements } from '@/components/form-elements';
import { SidebarButtonElement } from '@/components/sidebar-button-element';

export const DesignerSidebar = () => {
  return (
    <aside className='w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full'>
      <h2 className='text-lg text-muted-foreground font-bold'>Elements</h2>

      <SidebarButtonElement formElement={FormElements.TextField} />
    </aside>
  );
};
