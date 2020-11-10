import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { Input } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: '#fff',
    padding: '2rem',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const getSteps = () => {
  return ['What time?', 'Duration?', 'Select Interviewer and Interviewee'];
};

export function CreateInterviewStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [duration, setDuration] = useState('');
  const [error, setError] = useState(false);
  const steps = getSteps();
  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2014-08-18T21:11:54')
  );

  const handleDurationChange = (duration) => {
    let re = /^\d+$/g;
    setDuration(duration);
    if (!re.test(duration)) {
      setError(true);
      return;
    }
    setError(false);
  };

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <div className='text-center'>
            <KeyboardTimePicker
              margin='normal'
              id='time-picker'
              value={selectedDate}
              onChange={setSelectedDate}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </div>
        );
      case 1:
        return (
          <div className='text-center'>
            <h6 className='font-bold'>Duration in minutes...</h6>
            <Input
              value={duration}
              placeholder={30}
              onChange={(e) => handleDurationChange(e.target.value)}
              error={error}
            />
          </div>
        );
      case 2:
        return 'This is the bit I really care about!';
      default:
        return 'Unknown stepIndex';
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={classes.root}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((step, _id) => (
            <Step key={_id}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep !== steps.length && (
            <div className='text-center'>
              <Typography className={classes.instructions}>
                {getStepContent(activeStep)}
              </Typography>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleNext}
                  disabled={error}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </MuiPickersUtilsProvider>
    </div>
  );
}
