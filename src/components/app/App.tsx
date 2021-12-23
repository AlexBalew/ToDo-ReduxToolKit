import React, {useCallback, useEffect} from 'react';
import '../../App.css';
import {TodoLists} from "../todoList/TodoLists";
import {useDispatch, useSelector} from "react-redux";
import {MainReducerType} from "../../store/store";
import {TodolistDomainType} from "../../Reducers/todolist-reducer";
import {ErrorSnackBar} from "../errorSnackBar/ErrorSnackBar";
import {initializeAppTC, RequestStatusType} from "../../Reducers/app-reducer";
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {logOutTC} from '../../Reducers/authReducer';
import {Route, Routes} from "react-router-dom";
import {Login} from "../login/login";
import {Navigate} from "react-router";

export type TodoListsType = Array<TodolistDomainType>

type PropsType = {
}

function App(props: PropsType) {

    const dispatch = useDispatch()
    const isInitialized = useSelector<MainReducerType, boolean>(state => state.app.isAppInitialized)
    const isLoggedIn = useSelector<MainReducerType, boolean>(state => state.login.isLoggedIn)
    const status = useSelector<MainReducerType, RequestStatusType>(state => state.app.status)

    useEffect(() => {
        if (!isInitialized) {
            dispatch(initializeAppTC())
        }
    }, [dispatch])

    const logOutHandler = useCallback(() => {
        //dispatch(clearReduxAC()) //fix tasks fetching
        dispatch(logOutTC())
    }, [dispatch])


    if (!isInitialized) {
        return <div style={{display: "flex", justifyContent: "center", marginTop: "30%"}}><CircularProgress/></div>
    }

    return (
        <div style={{flexGrow: 1, background: '#E0E0E0', minHeight: '100vh', paddingBottom: '20px'}}>
            <AppBar position="static" color="default">
                <Toolbar>
                    <ErrorSnackBar/>
                    <IconButton edge="start" style={{marginRight: 2}} color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" style={{flexGrow: 1}} align='center'>
                        ToDoList
                    </Typography>
                    {isLoggedIn && <Button color="inherit" onClick={() => {
                        logOutHandler()
                    }}>Log out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress color={'secondary'}/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path={'/TodoList-v2'} element={<Navigate to={'login'}/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/'} element={<TodoLists/>}/>
                </Routes>
            </Container>
        </div>
    );
}

export default App




