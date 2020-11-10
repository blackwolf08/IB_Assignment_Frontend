import React, { useState } from 'react';

export default function MeetingsList() {
  const [state, setState] = useState([
    {
      id: 787878,
      interviewer: 'ss@djdj.com',
      interviewee: 'ss@djdj.com',
      startTime: Date.now().toLocaleString(),
      duration: '30',
    },
    {
      id: 787877,
      interviewer: 'ss@djdj.com',
      interviewee: 'ss@djdj.com',
      startTime: Date.now().toLocaleString(),
      duration: '30',
    },
  ]);
  return (
    <div className='bg-gray-100'>
      {state.map(({ id, duration, interviewee, interviewer, startTime }) => (
        <div key={id}>
          <p>{interviewee}</p>
        </div>
      ))}
    </div>
  );
}
