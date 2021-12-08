import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {MainReducerType} from "../../store/store";
import {AlertProps, Snackbar} from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import {setAppErrorAC} from "../../Reducers/app-reducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackBar() {
    //const [open, setOpen] = React.useState(true);

    const error = useSelector<MainReducerType, string | null>(state => state.app.error)
    const dispatch = useDispatch()

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppErrorAC({error: null}))
        //setOpen(false);
    };


    const isOpen = error !== null


    return (
        <Snackbar open={isOpen} autoHideDuration={3000} /*onClose={handleClose}*/>
            <Alert onClose={handleClose} severity="error">
                {error}
            </Alert>
        </Snackbar>
    );
}