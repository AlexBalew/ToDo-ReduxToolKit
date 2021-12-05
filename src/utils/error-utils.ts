import {setAppErrorAC, setAPPErrorACType, setAppStatusAC, setAppStatusACType} from "../Reducers/app-reducer";
import {ResponseType} from "../api/Todolists.api";
import {Dispatch} from "redux";

export const handleServerAppError = <T = {}>(data: ResponseType<T>, dispatch: Dispatch<setAPPErrorACType | setAppStatusACType>) => {

    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('some error has occurred'))
    }
    dispatch(setAppStatusAC('failed'))

}

export const handleServerNetworkError = <T = {}>(error: {message: string}, dispatch: Dispatch<setAPPErrorACType | setAppStatusACType>) => {
    dispatch(setAppErrorAC(error.message ? error.message : 'Some error'))
    dispatch(setAppStatusAC('failed'))
}