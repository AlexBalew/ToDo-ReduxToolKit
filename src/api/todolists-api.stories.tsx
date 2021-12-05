import {useEffect, useState} from "react";
import {tasksAPI, todolistsAPI} from "./Todolists.api";


export default {
    title: 'API'
}

export const GetTodolists = () => {

    const [state, setState] = useState<unknown>(null)

    useEffect(() => {
        todolistsAPI.getTDLists()
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolists = () => {

    const [state, setState] = useState<unknown>(null)
    const [title, setTitle] = useState<string>('')

    const createTodolistsOnClick = () => {
        todolistsAPI.createTDLists(title)
            .then((res) => {
                setState(res.data.data.item)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder='Insert new TDList title here' value={title} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>
            <button onClick={createTodolistsOnClick}>Create todolist</button>
        </div>
    </div>

}

export const DeleteTodolists = () => {

    const [state, setState] = useState<unknown>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const deleteTodolistsOnClick = () => {
        todolistsAPI.deleteTDLists(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder='Insert TDList ID here' value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <button onClick={deleteTodolistsOnClick}>Delete todolist</button>
        </div>
    </div>
}

export const UpdateTodolists = () => {
    const [state, setState] = useState<unknown>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const UpdateTodolistsOnClick = () => {
        todolistsAPI.updateTDLists(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>
        <div>{JSON.stringify(state)}</div>
        <input placeholder='Insert TDList ID here' value={todolistId} onChange={(e) => {
            setTodolistId(e.currentTarget.value)
        }}/>
        <input placeholder='Insert new TDList title here' value={title} onChange={(e) => {
            setTitle(e.currentTarget.value)
        }}/>
        <button onClick={UpdateTodolistsOnClick}>Update TDList title</button>
    </div>
}

export const GetTasks = () => {
    const [state, setState] = useState<unknown>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const GetTasksOnClick = () => {
        tasksAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder='Insert TDList ID here' value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <button onClick={GetTasksOnClick}>Get tasks from exact TDList</button>
        </div>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<unknown>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const CreateTaskOnClick = () => {
        tasksAPI.createTask(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>
        <div>{JSON.stringify(state)}</div>
        <input placeholder='Insert TDList ID here' value={todolistId} onChange={(e) => {
            setTodolistId(e.currentTarget.value)
        }}/>
        <input placeholder='Insert new task title here' value={title} onChange={(e) => {
            setTitle(e.currentTarget.value)
        }}/>
        <button onClick={CreateTaskOnClick}>Create task in exact TDList</button>
    </div>
}

export const DeleteExactTask = () => {
    const [state, setState] = useState<unknown>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskID, setTaskID] = useState<string>('')

    const DeleteTaskOnClick = () => {
        tasksAPI.deleteTask(todolistId, taskID)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>
        <div>{JSON.stringify(state)}</div>
        <input placeholder='Insert TDList ID here' value={todolistId} onChange={(e) => {
            setTodolistId(e.currentTarget.value)
        }}/>
        <input placeholder='Insert exact task ID here' value={taskID} onChange={(e) => {
            setTaskID(e.currentTarget.value)
        }}/>
        <button onClick={DeleteTaskOnClick}>Delete exact task from exact TDList</button>
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<unknown>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskID, setTaskID] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [deadline, setDeadline] = useState<string | null>(null)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string | null>(null)
    const [status, setStatus] = useState<number>(0)


    const UpdateTaskOnCLick = () => {
        tasksAPI.updateTask(todolistId, taskID,
            {title, description, status, priority, startDate, deadline})
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>
        <div>{JSON.stringify(state)}</div>
        <ul>
            <li><input placeholder='Insert TDList ID here' value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/></li>
            <li><input placeholder='Insert exact task ID here' value={taskID} onChange={(e) => {
                setTaskID(e.currentTarget.value)
            }}/></li>
            <li><input placeholder='Insert new title here' value={title} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/></li>
            <li><input placeholder='Insert task description here' value={description} onChange={(e) => {
                setDescription(e.currentTarget.value)
            }}/></li>
            <li><input placeholder='Insert task deadline here' value={deadline!} onChange={(e) => {
                setDeadline(e.currentTarget.value)
            }}/></li>
            <li><input placeholder='Insert task priority here' value={priority} onChange={(e) => {
                setPriority(+e.currentTarget.value)
            }}/>task priority
            </li>
            <li><input placeholder='Insert task startDate here' value={startDate!} onChange={(e) => {
                setStartDate(e.currentTarget.value)
            }}/></li>
            <li><input placeholder='Insert task status here' value={status} onChange={(e) => {
                setStatus(+e.currentTarget.value)
            }}/>task status
            </li>
        </ul>
        <button onClick={UpdateTaskOnCLick}>Update exact task from exact TDList</button>
    </div>
}