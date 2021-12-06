import {setAppErrorAC, setAppStatusAC} from "../Reducers/app-reducer";
import {ResponseType} from "../api/Todolists.api";
import {Dispatch} from "redux";

export const handleServerAppError = <T = {}>(data: ResponseType<T>, dispatch: Dispatch) => {

    if (data.messages.length) {
        dispatch(setAppErrorAC({error:data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error: 'some error has occurred'}))
    }
    dispatch(setAppStatusAC({status: 'failed'}))

}

export const handleServerNetworkError = <T = {}>(error: {message: string}, dispatch: Dispatch) => {
    dispatch(setAppErrorAC({error: error.message ? error.message : 'Some error'}))
    dispatch(setAppStatusAC({status: 'failed'}))
}