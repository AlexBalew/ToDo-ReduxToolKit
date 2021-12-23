import {combineReducers} from "redux";
import {appReducer, authReducer, tasksReducer, todolistsReducer} from "../Reducers/reducer/all-reducer";

export type MainReducerType = ReturnType<typeof mainReducer>
export let mainReducer = combineReducers({
    app: appReducer,
    todoLists: todolistsReducer,
    login: authReducer,
    tasks: tasksReducer,
})