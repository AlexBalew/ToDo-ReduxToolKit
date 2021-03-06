import React from 'react';

import { AlertProps, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';

import { setAppErrorAC } from 'Reducers/app-reducer';
import { MainReducerType } from 'store/mainReducer';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

export const ErrorSnackBar = () => {
  // const [open, setOpen] = React.useState(true);

  const error = useSelector<MainReducerType, string | null>(state => state.app.error);
  const dispatch = useDispatch();

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setAppErrorAC({ error: null }));
    // setOpen(false);
  };

  const isOpen = error !== null;

  return (
    <Snackbar open={isOpen} autoHideDuration={3000} /* onClose={handleClose} */>
      <Alert onClose={handleClose} severity="error">
        {error}
      </Alert>
    </Snackbar>
  );
};
