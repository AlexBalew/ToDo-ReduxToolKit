import {addTDlType, RemoveTDlType, setTodolistsACType} from "./todolist.reducer";
import {ResponseTaskType, tasksAPI, TaskStatuses} from "../api/Todolists.api";
import {Dispatch} from "redux";
import {MainReducerType} from "../store/store";
import {setAPPErrorACType, setAppStatusAC, setAppStatusACType} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";


export type TasksStateType = {
    [key: string]: Array<ResponseTaskType>
}
let initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionSType): TasksStateType => {
    switch (action.type) {

        case 'task/DELETE_TASK' : {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.id)
            }
        }
        case 'task/ADD_TASK' : {
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]],
            }
        }
        case 'task/CHANGE_TASK_TITLE' : {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.id
                    ? {...t, title: action.title} : t)
            }
        }
        case 'task/CHANGE_TASK_STATUS' : {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(t => t.id === action.id
                    ? {...t, status: action.status} : t)
            }
        }
        case 'todolists/ADD_TODOLIST' : {
            return {...state, [action.todoList.id]: []}
        }
        case 'todolists/REMOVE_TODOLIST' : {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        case 'todolists/SET_TODOLISTS' : {
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case 'task/SET_TASKS_TO_REDUX' : {
            const copyState = {...state}
            copyState[action.todolistID] = action.tasks
            return copyState
        }
        case 'task/CLEAR_REDUX': {
          return {...initialState} = {}
        }
        default:
            return state
    }
}

type ActionSType =
    RemoveTDlType
    | addTDlType
    | deleteTaskType
    | addTaskACType
    | onChangeTitleType
    | changeTaskStatusACType
    | setTodolistsACType
    | setTasksACType
    | clearReduxACType

type DispatchType = Dispatch<ActionSType | setAppStatusACType | setAPPErrorACType>

type deleteTaskType = ReturnType<typeof deleteTaskAC>

export const deleteTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'task/DELETE_TASK',
        todolistId,
        id: taskId
    } as const
}

export type addTaskACType = ReturnType<typeof addTaskAC>

export const addTaskAC = (task: ResponseTaskType) => {
    return {
        type: 'task/ADD_TASK',
        task
    } as const
}


type onChangeTitleType = ReturnType<typeof onChangeTaskTitleAC>

export const onChangeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {
        type: 'task/CHANGE_TASK_TITLE',
        todolistId,
        id: taskId,
        title
    } as const
}

type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>

export const changeTaskStatusAC = (todolistID: string, taskID: string, status: TaskStatuses) => {
    return {
        type: 'task/CHANGE_TASK_STATUS',
        todolistID,
        id: taskID,
        status
    } as const
}

type setTasksACType = ReturnType<typeof setTasksAC>

export const setTasksAC = (todolistID: string, tasks: Array<ResponseTaskType>) => {
    return {
        type: 'task/SET_TASKS_TO_REDUX',
        todolistID,
        tasks
    } as const
}

export type clearReduxACType = ReturnType<typeof clearReduxAC>

export const clearReduxAC = () => {
    return {
        type: 'task/CLEAR_REDUX',
    } as const
}

export const getTasksTC = (todolistID: string) => (dispatch: DispatchType) => { //сделать
    dispatch(setAppStatusAC('loading'))
    tasksAPI.getTasks(todolistID)
        .then(res => {
                if (res.data.error == null) {
                    dispatch(setTasksAC(todolistID, res.data.items))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    // handleServerAppError(res, dispatch)
                }
            }
        )
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: DispatchType) => {
    dispatch(setAppStatusAC('loading'))
    tasksAPI.deleteTask(todolistId, taskId)
        .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(deleteTaskAC(todolistId, taskId))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            }
        )
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: DispatchType) => {
    dispatch(setAppStatusAC('loading'))
    tasksAPI.createTask(todolistId, title)
        .then((res) => {
                if (res.data.resultCode === 0) {
                    const task = res.data.data.item
                    const action = addTaskAC(task)
                    dispatch(action)
                    dispatch(setAppStatusAC('succeeded'))
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
    (dispatch: DispatchType, getState: () => MainReducerType) => {
        dispatch(setAppStatusAC('loading'))

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
                            dispatch(changeTaskStatusAC(todolistId, taskId, status))
                            dispatch(setAppStatusAC('succeeded'))
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
    (dispatch: DispatchType, getState: () => MainReducerType) => {
        dispatch(setAppStatusAC('loading'))

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
                            dispatch(onChangeTaskTitleAC(todolistId, taskId, title))
                            dispatch(setAppStatusAC('succeeded'))
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