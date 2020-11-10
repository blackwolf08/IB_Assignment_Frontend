import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [date, setDate] = useState(new Date());
  return (
    <AppContext.Provider value={{ date, setDate }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
