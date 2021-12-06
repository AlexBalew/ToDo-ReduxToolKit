import {setAppStatusAC} from "./app-reducer";
import {authAPI, LoginParamsType} from "../api/Todolists.api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {Dispatch} from "redux";
import {clearReduxAC} from "./tasks.reducer";
import {clearTodoReduxAC} from "./todolist.reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

/*export type InitialStateType = {
    isLoggedIn : boolean
}*/

const initialState = {
    isLoggedIn: false
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        isLoggedInAC(state, action: PayloadAction<{value: boolean}>){
            state.isLoggedIn = action.payload.value
        }
    }
})

export const authReducer = slice.reducer
export const {isLoggedInAC} = slice.actions
/*(state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET_USER\'S_IS_LOGGED_IN_STATUS' :
            return {...state, isLoggedIn: action.isLoggedIn} //immerjs
        default:
            return {...state}
    }
}*/

//export type ActionsType = isLoggedInACType | clearReduxACType | clearTodoReduxACType

//export type isLoggedInACType = ReturnType<typeof isLoggedInAC>

/*export const isLoggedInAC = (isLoggedIn: boolean) => {
    return {
        type: 'login/SET_USER\'S_IS_LOGGED_IN_STATUS',
        isLoggedIn
    } as const
}*/

export const authTC = (authParams: LoginParamsType) => (dispatch: Dispatch) => {
    debugger
    dispatch(setAppStatusAC('loading'))
    authAPI.login(authParams)
        .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(isLoggedInAC({value: true}))
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

export const logOutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logOut()
        .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(clearTodoReduxAC())
                    dispatch(clearReduxAC())
                    dispatch(isLoggedInAC({value: false}))
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

//type DispatchType = Dispatch<ActionsType | setAppStatusACType | setAPPErrorACType>

