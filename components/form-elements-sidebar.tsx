import { SidebarButtonElement } from '@/components/sidebar-button-element';
import { FormElements } from '@/components/form-elements';

export const FormElementsSidebar = () => {
  return (
    <div>
      <h2 className='text-lg text-muted-foreground font-bold'>Elements</h2>

      <SidebarButtonElement formElement={FormElements.TextField} />
    </div>
  );
};
