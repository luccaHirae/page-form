import { useContext } from 'react';
import { DesignerContext } from '@/components/contexts/designer-context';

export function useDesigner() {
  const context = useContext(DesignerContext);

  if (!context) {
    throw new Error('useDesigner must be used within a DesignerProvider');
  }

  return context;
}
