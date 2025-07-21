import React, { createContext, useContext, useState, ReactNode } from 'react';

// Type for the context value
export type InterestsContextType = {
  interests: string[];
  setInterests: React.Dispatch<React.SetStateAction<string[]>>;
};

const InterestsContext = createContext<InterestsContextType | undefined>(undefined);

export const InterestsProvider = ({ children }: { children: ReactNode }) => {
  // Default interests can be empty or set to some defaults
  const [interests, setInterests] = useState<string[]>([
    'AI', 'React Native', 'Gaming', 'Robotics', 'Space', 'Music', 'Hacking',
  ]);

  return (
    <InterestsContext.Provider value={{ interests, setInterests }}>
      {children}
    </InterestsContext.Provider>
  );
};
export const useInterests = () => {
  const context = useContext(InterestsContext);
  if (!context) {
    throw new Error('useInterests must be used within an InterestsProvider');
  }
  return context;
}; 
