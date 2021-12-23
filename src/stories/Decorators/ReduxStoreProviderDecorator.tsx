import {Provider} from "react-redux";
import {combineReducers} from "redux";
import {v1} from "uuid";
import {TaskStatuses} from "../../api/Todolists.api";
import thunk from "redux-thunk";
import {appReducer, authReducer, tasksReducer, todolistsReducer} from "../../Reducers/reducer/all-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {MainReducerType} from "../../store/mainReducer";

let mainReducer = combineReducers({
    todoLists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    login: authReducer
})

const InitialStoryBookState: MainReducerType = {
    todoLists: [
        {id: 'Todolist1Id', title: '1 one', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
        {id: 'Todolist2Id', title: '2 one', filter: 'all', addedDate: '', order: 0, entityStatus: 'loading'},
    ],
    tasks: {
        ['Todolist1Id']: [
            {
                id: v1(), title: '1 task', description: '', status: TaskStatuses.New, priority: 0, startDate: '',
                deadline: '', todoListId: 'Todolist1Id', order: 0, addedDate: ''
            },
            {
                id: v1(), title: '2 task', description: '', status: TaskStatuses.New, priority: 0, startDate: '',
                deadline: '', todoListId: 'Todolist1Id', order: 0, addedDate: ''
            },
        ],
        ['Todolist2Id']: [
            {
                id: v1(), title: '1 task', description: '', status: TaskStatuses.New, priority: 0, startDate: '',
                deadline: '', todoListId: 'Todolist2Id', order: 0, addedDate: ''
            },
            {
                id: v1(), title: '2 task', description: '', status: TaskStatuses.New, priority: 0, startDate: '',
                deadline: '', todoListId: 'Todolist2Id', order: 0, addedDate: ''
            },
        ],
    },
    app: {
        error: null,
        status: "succeeded",
        isAppInitialized: true,
    },
    login: {
        isLoggedIn: true
    }
}

export const storyBookStore = configureStore({
    reducer: mainReducer,
    preloadedState: InitialStoryBookState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
})

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}