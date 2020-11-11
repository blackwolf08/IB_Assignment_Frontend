import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Button,
  Modal,
  CircularProgress,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { CreateInterviewStepper } from './CreateInterviewStepper';
import { useAppContext } from '../contexts/AppContext';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: 10,
  },
  content: {
    position: 'relative',
  },
  button: {
    flex: 1,
    paddingTop: '2rem',
    paddingBottom: '2rem',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function MeetingsList() {
  const classes = useStyles();
  let { interviewList, loading, fetchInterviews } = useAppContext();

  useEffect(() => {
    fetchInterviews();
  }, []);

  const [isAddNewInterviewModalOpen, setIsAddNewInterviewModalOpen] = useState(
    false
  );

  const handleModalClose = () => {
    setIsAddNewInterviewModalOpen(false);
  };
  return (
    <>
      <Modal
        className={classes.modal}
        open={isAddNewInterviewModalOpen}
        onClose={handleModalClose}
      >
        <span>
          <CreateInterviewStepper />
        </span>
      </Modal>
      <div className='bg-gray-300 p-4'>
        <h1 className='font-bold text-center mb-4'>
          Interviews Scheduled for Today
        </h1>
        <Card className={classes.root}>
          <div className='add-new-interview'>
            <Button
              onClick={() => setIsAddNewInterviewModalOpen(true)}
              className={classes.button}
            >
              <Add />
            </Button>
          </div>
        </Card>
        {loading && (
          <div className='text-center'>
            <CircularProgress />
          </div>
        )}
        {interviewList?.map(
          ({ id, duration, interviewee, interviewer, star_time }) => (
            <Card className={classes.root} key={id}>
              <CardContent className={classes.content}>
                <div className='flex flex-col content-around'>
                  <h6 className='mb-4'>{`Interviewer ${interviewer}`}</h6>
                  <h6>{`Interviewee ${interviewee}`}</h6>
                </div>
                <div className='duration-container bg-gray-200'>{duration}</div>
              </CardContent>
            </Card>
          )
        )}
      </div>
    </>
  );
}
