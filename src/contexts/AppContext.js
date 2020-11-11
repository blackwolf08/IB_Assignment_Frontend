import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { BASE_URI, ROUTES } from '../utils';
const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [date, setDate] = useState(new Date());
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newInterviewDetails, setNewInterviewDetails] = useState({
    duration: '',
    start_time: '',
    end_time: '',
    interviewer: '',
    interviewee: '',
  });

  const fetchInterviews = async () => {
    setLoading(true);
    try {
      let { data } = await axios.get(BASE_URI + ROUTES.getInterviews);
      setInterviewList(data);
    } catch (err) {
      console.log(`Fetch Interview req failed with error ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        date,
        setDate,
        fetchInterviews,
        interviewList,
        loading,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
