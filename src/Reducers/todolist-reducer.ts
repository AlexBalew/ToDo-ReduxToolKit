import {todolistsAPI, TodolistType} from "../api/Todolists.api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export type FilterType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterType
    entityStatus: RequestStatusType
}

export const getTodolistsTC = createAsyncThunk('todolists/getTodolists', async (param, {dispatch}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    const res = await todolistsAPI.getTDLists()
    try {
        dispatch(setAppStatusAC({status: 'succeeded'}))
        return {todolists: res.data}
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
    }
})

export const removeTodolistsTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTDlEntityStatusAC({status: 'loading', tlID: todolistId}))
    todolistsAPI.deleteTDLists(todolistId)
        .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTDlAC({id: todolistId}))
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

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.createTDLists(title)
        .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTDlAC({todoList: res.data.data.item}))
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

export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.updateTDLists(todolistId, title)
        .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTDlTitleAC({todolistId: todolistId, title: title}))
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

export const sliceTodolist = createSlice({
    name: 'todolists',
    initialState: [] as Array<TodolistDomainType>,
    reducers: {
        removeTDlAC(state, action: PayloadAction<{ id: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTDlAC(state, action: PayloadAction<{ todoList: TodolistType }>) {
            state.unshift({...action.payload.todoList, filter: 'all', entityStatus: 'idle'})
        },
        /*addTodolist(state, action: PayloadAction<{ todoList: TodolistType }>) {
            state.unshift({...action.payload.todoList, filter: 'all', entityStatus: 'idle'})
        },*/
        changeTDlTitleAC(state, action: PayloadAction<{ todolistId: string, title: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            state[index].title = action.payload.title
        },
        changeTDlFilterAC(state, action: PayloadAction<{ filter: FilterType, todolistId: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            state[index].filter = action.payload.filter
        },
        changeTDlEntityStatusAC(state, action: PayloadAction<{ status: RequestStatusType, tlID: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.tlID)
            state[index].entityStatus = action.payload.status
        },
       /* setTodolistsAC(state, action: PayloadAction<{ todolists: Array<TodolistType> }>) {
            return action.payload.todolists.map(tl => ({...tl, filter: "all", entityStatus: 'idle'}))
        },*/
        clearTodoReduxAC(state, action: PayloadAction) {
            // state = []
        },
    },
    extraReducers: builder => {
        builder.addCase(getTodolistsTC.fulfilled, (state, action) => {
            if (action.payload)
            return action.payload.todolists.map(tl => ({...tl, filter: "all", entityStatus: 'idle'}))
        })
    }
})

export const {
    removeTDlAC,
    addTDlAC,
    changeTDlTitleAC,
    changeTDlEntityStatusAC,
    changeTDlFilterAC
} = sliceTodolist.actions


//__thunks

/*export const getTodolistsTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.getTDLists()
        .then(res => {
                dispatch(setTodolistsAC({todolists: res.data}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            }
        )
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const removeTodolistsTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTDlEntityStatusAC({status: 'loading', tlID: todolistId}))
    todolistsAPI.deleteTDLists(todolistId)
        .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTDlAC({id: todolistId}))
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

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.createTDLists(title)
        .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTDlAC({todoList: res.data.data.item}))
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

export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.updateTDLists(todolistId, title)
        .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTDlTitleAC({todolistId: todolistId, title: title}))
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







