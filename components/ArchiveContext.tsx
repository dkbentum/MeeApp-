// ArchiveContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

type Post = {
  message: ReactNode; id: number; title: string; body: string 
};

type ArchiveContextType = {
  archivedPosts: Post[];
  archivePost: (post: Post) => void;
};

const ArchiveContext = createContext<ArchiveContextType | undefined>(undefined);

export const ArchiveProvider = ({ children }: { children: React.ReactNode }) => {
  const [archivedPosts, setArchivedPosts] = useState<Post[]>([]);

  const archivePost = (post: Post) => {
    setArchivedPosts((prev) => [...prev, post]);
  };

  return (
    <ArchiveContext.Provider value={{ archivedPosts, archivePost }}>
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
