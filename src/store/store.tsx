import {combineReducers} from "redux";
import thunk from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import {appReducer, authReducer, tasksReducer, todolistsReducer} from "../Reducers/reducer/all-reducer";

export type MainReducerType = ReturnType<typeof mainReducer>

export let mainReducer = combineReducers({
    app: appReducer,
    todoLists: todolistsReducer,
    login: authReducer,
    tasks: tasksReducer,

})

//export let store = createStore(mainReducer, applyMiddleware(thunk)) //redux approach

export const store = configureStore({ //redux toolkit approach
    reducer: mainReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
})


// @ts-ignore
window['store'] = store