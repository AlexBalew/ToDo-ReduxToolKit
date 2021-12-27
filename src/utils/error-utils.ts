import {Dispatch} from "redux";

import {ResponseType} from "../api/Todolists.api";
import {setAppErrorAC, setAppStatusAC} from "../Reducers/app-reducer";

import { zero } from "Variables/Variables";

export const handleServerAppError = <T = {}>(data: ResponseType<T>, dispatch: Dispatch) => {

    if (data.messages.length) {
        dispatch(setAppErrorAC({error:data.messages[zero]}))
    } else {
        dispatch(setAppErrorAC({error: 'some error has occurred'}))
    }
    dispatch(setAppStatusAC({status: 'failed'}))

}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handleServerNetworkError = <T = {}>(error: {message: string}, dispatch: Dispatch) => {
    dispatch(setAppErrorAC({error: error.message ? error.message : 'Some error'}))
    dispatch(setAppStatusAC({status: 'failed'}))
}