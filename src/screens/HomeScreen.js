import React from 'react';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { MeetingsList } from '../components';
import DateFnsUtils from '@date-io/date-fns';
import { useAppContext } from '../contexts';
import { Typography } from '@material-ui/core';
export default function HomeScreen() {
  const { date, setDate } = useAppContext();

  return (
    <div className='flex flex-row h-full'>
      <div className='flex-initial bg-gray-200 py-2 px-10'>
        <Typography variant='h6'>Select Date</Typography>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin='normal'
            id='date-picker-dialog'
            format='dd/MM/yyyy'
            value={date}
            onChange={setDate}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
      </div>
      <div className='flex-1 bg-gray-300'>
        <MeetingsList />
      </div>
    </div>
  );
}
