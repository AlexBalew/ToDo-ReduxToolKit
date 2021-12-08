import {ResponseTaskType, tasksAPI, TaskStatuses} from "../api/Todolists.api";
import {Dispatch} from "redux";
import {MainReducerType} from "../store/store";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTDlAC, removeTDlAC, setTodolistsAC} from "./todolist-reducer";
import {setAppStatusAC} from "./app-reducer";



export type TasksStateType = {
    [key: string]: Array<ResponseTaskType>
}
let initialState: TasksStateType = {}

export const sliceTasks = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        deleteTaskAC(state, action: PayloadAction<{ todolistId: string, taskId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(task => task.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        addTaskAC(state, action: PayloadAction<{ task: ResponseTaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        onChangeTaskTitleAC(state, action: PayloadAction<{ todolistId: string, taskId: string, title: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(task => task.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], title: action.payload.title}
            }
        },
        changeTaskStatusAC(state, action: PayloadAction<{ todolistID: string, taskID: string, status: TaskStatuses }>) {
            const tasks = state[action.payload.todolistID]
            const index = tasks.findIndex(task => task.id === action.payload.taskID)
            if (index > -1) {
                tasks[index] = {...tasks[index], status: action.payload.status}
            }
        },
        setTasksAC(state, action: PayloadAction<{ todolistID: string, tasks: Array<ResponseTaskType> }>) {
            state[action.payload.todolistID] = action.payload.tasks
        },
        clearReduxAC(state, action: PayloadAction) {
            debugger
          //state = {}
       },
    },
    extraReducers: (builder) => {
        debugger
        builder.addCase(addTDlAC, (state, action) => {
            state[action.payload.todoList.id] = []
        })
        builder.addCase(removeTDlAC, (state, action) => {
            delete state[action.payload.id]
        })
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach((tl: any) => {
                state[tl.id] = []
            })
        })
    }
})

export const {
    deleteTaskAC,
    addTaskAC,
    onChangeTaskTitleAC,
    changeTaskStatusAC,
    setTasksAC,
    clearReduxAC
} = sliceTasks.actions



export const getTasksTC = (todolistID: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    tasksAPI.getTasks(todolistID)
        .then(res => {
                if (res.data.error == null) {
                    dispatch(setTasksAC({todolistID, tasks: res.data.items}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                } else {
                    // handleServerAppError(res, dispatch)
                }
            }
        )
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    tasksAPI.deleteTask(todolistId, taskId)
        .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(deleteTaskAC({todolistId, taskId}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            }
        )
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    tasksAPI.createTask(todolistId, title)
        .then((res) => {
                if (res.data.resultCode === 0) {
                    const task = res.data.data.item
                    const action = addTaskAC({task})
                    dispatch(action)
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            }
        )
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const changeTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses) =>
    (dispatch: Dispatch, getState: () => MainReducerType) => {
        dispatch(setAppStatusAC({status: 'loading'}))

        /* const allTasksFromState = getState().tasks; //подробная запись
         const tasksForCurrentTodolist = allTasksFromState[todolistId]
         const task = tasksForCurrentTodolist.find(t => {
             return t.id === taskId
         })*/

        const task = getState().tasks[todolistId].find(t => t.id === taskId)

        if (task) {
            tasksAPI.updateTask(todolistId, taskId, {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: status
            })
                .then((res) => {
                        if (res.data.resultCode === 0) {
                            dispatch(changeTaskStatusAC({todolistID: todolistId, taskID: taskId, status}))
                            dispatch(setAppStatusAC({status: 'succeeded'}))
                        } else {
                            handleServerAppError(res.data, dispatch)
                        }
                    }
                )
                .catch((error) => {
                    handleServerNetworkError(error, dispatch)
                })
        }
    }

export const changeTaskTitleTC = (todolistId: string, taskId: string, title: string) =>
    (dispatch: Dispatch, getState: () => MainReducerType) => {
        dispatch(setAppStatusAC({status: 'loading'}))

        const task = getState().tasks[todolistId].find(t => t.id === taskId)

        if (task) {
            tasksAPI.updateTask(todolistId, taskId, {
                title: title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.status
            })
                .then((res) => {
                        if (res.data.resultCode === 0) {
                            dispatch(onChangeTaskTitleAC({todolistId, taskId, title}))
                            dispatch(setAppStatusAC({status: 'succeeded'}))
                        } else {
                            handleServerAppError(res.data, dispatch)
                        }
                    }
                )
                .catch((error) => {
                    handleServerNetworkError(error, dispatch)
                })
        }
    }