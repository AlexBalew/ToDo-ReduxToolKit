import {setAPPErrorACType, setAppStatusAC, setAppStatusACType} from "./app-reducer";
import {authAPI, LoginParamsType} from "../api/Todolists.api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {Dispatch} from "redux";
import {clearReduxAC, clearReduxACType} from "./tasks.reducer";
import {clearTodoReduxAC, clearTodoReduxACType} from "./todolist.reducer";

export type InitialStateType = {
    isLoggedIn : boolean
}

const initialState: InitialStateType = {
    isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET_USER\'S_IS_LOGGED_IN_STATUS' :
            return {...state, isLoggedIn: action.isLoggedIn}
        default:
            return {...state}
    }
}

export type ActionsType = isLoggedInACType | clearReduxACType | clearTodoReduxACType

export type isLoggedInACType = ReturnType<typeof isLoggedInAC>

export const isLoggedInAC = (isLoggedIn: boolean) => {
    return {
        type: 'login/SET_USER\'S_IS_LOGGED_IN_STATUS',
        isLoggedIn
    } as const
}

export const authTC = (authParams: LoginParamsType) => (dispatch: DispatchType) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(authParams)
        .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(isLoggedInAC(true))
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

export const logOutTC = () => (dispatch: DispatchType) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logOut()
        .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(clearTodoReduxAC())
                    dispatch(clearReduxAC())
                    dispatch(isLoggedInAC(false))
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

type DispatchType = Dispatch<ActionsType | setAppStatusACType | setAPPErrorACType>

