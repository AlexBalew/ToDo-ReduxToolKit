import {ResponseTaskType, tasksAPI, TaskStatuses} from "../api/Todolists.api";
import {MainReducerType} from "../store/store";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {addTDlAC, getTodolistsTC, removeTodolistsTC} from "./todolist-reducer";
import {setAppStatusAC} from "./app-reducer";


export type TasksStateType = {
    [key: string]: Array<ResponseTaskType>
}
let initialState: TasksStateType = {}

export const getTasksTC = createAsyncThunk('tasks/getTasks', async (todolistID: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    const res = await tasksAPI.getTasks(todolistID)
    if (res.data.error === null)
        try {
            //thunkAPI.dispatch(setTasksAC({todolistID, tasks: res.data.items}))
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return {todolistID, tasks: res.data.items}
        } catch (error: any) {
            handleServerNetworkError(error, thunkAPI.dispatch)
        }
})


export const deleteTaskTC = createAsyncThunk('tasks/deleteTask', (param: { todolistID: string, taskId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    return tasksAPI.deleteTask(param.todolistID, param.taskId)
        .then((res) => {
                if (res.data.resultCode === 0) {
                    thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
                    return {todolistId: param.todolistID, taskId: param.taskId}
                } else {
                    handleServerAppError(res.data, thunkAPI.dispatch)
                }
            }
        )
        .catch((error) => {
            handleServerNetworkError(error, thunkAPI.dispatch)
        })
})

export const addTaskTC = createAsyncThunk('tasks/addTask', (param: { todolistID: string, title: string }, {dispatch}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    return tasksAPI.createTask(param.todolistID, param.title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC({status: 'succeeded'}))
                return {task: res.data.data.item}
            } else {
                handleServerAppError(res.data, dispatch)
                //return rejectWithValue(null)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
            //return rejectWithValue(null)
        })
})

/*export const addTaskTC = createAsyncThunk('tasks/addTask', async (param: { todolistID: string, title: string }, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
        try {
            const res = await tasksAPI.createTask(param.todolistID, param.title)
            return res
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC({status: 'succeeded'}))
                return res.data.data.item
            } else {
                handleServerAppError(res.data, dispatch)
                return rejectWithValue(null)
            }
        } catch (error: any) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
        }
})*/

export const changeTaskStatusTC = createAsyncThunk('tasks/changeTaskStatus',
    async (param: { todolistId: string, taskId: string, status: TaskStatuses }, {dispatch, getState}) => {
        dispatch(setAppStatusAC({status: 'loading'}))

        /* const allTasksFromState = getState().tasks; //подробная запись
         const tasksForCurrentTodolist = allTasksFromState[todolistId]
         const task = tasksForCurrentTodolist.find(t => {
             return t.id === taskId
         })*/

        const state = getState() as MainReducerType
        const task = state.tasks[param.todolistId].find(t => t.id === param.taskId)

        if (task) {
            const res = await tasksAPI.updateTask(param.todolistId, param.taskId, {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: param.status
            })
            try {
                if (res.data.resultCode === 0) {
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                    return param
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            } catch (error: any) {
                handleServerNetworkError(error, dispatch)
            }
        }
    })

export const changeTaskTitleTC = createAsyncThunk('tasks/changeTaskTitle',
    async (param: { todolistId: string, taskId: string, title: string }, {dispatch, getState}) => {
        dispatch(setAppStatusAC({status: 'loading'}))

        /* const allTasksFromState = getState().tasks; //подробная запись
         const tasksForCurrentTodolist = allTasksFromState[todolistId]
         const task = tasksForCurrentTodolist.find(t => {
             return t.id === taskId
         })*/

        const state = getState() as MainReducerType
        const task = state.tasks[param.todolistId].find(t => t.id === param.taskId)

        if (task) {
            const res = await tasksAPI.updateTask(param.todolistId, param.taskId, {
                title: param.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.status
            })
            try {
                if (res.data.resultCode === 0) {
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                    return param
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            } catch (error: any) {
                handleServerNetworkError(error, dispatch)
            }
        }
    })


export const sliceTasks = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        /*deleteTaskAC(state, action: PayloadAction<{ todolistId: string, taskId: string }>) { // moved to extra reducers
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(task => task.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },*/
        /*addTaskAC(state, action: PayloadAction<{ task: ResponseTaskType }>) { // moved to extra reducers
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },*/
        /* onChangeTaskTitleAC(state, action: PayloadAction<{ todolistId: string, taskId: string, title: string }>) {
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
         },*/
    },
    extraReducers: (builder) => {
        builder.addCase(addTDlAC, (state, action) => {
            state[action.payload.todoList.id] = []
        })
        builder.addCase(removeTodolistsTC.fulfilled, (state, action) => {
            if (action.payload)
            delete state[action.payload.id]
        })
        builder.addCase(getTodolistsTC.fulfilled, (state, action) => {
            if (action.payload)
            action.payload.todolists.forEach((tl: any) => {
                state[tl.id] = []
            })
        })
        builder.addCase(getTasksTC.fulfilled, (state, action) => {
            if (action.payload) {
                state[action.payload.todolistID] = action.payload.tasks
            }
        })
        builder.addCase(deleteTaskTC.fulfilled, (state, action) => {
            if (action.payload) {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex(task => task.id === action.payload!.taskId)
                if (index > -1) {
                    tasks.splice(index, 1)
                }
            }
        })
        builder.addCase(addTaskTC.fulfilled, (state, action) => {
            if (action.payload) {
                state[action.payload.task.todoListId].unshift(action.payload.task)
            }
        })
        builder.addCase(changeTaskStatusTC.fulfilled, (state, action) => {
            if (action.payload) {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex(task => task.id === action.payload?.taskId)
                if (index > -1) {
                    tasks[index] = {...tasks[index], status: action.payload.status}
                }
            }

        })
        builder.addCase(changeTaskTitleTC.fulfilled, (state, action) => {
            if (action.payload) {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex(task => task.id === action.payload?.taskId)
                if (index > -1) {
                    tasks[index] = {...tasks[index], title: action.payload.title}
                }
            }
        })
    }
})


/*export const { //there are no ac already
    onChangeTaskTitleAC,
    changeTaskStatusAC,
} = sliceTasks.actions*/


/*export const getTasksTC = (todolistID: string) => (dispatch: Dispatch) => {
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
}*/

/*export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
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
}*/

/*export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
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
}*/

/*
export const changeTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses) =>
    (dispatch: Dispatch, getState: () => MainReducerType) => {
        dispatch(setAppStatusAC({status: 'loading'}))

        /!* const allTasksFromState = getState().tasks; //подробная запись
         const tasksForCurrentTodolist = allTasksFromState[todolistId]
         const task = tasksForCurrentTodolist.find(t => {
             return t.id === taskId
         })*!/

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
*/

/*
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
    }*/
