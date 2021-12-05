import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {'API-KEY': 'ae005362-3cd1-4901-a9c5-790f2698eec1'},
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

/*type CreateTDListResType = {
    resultCode: number
    messages: Array<string>
    data: {
        item: TodolistType
    }
}

type UpdateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {}
}

type DeleteTodolistResponseType = { ///all types in generic one
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {}
}*/

export type ResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    //fieldsErrors: Array<string>
    data: T
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}

export type ResponseTaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type ResponseTasksType = {
    items: Array<ResponseTaskType>
    totalCount: number
    error: string | null
}

export type UpdateModelType = {
    title: string
    description: string | null
    status: TaskStatuses
    priority: number
    startDate: string | null
    deadline: string | null
}

export const todolistsAPI = {
    getTDLists() {
        return instance.get<Array<TodolistType>>("todo-lists",)
    },
    createTDLists(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>("todo-lists", {title})
    },
    deleteTDLists(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTDLists(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    }
}

export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<ResponseTasksType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: ResponseTaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateModelType) {
        return instance.put<ResponseType<{ data: ResponseTaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`,
            {
                title: model.title,
                description: model.description,
                deadline: model.deadline,
                status: model.status,
                priority: model.priority,
                startDate: model.startDate
            })
    }
}


export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

export const authAPI = {
    login(authParams: LoginParamsType) {
        return instance.post<ResponseType<{ userId?: number }>>(`auth/login`, authParams)
    },
    authMe() {
        return instance.get<ResponseType<{id: number, email: string, login: string}>>('auth/me')
    },
    logOut() {
        return instance.delete<ResponseType<{ userId?: number }>>('/auth/login')
    }
}