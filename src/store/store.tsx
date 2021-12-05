import {combineReducers} from "redux";
import {todolistsReducer} from "../Reducers/todolist.reducer";
import {tasksReducer} from "../Reducers/tasks.reducer";
import {appReducer} from "../Reducers/app-reducer";
import thunk from "redux-thunk";
import {authReducer} from "../Reducers/authReducer";
import {configureStore} from "@reduxjs/toolkit";

export type MainReducerType = ReturnType<typeof mainReducer>

let mainReducer = combineReducers({
    todoLists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    login: authReducer,
})

//export let store = createStore(mainReducer, applyMiddleware(thunk)) //redux approach

export const store = configureStore({ //redux toolkit approach
    reducer: mainReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
})

// @ts-ignore
window.store = store