import { combineReducers } from 'redux';

import {
  appReducer,
  authReducer,
  tasksReducer,
  todolistsReducer,
} from '../Reducers/reducer/all-reducer';

export type MainReducerType = ReturnType<typeof mainReducer>;
export const mainReducer = combineReducers({
  app: appReducer,
  todoLists: todolistsReducer,
  login: authReducer,
  tasks: tasksReducer,
});
