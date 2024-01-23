// TalentContext.tsx
import React, { createContext, useContext, useState } from 'react';

// Define the context shape
interface TalentContextType {
  page: number;
  setPage: (newPage: number) => void;
  talentsPerPage: number;
  setTalentsPerPage: (newVal: number) => void;
}

// Create the context with default values
const TalentContext = createContext<TalentContextType>({
  page: 0,
  setPage: () => {},
  talentsPerPage: 10,
  setTalentsPerPage: () => {},
});

// Provider component
export const TalentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [page, setPage] = useState(0);
  const [talentsPerPage, setTalentsPerPage] = useState(10);

  return (
    <TalentContext.Provider value={{ page, setPage, talentsPerPage, setTalentsPerPage }}>
      {children}
    </TalentContext.Provider>
  );
};

// Hook to use the context
export const useTalentContext = () => {
  const context = useContext(TalentContext);
  if (!context) {
    throw new Error('useTalentContext must be used within a TalentProvider');
  }
  return context;
};

export default TalentContext;
