import { SidebarButtonElement } from '@/components/sidebar-button-element';
import { FormElements } from '@/components/form-elements';
import { Separator } from '@/components/ui/separator';

export const FormElementsSidebar = () => {
  return (
    <div>
      <p className='text-sm text-foreground/70'>Drag and drop elements</p>

      <Separator className='my-2' />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center'>
        <p className='text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start'>
          Layout elements
        </p>

        <SidebarButtonElement formElement={FormElements.TitleField} />
        <SidebarButtonElement formElement={FormElements.SubtitleField} />
        <SidebarButtonElement formElement={FormElements.ParagraphField} />
        <SidebarButtonElement formElement={FormElements.SeparatorField} />
        <SidebarButtonElement formElement={FormElements.SpacerField} />

        <p className='text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start'>
          Form elements
        </p>

        <SidebarButtonElement formElement={FormElements.TextField} />
        <SidebarButtonElement formElement={FormElements.NumberField} />
        <SidebarButtonElement formElement={FormElements.TextAreaField} />
        <SidebarButtonElement formElement={FormElements.DateField} />
        <SidebarButtonElement formElement={FormElements.SelectField} />
        <SidebarButtonElement formElement={FormElements.CheckboxField} />
      </div>
    </div>
  );
};
