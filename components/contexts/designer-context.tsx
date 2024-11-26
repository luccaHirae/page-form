'use client';

import { createContext, useState } from 'react';
import { FormElementInstace } from '@/components/form-elements';

type DesignerContextType = {
  elements: FormElementInstace[];
  addElement: (index: number, element: FormElementInstace) => void;
};

export const DesignerContext = createContext<DesignerContextType | null>(null);

interface DesignerProviderProps {
  children: React.ReactNode;
}

export const DesignerProvider = ({ children }: DesignerProviderProps) => {
  const [elements, setElements] = useState<FormElementInstace[]>([]);

  const addElement = (index: number, element: FormElementInstace) => {
    setElements((prev) => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };

  const value = {
    elements,
    addElement,
  };

  return (
    <DesignerContext.Provider value={value}>
      {children}
    </DesignerContext.Provider>
  );
};
