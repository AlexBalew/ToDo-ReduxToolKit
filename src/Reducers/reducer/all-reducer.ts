import { sliceApp } from '../app-reducer';
import { sliceAuth } from '../authReducer';
import { sliceTasks } from '../tasks.reducer';
import { sliceTodolist } from '../todolist-reducer';

export const todolistsReducer = sliceTodolist.reducer;

export const authReducer = sliceAuth.reducer;

export const appReducer = sliceApp.reducer;

export const tasksReducer = sliceTasks.reducer;
