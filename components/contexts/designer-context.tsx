'use client';

import { createContext, Dispatch, SetStateAction, useState } from 'react';
import { FormElementInstace } from '@/components/form-elements';

type DesignerContextType = {
  elements: FormElementInstace[];
  addElement: (index: number, element: FormElementInstace) => void;
  removeElement: (id: string) => void;
  selectedElement: FormElementInstace | null;
  setSelectedElement: Dispatch<SetStateAction<FormElementInstace | null>>;
  updateElement: (id: string, element: FormElementInstace) => void;
};

export const DesignerContext = createContext<DesignerContextType | null>(null);

interface DesignerProviderProps {
  children: React.ReactNode;
}

export const DesignerProvider = ({ children }: DesignerProviderProps) => {
  const [elements, setElements] = useState<FormElementInstace[]>([]);
  const [selectedElement, setSelectedElement] =
    useState<FormElementInstace | null>(null);

  const addElement = (index: number, element: FormElementInstace) => {
    setElements((prev) => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };

  const removeElement = (id: string) => {
    setElements((prev) => prev.filter((element) => element.id !== id));
  };

  const updateElement = (id: string, element: FormElementInstace) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, ...element } : el))
    );
  };

  const value = {
    elements,
    addElement,
    removeElement,
    selectedElement,
    setSelectedElement,
    updateElement,
  };

  return (
    <DesignerContext.Provider value={value}>
      {children}
    </DesignerContext.Provider>
  );
};
