import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../addItemForm/AddItemForm";
import {
    addTodolistTC, changeTDlFilterAC,
    changeTodolistTitleTC,
    FilterType,
    getTodolistsTC,
    removeTodolistsTC
} from "../../Reducers/todolist-reducer";
import {TaskStatuses} from "../../api/Todolists.api";
import {useDispatch, useSelector} from "react-redux";
import {
    addTaskTC,
    changeTaskStatusTC,
    changeTaskTitleTC,
    deleteTaskTC,
    TasksStateType
} from "../../Reducers/tasks.reducer";
import {Grid, Paper} from "@mui/material";
import {TodoListsType} from "../app/App";
import {TodoList} from "./todolist/todolist";
import {Navigate} from "react-router-dom";
import {MainReducerType} from "../../store/mainReducer";


export type ToDoListPropsType = {
}


export const TodoLists = React.memo((props: ToDoListPropsType) => {

    const dispatch = useDispatch();
    const todolistsFromState = useSelector<MainReducerType, TodoListsType>(state => state.todoLists)
    const tasksFromState = useSelector<MainReducerType, TasksStateType>(state => state.tasks)
    const isLoggedIn = useSelector<MainReducerType, boolean>(state => state.login.isLoggedIn)

    useEffect(() => {
        if(!todolistsFromState.length) {
            dispatch(getTodolistsTC())
        }
    }, [])


    const addTask = useCallback((todolistID: string, title: string) => {
        dispatch(addTaskTC({todolistID, title}))
    }, [dispatch])

    const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
        dispatch(changeTaskStatusTC({todolistId, taskId, status}))
    }, [dispatch])

    const deleteTask = useCallback((todolistID: string, taskId: string) => {
        dispatch(deleteTaskTC({todolistID, taskId}))
    }, [dispatch])

    const onChangeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleTC({todolistId, taskId, title}))
    }, [dispatch])
    const changeFilter = useCallback((filter: FilterType, todolistId: string) => {
        dispatch(changeTDlFilterAC({filter, todolistId}))
    }, [dispatch])

    const removeTDFunc = useCallback((todolistId: string) => {
        dispatch(removeTodolistsTC({todolistId}))
    }, [dispatch])

    const addTDList = useCallback((title: string) => {
        dispatch(addTodolistTC({title}))
    }, [dispatch])

    const changeTDListTitleAPP = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleTC({todolistId, title}))
    }, [dispatch])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    console.log(1111)

    return (
        <>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm callback={addTDList} label={'new todolist title'}/>
            </Grid>
            <Grid container spacing={4}>
                {todolistsFromState.map(tl => {
                        let filteredTasks = tasksFromState[tl.id]

                        return <Grid item>
                            <Paper style={{padding: '10px'}}>
                                <TodoList
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={filteredTasks}
                                    deleteTask={deleteTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    removeTDFunc={removeTDFunc}
                                    onChangeTaskTitle={onChangeTaskTitle}
                                    changeTDListTitleAPP={changeTDListTitleAPP}
                                    todolist={tl}
                                />
                            </Paper>
                        </Grid>
                    }
                )}
            </Grid>
        </>


    )
})


