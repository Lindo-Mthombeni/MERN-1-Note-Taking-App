import { createContext, useState, type ReactNode } from "react";

interface DeleteWindowContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  targetId: string | null;
  setTargetId: (id: string | null) => void;
  onDeleteSuccess: (id: string) => void;
}

export const DeleteWindowContext =
  createContext<DeleteWindowContextType | null>(null);

interface ProviderProps {
  children: ReactNode;
  onDeleteSuccess?: (id: string) => void;
}

export const DeleteWindowProvider = ({
  children,
  onDeleteSuccess,
}: ProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [targetId, setTargetId] = useState<string | null>(null);

  const handleDeleteSuccess = (id: string) => {
    if (onDeleteSuccess) {
      onDeleteSuccess(id);
    }
  };

  return (
    <DeleteWindowContext.Provider
      value={{
        isOpen,
        setIsOpen,
        targetId,
        setTargetId,
        onDeleteSuccess: handleDeleteSuccess,
      }}
    >
      {children}
    </DeleteWindowContext.Provider>
  );
};
