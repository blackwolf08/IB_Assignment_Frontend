import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URI, ROUTES } from '../utils';
import moment from 'moment';
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

  useEffect(() => {
    fetchInterviews(date);
  }, [date]);

  const fetchInterviews = async (date) => {
    setLoading(true);
    try {
      let _date = moment(date).format('YYYY-MM-DD');
      let { data } = await axios.get(
        BASE_URI + ROUTES.getInterviews + `?date=${_date}`
      );
      setInterviewList(data);
    } catch (err) {
      console.log(`Fetch Interview req failed with error ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const isUserAvailable = async ({
    start_time,
    end_time,
    email,
    user_role,
  }) => {
    const URL =
      BASE_URI +
      ROUTES.isUserAvailable +
      `?start_time=${start_time}&end_time=${end_time}&email=${email}&user_role=${user_role}`;
    console.log(URL);

    let { data } = await axios.get(URL);
    return data;
  };

  const isUserModificationAvailable = async ({
    start_time,
    end_time,
    email,
    user_role,
    id,
  }) => {
    const URL =
      BASE_URI +
      ROUTES.isUserModificationAvailable +
      `?start_time=${start_time}&end_time=${end_time}&email=${email}&user_role=${user_role}&id=${id}`;

    let { data } = await axios.get(URL);
    return data;
  };

  const scheduleNewInterview = async ({
    start_time,
    end_time,
    interviewee,
    interviewer,
    duration,
  }) => {
    let data = new FormData();
    data.append('start_time', start_time);
    data.append('end_time', end_time);
    data.append('interviewer', interviewer);
    data.append('interviewee', interviewee);
    data.append('duration', duration);

    await axios({
      method: 'post',
      url: `${BASE_URI}${ROUTES.addInterview}`,
      data,
      config: { headers: { 'Content-Type': 'multipart/form-data' } },
    });
    await fetchInterviews();
    // await axios.post(BASE_URI + ROUTES, {
    //   start_time,
    //   end_time,
    //   interviewee,
    //   interviewer,
    //   duration,
    // });
  };
  const modifyNewInterview = async ({
    start_time,
    end_time,
    interviewee,
    interviewer,
    duration,
  }) => {
    let data = new FormData();
    data.append('start_time', start_time);
    data.append('end_time', end_time);
    data.append('interviewer', interviewer);
    data.append('interviewee', interviewee);
    data.append('duration', duration);

    await axios({
      method: 'post',
      url: `${BASE_URI}${ROUTES.modify}`,
      data,
      config: { headers: { 'Content-Type': 'multipart/form-data' } },
    });
    await fetchInterviews();
    // await axios.post(BASE_URI + ROUTES, {
    //   start_time,
    //   end_time,
    //   interviewee,
    //   interviewer,
    //   duration,
    // });
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
        setNewInterviewDetails,
        scheduleNewInterview,
        isUserAvailable,
        isUserModificationAvailable,
        modifyNewInterview,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
