import {sliceTodolist} from "../todolist-reducer";
import {sliceAuth} from "../authReducer";
import {sliceApp} from "../app-reducer";
import {sliceTasks} from "../tasks.reducer";

export const todolistsReducer = sliceTodolist.reducer

export const authReducer = sliceAuth.reducer

export const appReducer = sliceApp.reducer

export const tasksReducer = sliceTasks.reducer