import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { BASE_URI, ROUTES } from '../utils';
const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [date, setDate] = useState(new Date());

  const fetchInterviews = async () => {
    try {
      let { data } = await axios.get(BASE_URI + ROUTES.getInterviews);
      console.log(data);
    } catch (err) {
      console.log(`Fetch Interview req failed with error ${err}`);
    }
  };

  return (
    <AppContext.Provider value={{ date, setDate, fetchInterviews }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
