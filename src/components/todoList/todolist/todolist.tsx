import {Button, IconButton} from "@mui/material";
import {AddItemForm} from "../../addItemForm/AddItemForm";
import React, {useCallback, useEffect} from "react";
import {getTasksTC} from "../../../Reducers/tasks.reducer";
import {ResponseTaskType, TaskStatuses} from "../../../api/Todolists.api";
import {EditableSpan} from "../../editableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {Task} from "../../task/Task";
import {FilterType, TodolistDomainType} from "../../../Reducers/todolist.reducer";
import {useDispatch} from "react-redux";

type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<ResponseTaskType>
    changeFilter: (filter: FilterType, todolistId: string) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses, ) => void
    onChangeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    deleteTask: (todolistId: string, taskId: string) => void
    removeTDFunc: (todolistId: string) => void
    changeTDListTitleAPP: (todolistId: string, newTitle: string) => void
    todolist: TodolistDomainType
    demo?: boolean
}

export const TodoList = React.memo((props: TodolistPropsType) => {

    const dispatch = useDispatch()

    useEffect(() => {
        if (props.demo) {
            return
        }
        dispatch(getTasksTC(props.todolist.id))
    }, [])


    const allFilter = useCallback(() => {
        props.changeFilter('all', props.todolist.id)
    }, [props.changeFilter, props.todolist.id])
    const activeFilter = useCallback(() => {
        props.changeFilter('active', props.todolist.id)
    }, [props.changeFilter, props.todolist.id])
    const completedFilter = useCallback(() => {
        props.changeFilter('completed', props.todolist.id)
    }, [props.changeFilter, props.todolist.id])

    const removeTDButton = () => {
        props.removeTDFunc(props.todolist.id)
    }

    const ChangeTDListTitle = useCallback((newTitle: string) => {
        props.changeTDListTitleAPP(props.todolist.id, newTitle)
    }, [props.changeTDListTitleAPP, props.todolist.id])

    const addTaskBridge = useCallback((title: string) => {
        props.addTask(props.todolist.id, title)
    }, [props.addTask, props.todolist.id])


    let tasksForTDList = props.tasks
    if (props.todolist.filter === 'active') {
        tasksForTDList = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.todolist.filter === 'completed') {
        tasksForTDList = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return (
        <>
            <h3>
                <EditableSpan title={props.todolist.title} onChange={ChangeTDListTitle} todolist={props.todolist}/>
                <IconButton aria-label="delete" onClick={removeTDButton}
                            disabled={props.todolist.entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm callback={addTaskBridge} disabled={props.todolist.entityStatus === 'loading'}/>

            <div>
                <ul style={{listStyle: 'none', paddingLeft: 0}}>
                    {
                        tasksForTDList.map(t => <Task key={t.id}
                                                      task={t}
                                                      deleteTask={props.deleteTask}
                                                      changeTaskStatus={props.changeTaskStatus}
                                                      onChangeTaskTitle={props.onChangeTaskTitle}
                                                      todolistId={props.todolist.id}
                                                      todolist={props.todolist}
                        />)
                    }
                </ul>
                <Button color={props.todolist.filter === 'all' ? 'secondary' : 'primary'}
                        variant={props.todolist.filter === 'all' ? 'outlined' : 'text'}
                        onClick={allFilter}
                        size={"small"}>All</Button>
                <Button color={props.todolist.filter === 'active' ? 'secondary' : 'primary'}
                        variant={props.todolist.filter === 'active' ? 'outlined' : 'text'}
                        onClick={activeFilter}
                        size={"small"}>Active</Button>
                <Button color={props.todolist.filter === 'completed' ? 'secondary' : 'primary'}
                        variant={props.todolist.filter === 'completed' ? 'outlined' : 'text'}
                        onClick={completedFilter}
                        size={"small"}>Completed</Button>
            </div>
        </>
    )
})
