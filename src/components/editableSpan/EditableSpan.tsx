import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TodolistDomainType} from "../../Reducers/todolist.reducer";
import s from '../task/Tasks.module.css'

export type editableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
    todolist: TodolistDomainType
}

export const EditableSpan = React.memo((props: editableSpanPropsType) => {

    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState('')

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const setViewNode = () => {
        setEditMode(false)
        props.onChange(title)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setEditMode(false)
            props.onChange(title)
        }
        return props.title
    }

    return (editMode
            ? <input onChange={onChangeTitleHandler} value={title} autoFocus onBlur={setViewNode}
                     onKeyPress={onKeyPressHandler} disabled={props.todolist.entityStatus === 'loading'}
            className={s.taskName}/>
            : <span onDoubleClick={activateEditMode} className={s.taskName}>{props.title}</span>
    )

})