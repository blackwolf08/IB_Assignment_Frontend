import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useAppContext } from '../contexts';

export default function HomeScreen() {
  const { date, setDate } = useAppContext();

  return (
    <div className='flex flex-row h-full'>
      <div className='flex-initial bg-gray-200 py-2 px-10'>
        <h2>Calendar</h2>
        <DatePicker selected={date} onChange={(date) => setDate(date)} />
      </div>
      <div className='flex-1 bg-gray-400'>
        <p>Timeline</p>
      </div>
    </div>
  );
}
