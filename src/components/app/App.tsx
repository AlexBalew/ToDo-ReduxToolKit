import React, { ReactElement, useCallback, useEffect } from 'react';

import '../../App.css';
import { Menu } from '@mui/icons-material';
import {
  AppBar,
  Button,
  CircularProgress,
  Container, createTheme,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Navigate } from 'react-router';
import { Route, Routes } from 'react-router-dom';

import { ErrorSnackBar, Login, TodoLists } from 'components';
import { initializeAppTC, RequestStatusType } from 'Reducers/app-reducer';
import { logOutTC } from 'Reducers/authReducer';
import { TodolistDomainType } from 'Reducers/todolist-reducer';
import { MainReducerType } from 'store/mainReducer';
import { Nullable } from 'types';

export const theme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#ff4400',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

export type TodoListsType = Array<TodolistDomainType>;
const App = (): Nullable<ReactElement> => {
  // check App return type
  const dispatch = useDispatch();
  const isInitialized = useSelector<MainReducerType, boolean>(
    state => state.app.isAppInitialized,
  );
  const isLoggedIn = useSelector<MainReducerType, boolean>(
    state => state.login.isLoggedIn,
  );
  const status = useSelector<MainReducerType, RequestStatusType>(
    state => state.app.status,
  );

  useEffect(() => {
    if (!isInitialized) {
      dispatch(initializeAppTC());
    }
  }, [dispatch]);

  const logOutHandler = useCallback(() => {
    // dispatch(clearReduxAC()) //fix tasks fetching
    dispatch(logOutTC());
  }, [dispatch]);

  if (!isInitialized) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30%' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div
      style={{
        flexGrow: 1,
        background: '#E0E0E0',
        minHeight: '100vh',
        paddingBottom: '20px',
      }}
    >
      <AppBar position="static" color="default">
        <Toolbar>
          <ErrorSnackBar />
          <IconButton
            edge="start"
            style={{ marginRight: 2 }}
            color="inherit"
            aria-label="menu"
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }} align="center">
            ToDoList
          </Typography>
          {isLoggedIn && (
            <Button
              color="inherit"
              onClick={() => {
                logOutHandler();
              }}
            >
              Log out
            </Button>
          )}
        </Toolbar>
        {status === 'loading' && <LinearProgress color="secondary" />}
      </AppBar>
      <Container fixed>
        <Routes>
          <Route path="/TodoList-v2" element={<Navigate to="login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<TodoLists />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
