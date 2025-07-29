// ArchiveContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// This is just a template for context structure. The actual InterestsContext will be created in a new file.

type ArchiveContextType = {
  archivedMessages: any[];
  setArchivedMessages: React.Dispatch<React.SetStateAction<any[]>>;
  removeFromArchive: (id: number) => void;
  archivedPosts: any[];
};

const ArchiveContext = createContext<ArchiveContextType | undefined>(undefined);

export const ArchiveProvider = ({ children }: { children: ReactNode }) => {
  const [archivedMessages, setArchivedMessages] = useState<any[]>([]);

  const removeFromArchive = (id: number) => {
    setArchivedMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  return (
    <ArchiveContext.Provider value={{ archivedMessages, setArchivedMessages, removeFromArchive, archivedPosts: archivedMessages }}>
      {children}
    </ArchiveContext.Provider>
  );
};

export const useArchive = () => {
  const context = useContext(ArchiveContext);
  if (!context) {
    throw new Error('useArchive must be used within an ArchiveProvider');
  }
  return context;
};
