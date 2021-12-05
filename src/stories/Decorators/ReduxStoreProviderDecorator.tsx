import {Provider} from "react-redux";
import {MainReducerType} from "../../store/store";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistsReducer} from "../../Reducers/todolist.reducer";
import {tasksReducer} from "../../Reducers/tasks.reducer";
import {v1} from "uuid";
import {TaskStatuses} from "../../api/Todolists.api";
import {appReducer} from "../../Reducers/app-reducer";
import thunk from "redux-thunk";

let mainReducer = combineReducers({
    todoLists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
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
        status: "idle",
        isAppInitialized: true,
    },
    login: {
        isLoggedIn: true
    }
}

export const storyBookStore = createStore(mainReducer, InitialStoryBookState, applyMiddleware(thunk))

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}